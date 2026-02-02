import {View, Text} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Upload from './upload';

const Index = () => {

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-4 py-4 pt-6 flex-1">
                <Text className="font-bebas text-4xl font-bold text-black">
                    Upload Video
                </Text>

                <View className="mt-4 flex-1">
                    <Upload />
                </View>     
            </View>
        </SafeAreaView>
    )
}
export default Index