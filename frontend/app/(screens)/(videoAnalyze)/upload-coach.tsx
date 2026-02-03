import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronDown } from 'lucide-react-native';
import ButtonYellow from '@/app/components/buttonYellow';

const Upload = () => {
    return (
        <View className="flex-1">
            {/* Form Fields */}
            <View>
            <TextInput
                placeholder="Session title"
                placeholderTextColor="#ADABAB"
                className="bg-neutral-50 p-4 rounded-sm text-base mb-8"
            />
                
            <TextInput
                placeholder="Session Details"
                placeholderTextColor="#ADABAB"
                numberOfLines={4}
                className="bg-neutral-50 p-4 rounded-sm text-base"
            />

            {/* Styled Dropdowns */}
            <TouchableOpacity 
                className="bg-neutral-200 self-start flex-row items-center px-4 py-2 my-8"
            >
                <Text className="font-bold uppercase mr-2 text-xs">Cricket</Text>
                <ChevronDown size={16} color="black" />
            </TouchableOpacity>

            <TouchableOpacity 
                className="bg-neutral-200 self-start flex-row items-center px-4 py-2"
            >
                <Text className="font-bold uppercase mr-2 text-xs">Cover Drive</Text>
                <ChevronDown size={16} color="black" />
            </TouchableOpacity>

            <View className="mb-10">
                <ButtonYellow
                    title="UPLOAD VIDEO"
                />
            </View>
            
            </View>
        </View>    
    )
}

export default Upload
