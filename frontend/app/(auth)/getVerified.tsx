import React, { useState } from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ButtonBlack from "@/app/components/buttonBlack";
import {router, useRouter} from "expo-router";
import UploadSection from "@/app/components/uploadSection";

const getVerified = () => {

    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });


    const isFormValid = () => {
        const { firstName, lastName, email, password } = formData;


        const emailRegex = /\S+@\S+\.\S+/;

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

        return (
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            emailRegex.test(email) &&
            passwordRegex.test(password) &&
            isChecked
        );
    };

    const handleCreateAccount = () => {
        if (isFormValid()) {
            router.push("/(screens)/(social)");
        } else {
            Alert.alert("Invalid Form", "Please ensure all fields are correct and you have agreed to the terms.");
        }
    };
    return (
        <View className="flex-1 bg-white">

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                {/* --- HEADER SECTION --- */}
                <View className="bg-accent-yellow w-full h-80 relative overflow-hidden pt-14 pb-8 px-6">

                    {/* Background Watermark "JOIN" */}
                    <View className="absolute right-0 top-48 opacity-10 overflow-hidden pointer-events-none">
                        <Text className="text-[115px] font-bebas font-bold text-primary-dark leading-none tracking-tighter">
                            VERIFY
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
                            Get Verified as a Coach
                        </Text>
                        <Text className="text-zinc-800 text-sm font-semibold leading-5">
                            Show your expertise. {'\n'}Let AI enhance your coaching.
                        </Text>
                    </View>
                </View>

                {/* --- FORM SECTION --- */}
                <View className="bg-white rounded-t-[30px] pt-10 px-6 flex-1 shadow-sm z-20">
                    <View className="space-y-4">
                        {/* First Name */}
                        <View className="bg-gray-100 rounded-lg px-4 py-4">
                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor="#D6D5D5"
                                className="text-base text-primary-dark font-medium"
                                onChangeText={(val) => setFormData({...formData, firstName: val})}
                            />
                        </View>

                        {/* Last Name */}
                        <View className="bg-gray-100 rounded-lg px-4 py-4">
                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor="#D6D5D5"
                                className="text-base text-primary-dark font-medium"
                                onChangeText={(val) => setFormData({...formData, lastName: val})}
                            />
                        </View>

                        {/* Email */}
                        <View className="bg-gray-100 rounded-lg px-4 py-4">
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#D6D5D5"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="text-base text-primary-dark font-medium"
                                onChangeText={(val) => setFormData({...formData, email: val})}
                            />
                        </View>

                        {/* Password */}
                        <View className="bg-gray-100 rounded-lg px-4 py-4">
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#D6D5D5"
                                secureTextEntry
                                className="text-base text-primary-dark font-medium"
                                onChangeText={(val) => setFormData({...formData, password: val})}
                            />
                        </View>
                    </View>

                    <Text className="text-sm text-neutral-700 mt-2 mb-6 ml-1 leading-4">
                        Password must be at least 8 character long and include 1 capital letter and 1 symbol
                    </Text>

                    {/*ID card number*/}
                    <View className="bg-gray-100 rounded-lg px-4 py-4">
                        <TextInput
                            placeholder="Natioinal Identity Card Number"
                            placeholderTextColor="#D6D5D5"
                            className="text-base text-primary-dark font-medium"
                            onChangeText={(val) => setFormData({...formData, lastName: val})}
                        />
                    </View>

                    <Text className="text-sm text-neutral-700 mt-2 mb-6 ml-1 leading-4">
                        NIC number must be at least 10 character long
                    </Text>

                    <View className="mt-10">
                        <UploadSection />
                    </View>

                    {/* Terms Checkbox */}
                    <View className="flex-row items-start mb-8">
                        <TouchableOpacity
                            onPress={() => setIsChecked(!isChecked)}
                            className={`w-6 h-6 rounded border items-center justify-center mr-3 mt-0.5 ${isChecked ? 'bg-primary-dark border-primary-dark' : 'bg-white border-gray-300'}`}
                        >
                            {isChecked && <Feather name="check" size={16} color="white" />}
                        </TouchableOpacity>
                        <Text className="flex-1 text-sm text-neutral-700">
                            I agree to the <Text className="text-primary-dark font-bold underline">Terms</Text> and <Text className="text-black font-bold underline">Privacy Policy</Text>
                        </Text>
                    </View>

                    <Text className="text-center text-sm text-neutral-700 px-3 pb-8 leading-5 mt-4">
                        Your stats stay protected and are only used to enhance your coaching.
                    </Text>

                    {/* Submit Button - Visual feedback for disabled state */}
                    <View className="mb-10">
                        <ButtonBlack
                            title="CREATE ACCOUNT"
                            onPress={handleCreateAccount}
                        />
                    </View>


                </View>
            </ScrollView>
        </View>
    );
}
export default getVerified
