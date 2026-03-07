import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthLayout() {
    const { initializing, isAuthenticated, user } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (initializing) return;

        if (isAuthenticated && user && !user.isFirstTimeUser) {
            router.replace("/(screens)/(profile)");
        }
    }, [initializing, isAuthenticated, user, segments]);

    if (initializing) return null;

    return <Stack screenOptions={{ headerShown: false }} />;
}