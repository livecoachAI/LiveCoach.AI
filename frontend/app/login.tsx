import {Button, Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {router} from "expo-router";

const Login = () => {
    const onLogin = async () => {
        // TODO: validate credentials / call API
        router.replace("/(tabs)/home");
    };
    return (
        <View className="flex-1 justify-center bg-white px-6">
            <Text className="text-2xl font-bold text-gray-900">Login</Text>

            <Pressable className="mt-8 rounded-xl bg-black py-4" onPress={onLogin}>
                <Text className="text-center font-semibold text-white">Login</Text>
            </Pressable>
        </View>
    );
}
export default Login
const styles = StyleSheet.create({})
