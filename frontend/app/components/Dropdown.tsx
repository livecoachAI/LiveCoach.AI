import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  label: string;
};

export default function Dropdown({ label }: Props) {
  return (
    <View>
        <SafeAreaView className="flex-1">
        <View className="mt-auto px-6 pb-8">
            <Pressable className="w-full rounded-md bg- py-4">
                <Text className="text-center font-bold tracking-widest text-black">
                    CREATE ACCOUNT
                </Text>
            </Pressable>
        </View>
    </SafeAreaView>
    </View>
  );
}
