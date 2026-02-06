import React, { useState } from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ButtonBlack from "@/app/components/buttonBlack";
import ButtonGray from "@/app/components/buttonGray";
import {router, useRouter} from "expo-router";

const SignIn = () => {

    const router = useRouter();

    return (
        <View className="flex-1 bg-white">

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                {/* --- HEADER SECTION --- */}
                <View className="bg-accent-yellow w-full h-80 relative overflow-hidden pt-14 pb-8 px-6">

                    {/* Background Watermark "JOIN" */}
                    <View className="absolute right-0 top-52 opacity-10 overflow-hidden pointer-events-none">
                        <Text className="text-[105px] font-bebas font-bold text-primary-dark leading-none tracking-tighter">
                            SIGN IN
                        </Text>
                    </View>

                    {/* Logo Placeholder */}
                    <View className=" mb-20">
                        <Image
                            source={require("../../assets/createAccount/livecoachai-black.png")}
                            className="w-[221px] h-[199px] left-[-31px] top-[-73px] absolute"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Heading Text */}
                    <View className="w-full h-full flex-col  justify-start items-start gap-2 mt-10 ml-2">
                        <Text className="font-bebas text-primary-dark uppercase tracking-tight mb-2">
                            SIGN IN
                        </Text>
                        <Text className="text-zinc-800 text-sm font-semibold leading-5">
                            Welcome back!
                        </Text>
                    </View>
                </View>

                <View className="bg-white rounded-t-[30px] pt-10 px-6 flex-1 shadow-sm z-20">
                    <View className="gap-y-4">

                        {/* Email */}
                        <View className="bg-gray-100 rounded-lg px-4 py-4">
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#D6D5D5"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="text-base text-primary-dark font-medium"
                                //onChangeText={(val) => setFormData({...formData, email: val})}
                            />
                        </View>

                        {/* Password */}
                        <View className="bg-gray-100 rounded-lg px-4 py-4">
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#D6D5D5"
                                secureTextEntry
                                className="text-base text-primary-dark font-medium"
                                //onChangeText={(val) => setFormData({...formData, password: val})}
                            />
                        </View>
                        {/* Forgot Password */}
                        <TouchableOpacity className="items-end mb-8 ml-4">
                            <Text className="text-neutral-700 text-xs underline">
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>


                    {/* Submit Button - Visual feedback for disabled state */}
                    <View className="mt-10">
                        <ButtonBlack
                            title="SIGN IN"
                            //onPress={handleCreateAccount}
                        />
                    </View>

                    <View className="items-center mt-6">
                        <Text className="text-neutral-700 text-3xl font-bebas">OR</Text>
                    </View>

                    <View>
                        <ButtonGray
                            title="SIGN UP"
                            onPress={()=> router.push("/(auth)/landing")}
                        />
                    </View>

                </View>

            </ScrollView>
        </View>
    );
}
export default SignIn
