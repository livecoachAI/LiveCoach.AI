import { View, Text, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SportTabs from './SportTabs';
import CoachCard from './CoachCard';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


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

    // ← NEW: Modal state
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  const coaches: Coach[] = [
    {
      id: 1,
      name: 'John haden',
      location: 'Colombo',
      sport: 'Cricket',
      phone: '+94 77 123 4567',  // ← Add dummy data
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
      phone: '+94 71 234 5678',
      email: 'kumara@coach.com',
      image: require('../../../assets/BrowseCoachImages/badmintonCoach1.jpg'),
    },
    {
      id: 4,
      name: 'Brewon Dias',
      location: 'Colombo',
      sport: 'Badminton',
      phone: '+94 77 345 6789',
      email: 'alex@coach.com',
      image: require('../../../assets/BrowseCoachImages/badmintonCoach2.jpg'),
    },
    {
      id: 5,
      name: 'Kumar Silva',
      location: 'Kandy',
      sport: 'Cricket',
      phone: '+94 70 111 2222',
      email: 'kumar@coach.com',
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

  const visibleCoaches = coaches.filter(c => c.sport === selectedSport,);

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

    {/* ← NEW: Contact Modal */}
      <Modal
        visible={!!selectedCoach}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedCoach(null)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            {/* Coach Image & Name */}
            <Image
              source={selectedCoach?.image}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <Text className="text-2xl font-bold text-center text-black mb-2">
              {selectedCoach?.name}
            </Text>
            <Text className="text-center text-gray-500 mb-6">
              {selectedCoach?.location}
            </Text>

            {/* Contact Info */}
            <View className="space-y-4">
              <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-2xl">
                <View className="w-12 h-12 bg-blue-100 rounded-full justify-center items-center mr-4">
                  <Ionicons name="call-outline" size={22} color="#1f2937" />
                </View>
                <View>
                  <Text className="font-semibold text-black">Phone</Text>
                  <Text className="text-gray-600">{selectedCoach?.phone ?? 'No phone added'}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-2xl">
                <View className="w-12 h-12 bg-purple-100 rounded-full justify-center items-center mr-4">
                  <MaterialIcons name="email" size={22} color="#1f2937" />
                </View>
                <View>
                  <Text className="font-semibold text-black">Email</Text>
                  <Text className="text-gray-600">{selectedCoach?.email ?? 'No email added'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              className="mt-6 bg-accent-yellow py-4 rounded-2xl"
              onPress={() => setSelectedCoach(null)}
            >
              <Text className="text-center font-bold text-black text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
};

export default Index;
