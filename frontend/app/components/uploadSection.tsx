import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Pressable, View, Text } from "react-native";

export default function UploadSection(){
    return (
        <View className="p-4">
            <Text className="font-bebas text-2xl mb-4 uppercase text-neutral-800">
                Upload Certificates
            </Text>

            <Pressable
                onPress={() => console.log("Upload pressed")}
                className="w-full bg-neutral-300 rounded-[30px] py-12 items-center justify-center border-2 border-transparent active:border-neutral-400"
            >
                <Feather name="upload" size={60} color="#888" />
                <Text className="text-neutral-500 font-bold mt-4 tracking-widest uppercase">
                    Upload Files
                </Text>
            </Pressable>
        </View>
    );
};