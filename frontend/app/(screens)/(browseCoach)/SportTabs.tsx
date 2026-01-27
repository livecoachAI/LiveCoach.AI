import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

const SportTabs = () => {
  const [selectedSport, setSelectedSport] = useState('Cricket');

  const tabClass = (sport: string) => {
    if (selectedSport === sport) {
      return 'px-5 py-2 rounded-full mr-6 bg-[#E6F20D]';
    }
    return 'px-5 py-2 rounded-full mr-6 bg-gray-200';
  };

  const textClass = (sport: string) => {
    if (selectedSport === sport) {
      return 'font-semibold text-black';
    }
    return 'font-semibold text-gray-600';
  };

  return (
    <View className="pt-2.5">
      <View className="flex-row">
        
        <Pressable
          onPress={() => setSelectedSport('Cricket')}
          className={tabClass('Cricket')}
        >
          <Text className={textClass('Cricket')}>Cricket</Text>
        </Pressable>


        <Pressable
          onPress={() => setSelectedSport('Badminton')}
          className={tabClass('Badminton')}
        >
          <Text className={textClass('Badminton')}>Badminton</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SportTabs;
