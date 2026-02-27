import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonBlack from "@/app/components/buttonBlack";
import ButtonGray from "@/app/components/buttonGray";

export default function ResetSent() {
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email?: string }>();

    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        const t = setInterval(() => {
            setSeconds((s) => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => clearInterval(t);
    }, []);

    const openMailApp = async () => {
        try {
            if (Platform.OS === "ios") {
                await Linking.openURL("message://");
            } else {
                await Linking.openURL("mailto:");
            }
        } catch {
            // no mail app configured, ignore
        }
    };

    const resend = () => {
        router.replace({
            pathname: "/(auth)/forgotPassword",
            params: { email: email ?? "" },
        });
    };

    return (
        <View className="flex-1 bg-white px-6 pt-16">
            <Text className="font-bebas text-4xl text-primary-dark">Reset link sent</Text>

            <Text className="text-neutral-700 mt-3 leading-6">
                We sent a password reset link to{" "}
                <Text className="font-bold text-primary-dark">{email || "your email"}</Text>.
                {"\n"}Open your email and follow the steps to reset your password.
            </Text>

            <View className="mt-10">
                <ButtonBlack title="OPEN EMAIL APP" onPress={openMailApp} />
            </View>

            <View className="mt-4">
                <ButtonGray
                    title="BACK TO SIGN IN"
                    onPress={() => router.replace("/(auth)/signIn")}
                />
            </View>

            <View className="mt-8">
                <Text className="text-neutral-600 text-sm">
                    Didn’t receive it? Check Spam/Promotions.
                </Text>

                <Text className="text-neutral-600 text-sm mt-2">
                    You can resend in{" "}
                    <Text className="font-bold text-primary-dark">{seconds}s</Text>.
                </Text>

                <TouchableOpacity
                    disabled={seconds > 0}
                    onPress={resend}
                    className={`mt-4 ${seconds > 0 ? "opacity-40" : "opacity-100"}`}
                >
                    <Text className="text-primary-dark underline font-bold">
                        RESEND RESET EMAIL
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}