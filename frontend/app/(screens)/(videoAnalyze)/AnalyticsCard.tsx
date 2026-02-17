import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';

export type AnalyticsData = {
  overallScore: number;
  maxScore: number;
  distanceValue: number;       // e.g. 1.369
  distanceProgress: number;    // 0–100
  similarityScore: number;     // e.g. 0.062
  overallFeedback?: string;
  feedbackPositive: string[];      // ✅ list of good points
  feedbackNegative: string[];      // ✅ list of issues
  recommendations: string[];       // ✅ list of suggestions
};

type Props = {
  data: AnalyticsData;
};

const AnalyticsCard = ({ data }: Props) => {
  const { overallScore, maxScore, distanceValue, distanceProgress, similarityScore, feedbackPositive, feedbackNegative,
  recommendations, } = data;

  const radius = 65;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const scorePercentage = (overallScore / maxScore) * 100;
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

  /* BOUNCE ANIMATION  */

  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -3,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);


  return (
    <View className="flex-1">
      {/* Overall Score */}
      {/* <View className="mt-10 bg-white rounded-2xl p-8 border border-gray-100 shadow-lg shadow-black/5"> */}
      <View className="mt-10 bg-white rounded-2xl p-8 border border-gray-100"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 4,
          }}
      >
        <View className="flex-row items-center">
          {/* Circle */}
          <View className="mr-5">
            <Svg width={radius * 2 + 10} height={radius * 2 + 10}>
              <Circle
                cx={radius + 5}
                cy={radius + 5}
                r={normalizedRadius}
                stroke="#E0E0E0"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={radius + 5}
                cy={radius + 5}
                r={normalizedRadius}
                stroke="#EF5350"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${radius + 5} ${radius + 5})`}
              />
            </Svg>

            <View className="absolute left-0 right-0 top-0 bottom-0 items-center justify-center">
              <Text className="text-2xl font-bold text-black">
                {overallScore}/{maxScore}
              </Text>
              <Text className="text-[12px] text-gray-500 italic">Overall Score</Text>
            </View>
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-2xl font-semibold text-red-500 mb-1">
              Needs improvement
            </Text>
            <Text className="text-lg text-gray-500">Today&apos;s session</Text>
          </View>
        </View>
      </View>

      
      {/* Distance to Expert */}
      <View className="mt-6 bg-white rounded-2xl p-4 border border-gray-100"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 4,
          }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-semibold text-gray-900">
            Distance to Expert
          </Text>
          <Text className="text-lg font-medium text-gray-700">
            {distanceValue} units
          </Text>
        </View>

        {/* Progress Section */}
        <View className="relative pt-6 pb-4">
          <View className="h-4 bg-gray-200 rounded-full overflow-visible">
            <View className="h-4 rounded-full bg-accent-yellow"
                style={{
                  width: `${distanceProgress}%`,
                }}
            />

            {/* Animated Avatar */}
            <View className="absolute -top-4 w-10 h-10 rounded-full items-center justify-center border-4 "
                style={{
                  left: `${distanceProgress}%`,
                  transform: [{ translateX: -20 }],
                  backgroundColor: 'white',
                  borderColor: '#E6F20D',
                }}
            >
              <Animated.View
                style={{
                  transform: [
                    { translateY: bounceAnim },
                      {
                        rotate: bounceAnim.interpolate({
                        inputRange: [-3, 0],
                        outputRange: ['-3deg', '0deg'],
                        }),
                      },
                  ],
                }}
              >
              <MaterialIcons name="directions-run" size={22} color="#111827" />
              </Animated.View>
            </View>
          </View>

            {/* Labels */}
          <View className="flex-row justify-between mt-6">
            <View>
              <Text className="text-[10px] font-black text-green-500 uppercase">
              YOU
              </Text>
              <Text className="text-xs font-bold text-gray-400">
                0%
             </Text>
            </View>

            <View className="items-end">
              <Text className="text-[10px] font-black text-red-500 uppercase">
               EXPERT
              </Text>
              <Text className="text-xs font-bold text-gray-400">
              100%
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Similarity Score */}
      <View className="mt-10 bg-white rounded-2xl p-4 border border-gray-100"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        <Text className="text-2xl font-semibold text-gray-900 mb-4">
          Similarity Score
        </Text>

        <View className="items-center mb-6">
          <Text className="text-4xl font-semibold" style={{ color: '#FACC15' }}>
            {similarityScore}
          </Text>
        </View>

        {/* Dotted line + Dynamic Blue dot */}
        <View className="relative">
             {/* Dotted line */}
            <View className="flex-row justify-between mb-2">
                <View className="flex-1 border-t-2 border-dotted border-gray-400" />
            </View>
    
        {/*  DYNAMIC BLUE DOT - moves based on similarityScore */}
        <View 
            className="absolute top-[-5px] w-3 h-3 rounded-full shadow-md" 
            style={{ 
                left: `${similarityScore * 100}%`,  // 0.062 → 6.2% from left
                backgroundColor: '#FACC15',
                transform: [{ translateX: -6 }] // center the dot
            }}
        />


          <View className="flex-row justify-between">
            <Text className="text-xs text-gray-500">Low</Text>
            <Text className="text-xs text-gray-500">Medium</Text>
            <Text className="text-xs text-gray-500">High</Text>
          </View>
        </View>
      </View>

      
      
      {/* Feedback */}
      {/* Feedback – Coach Notes timeline style */}
<View
  className="mt-10 bg-white rounded-2xl p-5 border border-gray-100"
  style={{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  }}
>
  {/* Title */}
  <Text className="text-2xl font-semibold text-gray-900 mb-6">
    Feedback
  </Text>

  {/* Summary Box */}
          <View className="bg-yellow-50 rounded-xl p-5 mb-8">
            <Text className="text-gray-800 leading-relaxed">
              {data.overallFeedback}
            </Text>
          </View>

  {/* Timeline container */}
  <View className="relative">
    {/* Vertical line */}
    <View className="absolute left-5 top-0 bottom-0 w-[1px] bg-gray-200" />

    {/* Combined notes */}
    <View>
      {/* 1) Positive notes */}
      {feedbackPositive.map((item, index) => (
        <View
          key={`pos-${index}`}
          className="relative flex-row items-start mb-6"
        >
          {/* Yellow circle with green check */}
          <View className="z-10 mr-4 ml-1">
            <View className="w-8 h-8 rounded-full bg-accent-yellow items-center justify-center">
              <MaterialIcons name="check" size={18} color="#16A34A" />
            </View>
          </View>

          {/* Text */}
          <View className="flex-1 pt-1">
            <Text className="text-sm text-gray-800 leading-relaxed">
              {item}
            </Text>
          </View>
        </View>
      ))}

      {/* 2) Negative notes */}
      {feedbackNegative.map((item, index) => (
        <View
          key={`neg-${index}`}
          className="relative flex-row items-start mb-6"
        >
          {/* Yellow circle with red alert */}
          <View className="z-10 mr-4 ml-1">
            <View className="w-8 h-8 rounded-full bg-accent-yellow items-center justify-center">
              <MaterialIcons name="error-outline" size={18} color="#DC2626" />
            </View>
          </View>

          {/* Text */}
          <View className="flex-1 pt-1">
            <Text className="text-sm text-gray-800 leading-relaxed">
              {item}
            </Text>
          </View>
        </View>
      ))}
    </View>
  </View>
</View>


       


      
      {/* Recommendations */}
      <View className="mt-10 bg-white rounded-2xl p-4 border border-gray-100"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        <Text className="text-2xl font-semibold text-gray-700 mb-4">
          Recommendations
        </Text>

        <View className="space-y-3">
          {recommendations.map((item, index) => (
            <View
              key={`rec-${index}`}
              className="flex-row items-center px-4 py-3 rounded-full bg-yellow-50 mb-2"
            >
              <View className="w-9 h-9 rounded-full bg-amber-100 items-center justify-center mr-3">
                <MaterialIcons name="tips-and-updates" size={20} color="#FACC15" />
              </View>
              <Text className="text-sm text-gray-800 flex-1 ">
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>

    </View>
  );
};

export default AnalyticsCard;
