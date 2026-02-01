import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';


const CreateAccount = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View className="flex-1 bg-white">

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                {/* --- HEADER SECTION --- */}
                <View className="bg-accent-yellow w-full h-80 relative overflow-hidden pt-14 pb-8 px-6">

                    {/* Background Watermark "JOIN" */}
                    <View className="absolute right-0 top-16 opacity-10 overflow-hidden pointer-events-none">
                        <Text className="text-[160px] font-bebas font-bold text-black leading-none tracking-tighter">
                            JOIN
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
                    <View className="w-full h-full flex-col  justify-start items-start gap-2 mt-8">
                        <Text className="font-bebas text-black uppercase tracking-tight mb-2">
                            Create Account
                        </Text>
                        <Text className="text-zinc-800 text-sm font-semibold leading-5">
                            Get personalized coaching guidance{'\n'}powered by AI.
                        </Text>
                    </View>
                </View>

                {/* --- FORM SECTION --- */}

            </ScrollView>
        </View>
    );
}
export default CreateAccount
