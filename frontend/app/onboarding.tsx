import { View, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Onboarding = () => {
    return (
        <View className="flex-1 bg-white relative">
            <SafeAreaView className="flex-1">
                <View className="w-40 h-9 relative">
                    <Image
                        source={require("../assets/onboarding/LiveCoach.AI__1___1_-removebg-preview 1.png")}
                        className="w-64 h-52 absolute -left-[2px] -top-[25px]"
                        resizeMode="contain"
                    />
                </View>

                <View className="mt-6 px-10">
                    <View className="relative w-full aspect-square">
                        <Image
                            source={require("../assets/onboarding/bg-1.png")}
                            className="absolute w-[487px] h-[692px] -left-[40px] -top-[50px]"
                            resizeMode="cover"
                        />
                        <Image
                            source={require("../assets/onboarding/Vector.png")}
                            className="absolute right-0 top-0 w-[454px] h-[495px] "
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
