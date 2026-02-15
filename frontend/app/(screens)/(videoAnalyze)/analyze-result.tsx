import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnalyticsCard, { AnalyticsData } from './AnalyticsCard';

const dummyAnalytics: AnalyticsData = {
  overallScore: 26,
  maxScore: 100,
  distanceValue: 1.369,
  distanceProgress: 26,
  similarityScore: 0.062,
  feedbackPositive: [
    'All joints showing smooth, controlled movement!',
  ],
  feedbackNegative: [
    'Significant deviations from expert form detected.',
  ],
  recommendations: [
    'Watch expert videos to understand proper form',
    'Practice the motion slowly to build muscle memory',
  ],
};


const AnalyzeResult = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-6 pb-2">
        <Text className="font-bebas text-4xl font-bold text-black">
          ANALYTICS AND FEEDBACK
        </Text>
      </View>

      <ScrollView className="px-4" contentContainerStyle={{ paddingBottom: 24 }}>
        <AnalyticsCard data={dummyAnalytics} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyzeResult;
