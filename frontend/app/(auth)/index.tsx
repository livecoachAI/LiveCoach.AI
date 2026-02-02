import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonYellow from "@/app/components/buttonYellow";

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

                <View className="pl-10">
                    <View className="relative w-full aspect-square">
                        <Image
                            source={require("../../assets/onboarding/bg-1.png")}
                            className="absolute w-[377px] h-[580px] -left-[30px] -top-[60px] z-10"
                            resizeMode="cover"
                        />
                        <Image
                            source={require("../../assets/onboarding/Vector.png")}
                            className="absolute w-[580px] h-[450px] z-0"
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View className="pt-12 pb-6">
                    <Text className="text-5xl font-extrabold leading-[45px] text-[#1A0E0E] z-20">
                        TRAIN SMARTER{"\n"}WITH AI POWERED{"\n"}COACHING
                    </Text>

                    <Text className="text-base text-gray-600">
                        Track. Improve. Dominate.
                    </Text>

                    <Pressable
                        onPress={() => router.push("/(auth)/signIn")}
                        className="mt-1 self-center w-4/5 rounded-md bg-[#E6F20D] py-3">
                        <Text className="text-center font-bold tracking-widest text-black">
                            LOGIN
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.push("/(auth)/landing")}
                        className="mt-3 self-center w-4/5 rounded-md bg-[#E9E9E9] py-3">
                        <Text className="text-center font-bold tracking-widest text-black">
                            CREATE ACCOUNT
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.push("/(auth)/getVerified")}
                        className="mt-3 self-center w-4/5 rounded-md bg-[#E9E9E9] py-3">
                        <Text className="text-center font-bold tracking-widest text-black">
                            VERFIY
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}
