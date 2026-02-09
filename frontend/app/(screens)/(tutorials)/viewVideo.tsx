import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView , Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//TabButton props
type TabButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

//TabButton
const TabButton = ({ label, isActive, onPress }: TabButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center"
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
    >
      {/* Left triangle */}
      <View
        className={`w-0 h-0
          border-t-[18px] border-t-transparent
          border-b-[18px] border-b-transparent
          border-r-[12px]
          ${isActive ? 'border-r-accent-yellow' : 'border-r-white'}
        `}
      />

      {/* Body */}
      <View
        className={`h-[35px] px-2 justify-center items-center
          ${isActive ? 'bg-accent-yellow' : 'bg-white'}
        `}
      >
        <Text className="font-manrope font-semibold text-primary-dark">
          {label}
        </Text>
      </View>

      {/* Right triangle */}
      <View
        className={`w-0 h-0
          border-t-[18px] border-t-transparent
          border-b-[18px] border-b-transparent
          border-l-[12px]
          ${isActive ? 'border-l-accent-yellow' : 'border-l-white'}
        `}
      />
    </Pressable>
  );
};


const ViewVideo = () => {
  const [currentStep, setCurrentStep] = useState('cricket');

  const cricketTutorial = [
    'COVER DRIVE',
    'LEG GLANCE',
    'STRAIGHT DRIVE',
    'SQUARE CUT',
    'LATE CUT',
    'PADDLE SWEEP',
    'SLOG SWEEP',
  ];

  const badmintonTutorial = [
    'SMASH',
    'CLEAR',
    'DROP',
    'NET SHOT',
  ];

  const techniques =
    currentStep === 'cricket'
      ? cricketTutorial
      : badmintonTutorial;

  return (
    <View className="flex-1">
      <View className="bg-neutral-50 pt-6 pb-4 px-4 -mx-4">
        {/* Header with Search */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="font-bebas text-4xl font-bold text-primary-dark">
            TUTORIALS
          </Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="search" size={28} color="#150000" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row gap-3">
          <TabButton 
            label="Cricket" 
            isActive={currentStep === 'cricket'}
            onPress={() => setCurrentStep('cricket')}
          />
          
          <TabButton 
            label="Badminton" 
            isActive={currentStep === 'badminton'}
            onPress={() => setCurrentStep('badminton')}
          />
        </View>
      </View>

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false} className="mt-6">
        {techniques.map((technique, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between py-5 border-b border-neutral-100"
          >
            <Text className="text-base font-manrope font-medium text-primary-dark">
              {technique}
            </Text>

            <Ionicons name="chevron-forward" size={24} color="#ADABAB" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewVideo;