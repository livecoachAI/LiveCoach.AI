import { View, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Onboarding = () => {
    return (
        <View className="flex-1 bg-white relative">
            <SafeAreaView className="flex-1">
                <View className="px- pt-3 w-full items-start">
                    <Image
                        source={require("../assets/onboarding/LiveCoach.AI__1___1_-removebg-preview 1.png")}
                        className="h-10 aspect-[4/1] "
                        resizeMode="contain"
                    />
                </View>

                <View className="mt-6 px-6">
                    <View className="relative w-72 aspect-square">
                        <Image
                            source={require("../assets/onboarding/bg-1.png")}
                            className="absolute inset-0"
                            resizeMode="contain"
                        />
                        <Image
                            source={require("../assets/onboarding/Vector.png")}
                            className="absolute -right-2 -bottom-2 w-56 h-56"
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View className="mt-auto px-6 pb-8">
                    <Text className="text-5xl font-extrabold leading-[52px] text-[#1A0E0E]">
                        TRAIN SMARTER{"\n"}WITH AI POWERED{"\n"}COACHING
                    </Text>

                    <Text className="mt-3 text-base text-gray-600">
                        Track. Improve. Dominate.
                    </Text>

                    <Pressable
                        onPress={() => router.push("/login")}
                        className="mt-7 w-full rounded-md bg-[#E6F20D] py-4"
                    >
                        <Text className="text-center font-bold tracking-widest text-black">
                            LOGIN
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.push("/signup")}
                        className="mt-3 w-full rounded-md bg-[#E9E9E9] py-4"
                    >
                        <Text className="text-center font-bold tracking-widest text-black">
                            CREATE ACCOUNT
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
};
export default Onboarding;
