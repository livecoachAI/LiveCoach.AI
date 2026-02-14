import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Splash from '../(splash)/splash';

const Index = () => {

    return (
        <SafeAreaView className="flex-1 bg-neutral-50">
            <View className="flex-1">
                <Splash/>
            </View>
        </SafeAreaView>
    )
}
export default Index