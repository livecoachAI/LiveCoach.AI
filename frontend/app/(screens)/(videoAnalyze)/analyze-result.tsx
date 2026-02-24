import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnalyticsCard, { AnalyticsData } from './AnalyticsCard';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';   //for back arrow

const dummyAnalytics: AnalyticsData = {
  overallScore: 20,
  maxScore: 100,
  // distanceValue: 1.369,
  // distanceProgress: 26,
  // similarityScore: 0.564,
  overallFeedback: "Form needs improvement, but joint control is solid.",
  feedbackPositive: [
    'All joints showing smooth, controlled movement!',
    'Great balance maintained during the follow-through.',
    'Consistent tempo throughout most of the motion.',
  ],
  feedbackNegative: [
    'Significant deviations from expert form detected.',
    'Front knee collapsing slightly at impact.',
  ],
  recommendations: [
    'Watch expert videos to understand proper form',
    'Practice the motion slowly to build muscle memory',
  ],
};

const AnalyzeResult = () => {
  const navigation = useNavigation<any>();    // for back arrow

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="px-4 pt-6">
        <View className="flex-row items-start mb-4 w-full">
          <TouchableOpacity 
            onPress={() => {
                    // Go to the 3rd tab = (videoAnalyze)/index (Upload Video)
                    navigation.navigate('(videoAnalyze)/index');
                  }}
            className="p-1 -ml-2  flex-shrink-0"
          >
            <Ionicons name="chevron-back" size={36} color="black" />
          </TouchableOpacity>
          
          <Text 
            className="font-bebas font-bold text-black flex-1 text-4xl "
            style={{ lineHeight: 40 }} 
          >
            ANALYTICS AND FEEDBACK
          </Text>
        </View>
      </View>





      <ScrollView className="px-4" contentContainerStyle={{ paddingBottom: 24 }}>
        <AnalyticsCard data={dummyAnalytics} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyzeResult;
