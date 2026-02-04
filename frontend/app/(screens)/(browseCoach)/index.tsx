import { View, Text, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SportTabs from './SportTabs';
import CoachCard from './CoachCard';
import CoachContactModal from './CoachContactModel';



type Coach = {
  id: number;
  name: string;
  location: string;
  sport: 'Cricket' | 'Badminton';
  phone?: string;
  email?: string;
  image: any;
};


const Index = () => {
  const [selectedSport, setSelectedSport] =
    useState<'Cricket' | 'Badminton'>('Cricket');

const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

const coaches: Coach[] = [
    {
      id: 1,
      name: 'John haden',
      location: 'Colombo',
      sport: 'Cricket',
      phone: '+94 77 123 4567',  
      email: 'john@coach.com',
      image: require('../../../assets/BrowseCoachImages/cricketCoach1.png'),
    },
    {
      id: 2,
      name: 'Kumara Silva',
      location: 'Kandy',
      sport: 'Cricket',
      phone: '+94 71 234 5678',
      email: 'kumara@coach.com',
      image: require('../../../assets/BrowseCoachImages/cricketCoach2.jpg'),
    },
    {
      id: 3,
      name: 'Alex Perera',
      location: 'Galle',
      sport: 'Badminton',
      phone: '+94 70 234 9987',
      email: 'Perera@coach.com',
      image: require('../../../assets/BrowseCoachImages/badmintonCoach1.jpg'),
    },
    {
      id: 4,
      name: 'Brewon Dias',
      location: 'Matara',
      sport: 'Badminton',
      phone: '+94 77 345 6789',
      email: 'Dias@coach.com',
      image: require('../../../assets/BrowseCoachImages/badmintonCoach2.jpg'),
    },
    {
      id: 5,
      name: 'Abdul Rahman',
      location: 'Piliyandala',
      sport: 'Cricket',
      phone: '+94 70 111 2222',
      email: 'abdul@coach.com',
      image: require('../../../assets/BrowseCoachImages/cricketCoach3.jpg'),
    },
    {
      id: 6,
      name: 'David Fernando',
      location: 'Colombo',
      sport: 'Badminton',
      phone: '+94 70 333 4444',
      email: 'david@coach.com',
      image: require('../../../assets/BrowseCoachImages/badmintonCoach3.jpg'),
    },
    
    
  ];

  const visibleCoaches = coaches.filter(coach => coach.sport === selectedSport);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="px-4 py-4 pt-6">
          <Text className="font-bebas text-4xl font-bold text-black">
            COACH GIGS
          </Text>

          <View className="mt-4">
            <SportTabs value={selectedSport} onSportChange={setSelectedSport} />
          </View>

          <View className="mt-4 flex-row flex-wrap justify-between">
            {visibleCoaches.map(coach => (
                <View key={coach.id} className="w-[48%] mb-4">
              <CoachCard
                name={coach.name}
                location={coach.location}
                image={coach.image}
                onContactPress={() => setSelectedCoach(coach)}
              />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <CoachContactModal visible={!!selectedCoach} coach={selectedCoach} onClose={() => setSelectedCoach(null)}/>

    </SafeAreaView>
  );
};

export default Index;
