import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewVideo from './viewVideo';

const Index = () => {

    return (
        <SafeAreaView className="flex-1 bg-neutral-50">
            <View className="flex-1">
                <ViewVideo />
            </View>
        </SafeAreaView>
    )
}
export default Index