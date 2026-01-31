import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SportTabs from './SportTabs';
import CoachCard from './CoachCard';

const Index = () => {
  const [selectedSport, setSelectedSport] =
    useState<'Cricket' | 'Badminton'>('Cricket');

  const coaches = [
    {
      id: 1,
      name: 'John haden',
      location: 'Colombo, Sri Lanka',
      sport: 'Cricket',
      image: require('../../../assets/BrowseCoachImages/cricketCoach1.png'),
    },
    {
      id: 2,
      name: 'Kumara Silva',
      location: 'Kandy, Sri Lanka',
      sport: 'Cricket',
      image: require('../../../assets/BrowseCoachImages/cricketCoach2.jpg'),
    },
    {
      id: 3,
      name: 'Alex Perera',
      location: 'Galle, Sri Lanka',
      sport: 'Badminton',
      image: require('../../../assets/BrowseCoachImages/badmintonCoach1.jpg'),
    },
    {
      id: 4,
      name: 'Brewon Dias',
      location: 'Colombo, Sri Lanka',
      sport: 'Badminton',
      image: require('../../../assets/BrowseCoachImages/badmintonCoach2.jpg'),
    },
    {
      id: 5,
      name: 'Kumar Silva',
      location: 'Kandy, Sri Lanka',
      sport: 'Cricket',
      image: require('../../../assets/BrowseCoachImages/cricketCoach3.jpg'),
    },
    {
      id: 6,
      name: 'David Fernando',
      location: 'Colombo, Sri Lanka',
      sport: 'Badminton',
      image: require('../../../assets/BrowseCoachImages/badmintonCoach3.jpg'),
    },
    
    
  ];

  const visibleCoaches = coaches.filter(
    c => c.sport === selectedSport,
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="px-4 py-4 pt-6">
          <Text className="text-2xl font-bold text-black">
            COACH GIGS
          </Text>

          <View className="mt-4">
            <SportTabs onSportChange={setSelectedSport} />
          </View>

          <View className="mt-4 flex-row flex-wrap justify-between">
            {visibleCoaches.map(coach => (
                <View key={coach.id} className="w-[48%] mb-4">
              <CoachCard
                key={coach.id}
                name={coach.name}
                location={coach.location}
                image={coach.image}
              />
              </View>
            ))}
          </View>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
