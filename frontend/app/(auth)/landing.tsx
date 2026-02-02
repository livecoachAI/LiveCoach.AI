import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import ButtonBlack from "@/app/components/buttonBlack";

export default function RoleSelect() {
    return (
        <SafeAreaView className="flex-1 bg-[#F8FE11]">
            <View className="flex-1 items-center justify-center px-10">

                <Image
                    source={require("../../assets/onboarding/Untitled design (7).png")}
                />

                <ButtonBlack
                    title="Athlete"
                    onPress={() => router.push("/(auth)/createAccount")}
                />

                <ButtonBlack
                    title="Coach"
                    onPress={() => router.push("/(auth)/getVerified")}
                />

            </View>
        </SafeAreaView>
    );
}
