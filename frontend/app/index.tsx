import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";

export default function Index() {
    const { initializing, isAuthenticated, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (initializing) return;

        if (!isAuthenticated) {
            router.replace("/(auth)");
            return;
        }

        if (user?.isFirstTimeUser) {
            router.replace("/(auth)");
            return;
        }

        router.replace("/(screens)/(profile)");
    }, [initializing, isAuthenticated, user]);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <ActivityIndicator />
        </View>
    );
}