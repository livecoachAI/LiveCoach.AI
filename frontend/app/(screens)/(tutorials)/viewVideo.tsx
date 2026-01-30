import React, {useState} from 'react';
import {View, Text, StatusBar, TouchableOpacity, ScrollView} from 'react-native';

const ViewVideo = () => {
  const [currentStep, setCurrentStep] = useState('cricket');

  const cricketTutorial = [
    'COVER DRIVE',
    'LEG GLANCE',
    'STRAIGHT DRIVE',
    'SQUARE CUT',
    'PULL SHOT',
    'LATE CUT',
    'PADDLE SWEEP',
    'SLOG SWEEP',
  ];

  const badmintonTutorial = [
    'SMASH',
    'CLEAR',
    'DROP',
    'NET SHOT'
  ];

  const techniques = currentStep === 'cricket' ? cricketTutorial : badmintonTutorial;

  return (
    <View className="flex-1"> 
      <StatusBar barStyle="dark-content"/>

      {/* Tabs Container */}
      <View className="pb-3 border-b border-gray-100">
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setCurrentStep('cricket')}
            className={`px-5 py-2.5 rounded-full ${currentStep === 'cricket' ? 'bg-[#F8FE11]' : 'bg-gray-100'}`}
          >
            <Text 
              className={`text-sm font-semibold ${currentStep === 'cricket' ? 'text-[#150000]' : 'text-gray-600'}`}>
              Cricket
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrentStep('badminton')}
            className={`px-5 py-2.5 rounded-full ${currentStep === 'badminton' ? 'bg-[#F8FE11]' : 'bg-gray-100'}`}
          >
            <Text 
              className={`text-sm font-semibold ${currentStep === 'badminton' ? 'text-[#150000]' : 'text-gray-600'}`}>
              Badminton
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Techniques List */}
      <ScrollView className="flex-1">
        {techniques.map((technique, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row justify-between items-center px-4 py-4 border-b border-gray-50"
          >
            <Text 
            numberOfLines={1}
            className="text-sm font-medium text-[#150000]">{technique}</Text>
            <Text className="text-xl text-gray-300">›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewVideo;