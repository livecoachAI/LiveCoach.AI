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
      <View
  className="mt-10 bg-white rounded-2xl p-8 border border-gray-100"
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
      <View
  className="mt-6 bg-white rounded-2xl p-4 border border-gray-100"
  style={{
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  }}
>
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-semibold text-gray-700">
            Distance to Expert
          </Text>
          <Text className="text-lg font-medium text-gray-700">
            {distanceValue} units
          </Text>
        </View>

        {/* Progress Section */}
  <View className="relative pt-6 pb-4">

    {/* Track */}
    <View className="h-4 bg-gray-200 rounded-full overflow-visible">

      {/* Gradient Fill */}
      <View
        className="h-4 rounded-full"
        style={{
          width: `${distanceProgress}%`,
          backgroundColor: '#8B5CF6', // purple (simple version)
        }}
      />

      {/* Animated Avatar */}
            <View
  className="absolute -top-4 w-10 h-10 rounded-full items-center justify-center border-4"
  style={{
    left: `${distanceProgress}%`,
    transform: [{ translateX: -20 }],
    backgroundColor: 'white',
    borderColor: '#EC4899',
  }}
>
  <Animated.Text
    style={{
      fontSize: 16,
      color: '#EC4899',
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
    <MaterialIcons name="directions-run" size={22} color="black" />
  </Animated.Text>
</View>

          </View>

    {/* Labels */}
    <View className="flex-row justify-between mt-6">
      <View>
        <Text className="text-[10px] font-black text-blue-500 uppercase">
          YOU
        </Text>
        <Text className="text-xs font-bold text-gray-400">
          0%
        </Text>
      </View>

      <View className="items-end">
        <Text className="text-[10px] font-black text-pink-500 uppercase">
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
      <View
  className="mt-10 bg-white rounded-2xl p-8 border border-gray-100"
  style={{
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  }}
>
        <Text className="text-2xl font-semibold text-black mb-4">
          Similarity Score
        </Text>

        <View className="items-center mb-6">
          <Text className="text-4xl font-semibold" style={{ color: '#1976D2' }}>
            {similarityScore}
          </Text>
        </View>

        {/* Dotted line + Dynamic Blue dot */}
        <View className="relative">
             {/* Dotted line */}
            <View className="flex-row justify-between mb-1">
                <View className="flex-1 border-t border-dotted border-gray-300" />
            </View>
    
        {/*  DYNAMIC BLUE DOT - moves based on similarityScore */}
        <View 
            className="absolute top-[-4px] w-2 h-2 rounded-full" 
            style={{ 
                left: `${similarityScore * 100}%`,  // 0.062 → 6.2% from left
                backgroundColor: '#1976D2',
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
<View
  className="mt-10 bg-white rounded-2xl p-8 border border-gray-100"
  style={{
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  }}
>
  <Text className="text-2xl font-semibold text-black mb-4">Feedback</Text>

  <View className="space-y-3">
    {feedbackPositive.map((item, index) => (
      <View key={`pos-${index}`} className="flex-row items-start space-x-3">
        <View
          className="w-2 h-2 rounded-full mt-1.5"
          style={{ backgroundColor: '#43A047' }}
        />
        <Text className="text-sm text-gray-700 flex-1">
          {item}
        </Text>
      </View>
    ))}

    {feedbackNegative.map((item, index) => (
      <View key={`neg-${index}`} className="flex-row items-start space-x-3">
        <View
          className="w-2 h-2 rounded-full mt-1.5"
          style={{ backgroundColor: '#EF5350' }}
        />
        <Text className="text-sm text-gray-600 flex-1">
          {item}
        </Text>
      </View>
    ))}
  </View>
</View>


      {/* Recommendations */}
<View
  className="mt-10 bg-white rounded-2xl p-8 border border-gray-100"
  style={{
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  }}
>
  <Text className="text-2xl font-semibold text-black mb-4">
    Recommendations
  </Text>

  <View className="space-y-3">
    {recommendations.map((item, index) => (
      <View
        key={`rec-${index}`}
        className="flex-row items-center px-4 py-3 rounded-full border-2"
        style={{
          borderColor: index === 0 ? '#1976D2' : '#9CA3AF',
        }}
      >
        <Text
          className="mr-3 text-lg"
          style={{ color: index === 0 ? '#1976D2' : '#6B7280' }}
        >
          {index === 0 ? '▶' : '⏪'}
        </Text>
        <Text className="text-sm text-gray-800 flex-1">
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
