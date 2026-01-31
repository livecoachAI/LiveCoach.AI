import {View, Text} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SportTabs from './SportTabs';

const Index = () => {

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-4 py-4 pt-6">
                <Text className="font-bebas text-2xl font-bold text-black">
                    COACH GIGS
                </Text>

                <View className="mt-4">
                    <SportTabs />
                </View>     
            </View>
        </SafeAreaView>
    )
}
export default Index
