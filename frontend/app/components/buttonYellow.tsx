import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

type ButtonProps = {
    title: string;
    onPress?: () => void;
};

export default function ButtonYellow({title, onPress}: ButtonProps) {

    const router = useRouter();

    return (
        <Pressable
            className="mt-7 w-full flex-row items-center active:opacity-80"
        >
            {/* Left Tip */}
            <View className="w-0 h-0 border-t-[26px] border-t-transparent border-b-[26px] border-b-transparent border-r-[20px] border-r-accent-yellow" />

            {/* Center Body (flex-1 ensures it fills the w-full) */}
            <View className="flex-1 h-[52px] bg-accent-yellow justify-center items-center">
                <Text className="text-center font-bebas tracking-widest text-black text-lg">
                    {title}
                </Text>
            </View>

            {/* Right Tip */}
            <View className="w-0 h-0 border-t-[26px] border-t-transparent border-b-[26px] border-b-transparent border-l-[20px] border-l-accent-yellow" />
        </Pressable>
    );
}
// <Button title="LOGIN" onPress={() => router.push("/(auth)/signIn")} />
// <Button title="CREATE ACCOUNT" onPress={() => router.push("/(auth)/createAccount")} />