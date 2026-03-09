import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";

export const useProtectedRoute = () => {
    const { initializing, isAuthenticated, user } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (initializing) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (!isAuthenticated && !inAuthGroup) {
            router.replace("/(auth)/signIn");
            return;
        }

        if (isAuthenticated && inAuthGroup && user && !user.isFirstTimeUser) {
            router.replace("/(screens)/(profile)");
        }
    }, [initializing, isAuthenticated, user, segments]);
};