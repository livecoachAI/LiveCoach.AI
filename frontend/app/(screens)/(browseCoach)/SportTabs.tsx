import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

type Props = {
  onSportChange: (sport: 'Cricket' | 'Badminton') => void;
};

const SportTabs = ({ onSportChange }: Props) => {
  const [selectedSport, setSelectedSport] =
    useState<'Cricket' | 'Badminton'>('Cricket');

  const tabClass = (sport: 'Cricket' | 'Badminton') =>
    selectedSport === sport
      ? 'px-5 py-2 rounded-md mr-6 bg-[#E6F20D]'
      : 'px-5 py-2 rounded-md mr-6 bg-gray-200';

  const textClass = (sport: 'Cricket' | 'Badminton') =>
    selectedSport === sport
      ? 'font-semibold text-black'
      : 'font-semibold text-gray-600';

  const handlePress = (sport: 'Cricket' | 'Badminton') => {
    setSelectedSport(sport);
    onSportChange(sport);
  };

  return (
    <View className="pt-2.5">
      <View className="flex-row">
        <Pressable
          onPress={() => handlePress('Cricket')}
          className={tabClass('Cricket')}
        >
          <Text className={textClass('Cricket')}>Cricket</Text>
        </Pressable>

        <Pressable
          onPress={() => handlePress('Badminton')}
          className={tabClass('Badminton')}
        >
          <Text className={textClass('Badminton')}>Badminton</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SportTabs;
