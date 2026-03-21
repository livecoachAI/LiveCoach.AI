import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
};

const MyGigButton = ({ onPress }: Props) => {
  return (
    /* Added mx-4 to reduce the full width of the card */
    <View className="bg-neutral-100 rounded-[24px] p-5 mt-6 mx-4 shadow-sm border border-neutral-200 overflow-hidden relative">
      
      {/* Background Watermark Checkmark - Scaled down for the smaller card */}
      <View 
        className="absolute -right-4 -top-2 "
        style={{ transform: [{ rotate: '15deg' }] }}
      >
        <Feather name="check-circle" size={100} color="#b3da9db6" />
      </View>

      <View className="flex-col">
        {/* Status Row */}
        <View className="flex-row items-center">
          <View className="relative w-3.5 h-3.5 items-center justify-center mr-1">
            <View className="absolute w-full h-full bg-green-500/20 rounded-full" />
            <View className="w-2 h-2 bg-green-500 rounded-full border border-neutral-50" />
          </View>
          
          {/* Reduced text size from text-2xl to text-lg/xl */}
          <Text className="font-manrope text-black font-extrabold text-lg tracking-tight uppercase">
            Gig is active
          </Text>
        </View>

        {/* Action Link - Aligned with the smaller text */}
        <TouchableOpacity 
          activeOpacity={0.6}
          onPress={onPress}
          className="flex-row items-center mt-2 ml-5.5 self-start"
        >
          <Text className="font-manrope text-neutral-700 font-bold text-xs ml-5 mr-1 uppercase tracking-wider">
            Go to My Gig
          </Text>
          <Feather name="arrow-right" size={14} color="#525252" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyGigButton;