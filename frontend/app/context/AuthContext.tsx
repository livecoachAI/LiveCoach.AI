import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
} from "react";
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { api, authHeaders } from "@/lib/api";
import { clearSignupRole } from "@/lib/storage";

type ExperienceLevel =
    | "beginner"
    | "intermediate"
    | "advanced"
    | "professional";

type UserRole = "athlete" | "coach";

type AppUser = {
    userId: string;
    firebaseUid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    isFirstTimeUser: boolean;
    athleteData?: {
        sport: string;
        age: number;
        experienceLevel?: ExperienceLevel;
        bio?: string;
        goals?: string[];
    };
    coachData?: any;
};

type RegisterAthleteInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    sports: string[];
    experienceLevel: ExperienceLevel;
};

type AuthContextType = {
    firebaseUser: FirebaseUser | null;
    user: AppUser | null;
    initializing: boolean;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<AppUser | null>;
    registerAthlete: (data: RegisterAthleteInput) => Promise<AppUser | null>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<AppUser | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [user, setUser] = useState<AppUser | null>(null);
    const [initializing, setInitializing] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchProfile = async (
        fbUser?: FirebaseUser | null,
    ): Promise<AppUser | null> => {
        const currentUser = fbUser ?? auth.currentUser;

        if (!currentUser) {
            setUser(null);
            return null;
        }

        try {
            const token = await currentUser.getIdToken(true);

            const res = await api.get("/api/user/profile", {
                headers: await authHeaders(token),
            });

            const profile = res.data?.data ?? res.data;
            setUser(profile);
            return profile;
        } catch (error) {
            console.log("FETCH PROFILE FAILED", error);
            setUser(null);
            return null;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
            setFirebaseUser(fbUser);

            if (!fbUser) {
                setUser(null);
                setInitializing(false);
                return;
            }

            await fetchProfile(fbUser);
            setInitializing(false);
        });

        return unsubscribe;
    }, []);

    const login = async (
        email: string,
        password: string,
    ): Promise<AppUser | null> => {
        setLoading(true);

        try {
            const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
            const token = await cred.user.getIdToken(true);

            await api.post(
                "/api/auth/login",
                {},
                { headers: await authHeaders(token) },
            );

            return await fetchProfile(cred.user);
        } finally {
            setLoading(false);
        }
    };

    const registerAthlete = async (
        data: RegisterAthleteInput,
    ): Promise<AppUser | null> => {
        setLoading(true);

        try {
            const sportString = [...data.sports].sort().join(",");

            const cred = await createUserWithEmailAndPassword(
                auth,
                data.email.trim(),
                data.password,
            );

            await updateProfile(cred.user, {
                displayName: `${data.firstName} ${data.lastName}`,
            });

            const token = await cred.user.getIdToken(true);

            await api.post(
                "/api/auth/register",
                {
                    firebaseUid: cred.user.uid,
                    email: data.email.trim(),
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    role: "athlete",
                    authProvider: "email",
                    athleteData: {
                        sport: sportString,
                        age: data.age,
                        experienceLevel: data.experienceLevel,
                        bio: "",
                        goals: [],
                    },
                },
                { headers: await authHeaders(token) },
            );

            await api.post(
                "/api/auth/complete-onboarding",
                { role: "athlete" },
                { headers: await authHeaders(token) },
            );

            await clearSignupRole();

            return await fetchProfile(cred.user);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            setFirebaseUser(null);
        } finally {
            setLoading(false);
        }
    };

    const value = useMemo(
        () => ({
            firebaseUser,
            user,
            initializing,
            loading,
            isAuthenticated: !!firebaseUser && !!user,
            login,
            registerAthlete,
            logout,
            refreshUser: fetchProfile,
        }),
        [firebaseUser, user, initializing, loading],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};