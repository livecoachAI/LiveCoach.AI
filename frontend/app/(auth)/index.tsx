import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonYellow from "@/app/components/buttonYellow";
import ButtonGray from "@/app/components/buttonGray";

export default function Index() {
    return (
        <View className="flex-1 bg-white relative">
            <SafeAreaView className="flex-1">
                <View className="w-max h-3 relative mb-5">
                    <Image
                        source={require("../../assets/onboarding/LiveCoach.AI__1___1_-removebg-preview 1.png")}
                        className="w-54 h-29 absolute -left-[2px] -top-[40px]"
                        resizeMode="contain"
                    />
                </View>

                <View className="pl-10 mt-20">
                    <View className="relative w-full aspect-square">
                        <Image
                            source={require("../../assets/onboarding/bg-1.png")}
                            className="absolute w-[487px] h-[580px] -left-[30px] -top-[60px] z-10"
                            resizeMode="cover"
                        />
                        <Image
                            source={require("../../assets/onboarding/Vector.png")}
                            className="absolute w-[620px] h-[560px] z-0 -left-[0px] -top-[70px] "
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View className="pt-12 pb-6 mt-4 ml-4">
                    <Text className="text-5xl font-bebas  leading-[45px] text-[#1A0E0E] z-20">
                        TRAIN SMARTER{"\n"}WITH AI POWERED{"\n"}COACHING
                    </Text>

                    <Text className="text-base text-gray-600">
                        Track. Improve. Dominate.
                    </Text>

                </View>
                <View className="px-6 space-y-4 mt-4 mb-6">
                    <ButtonYellow title="LOGIN" onPress={() => router.push("/(auth)/signIn")} />

                    <ButtonGray title="CREATE ACCOUNT" onPress={() => router.push("/(auth)/createAccount")} />
                </View>
            </SafeAreaView>
        </View>
    );
}
