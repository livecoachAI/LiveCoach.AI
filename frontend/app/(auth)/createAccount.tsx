import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';


const CreateAccount = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View className="flex-1 bg-white">

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                {/* --- HEADER SECTION --- */}
                <View className="bg-accent-yellow w-full h-60 relative overflow-hidden">

                    {/* Background Watermark "JOIN" */}
                    <View className="absolute right-0 top-10 opacity-10 overflow-hidden pointer-events-none">
                        <Text className="text-[160px] font-bold text-black leading-none tracking-tighter">
                            JOIN
                        </Text>
                    </View>

                    {/* Logo Placeholder */}
                    <View className="w-max h-3 relative mb-5">
                        <Image
                            source={require("../../assets/createAccount/livecoachai-black.png")}
                            className="w-56 h-48 left-[-31px] top-[-73px] absolute"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Heading Text */}
                    <View>
                        <Text className="text-4xl text-black font-extrabold uppercase tracking-tight mb-2">
                            Create Account
                        </Text>
                        <Text className="text-zinc-800 text-sm font-semibold leading-5">
                            Get personalized coaching guidance{'\n'}powered by AI.
                        </Text>
                    </View>
                </View>

                {/*<View className="w-full h-60 relative bg-accent-yellow overflow-hidden">*/}
                {/*    <View className="left-[16px] top-[148px] absolute inline-flex flex-col justify-start items-start gap-2">*/}
                {/*        <Text className="justify-start text-primary-dark text-2xl font-bebas">Create Account</Text>*/}
                {/*        <Text className="w-80 justify-start text-zinc-800 text-sm font-semibold font-['Manrope']">Get personalized coaching guidance powered by AI.</Text>*/}
                {/*    </View>*/}
                {/*    <Text className="left-[227px] top-[97px] absolute opacity-10 justify-start text-stone-950 text-8xl font-normal font-['Bebas_Neue']">join</Text>*/}
                {/*    <View className="w-40 h-11 left-[16px] top-[41px] absolute">*/}
                {/*        <Image*/}
                {/*                    source={require("../../assets/createAccount/livecoachai-black.png")}*/}
                {/*                    className="w-56 h-48 left-[-31px] top-[-73px] absolute"*/}
                {/*                    resizeMode="contain"*/}
                {/*                />*/}
                {/*    </View>*/}
                {/*</View>*/}

                {/* --- FORM SECTION --- */}

            </ScrollView>
        </View>
    );
}
export default CreateAccount
