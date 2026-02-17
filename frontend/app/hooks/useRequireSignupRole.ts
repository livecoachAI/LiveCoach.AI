import { useEffect, useState } from "react";
import { router } from "expo-router";
import { getSignupRole, SignupRole } from "@/lib/storage";

export function useRequireSignupRole(expected: SignupRole) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const role = await getSignupRole();

            if (!role) {
                router.replace("/(auth)/landing");
                return;
            }

            if (role !== expected) {
                router.replace(role === "athlete"
                    ? "/(auth)/createAccount"
                    : "/(auth)/getVerified");
                return;
            }

            setLoading(false);
        })();
    }, []);

    return loading;
}
