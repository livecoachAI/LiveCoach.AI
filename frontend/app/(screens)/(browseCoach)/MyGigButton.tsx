import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
  sport: 'Cricket' | 'Badminton';
};

const MyGigButton = ({ onPress, sport }: Props) => {
  return (
    <View className="bg-neutral-100 rounded-[32px] p-5 mt-4 mx-4 shadow-md border border-white overflow-hidden relative min-h-[90px] justify-center">
      
      {/* 1. Simple Icon Background (Replaces all that SVG code) */}
      <View className="absolute -right-1 -bottom-2 opacity-[0.07]">
        <MaterialCommunityIcons 
          name={sport === 'Cricket' ? "cricket" : "badminton"} 
          size={90} 
          color="#1f2937" 
        />
      </View>

      {/* 2. Content */}
      <View className="relative z-10">
        <View className="flex-row items-center gap-3">
          {/* Status Circle */}
          <View className="h-10 w-10 items-center justify-center rounded-full bg-green-500 shadow-sm">
            <View className="absolute inset-0 rounded-full bg-white opacity-20 scale-125" />
            <Text className="text-[8px] font-bold text-white uppercase">Active</Text>
          </View>

          <Text className="text-lg font-bold uppercase tracking-tight text-gray-900">
            Gig Created
          </Text>
        </View>

        {/* Aligned Link */}
        <TouchableOpacity 
          onPress={onPress}
          activeOpacity={0.7}
          className="flex-row items-center  ml-[46px] self-start"
        >
          <Text className="font-semibold text-gray-600 text-xs mr-1 uppercase">
            Go to My Gig
          </Text>
          <MaterialCommunityIcons name="arrow-right" size={16} color="#22c55e" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyGigButton;