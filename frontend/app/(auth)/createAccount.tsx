import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const CreateAccount = () => {
    //const { signIn } = useSession();

    const onCreateAccount = () => {
        //signIn();              // temp authenticated
        router.replace("/(screens)/(social)");   // let app/index.tsx redirect correctly
    };

    return (
        <View className="flex-1 justify-center bg-white px-6">
            <Text className="text-2xl font-bold text-gray-900">Create Account</Text>

            <Pressable className="mt-8 rounded-xl bg-black py-4" onPress={onCreateAccount}>
                <Text className="text-center font-semibold text-white">Continue</Text>
            </Pressable>
        </View>
    );
};

export default CreateAccount;
const styles = StyleSheet.create({});
