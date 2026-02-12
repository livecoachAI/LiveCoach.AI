import React, { useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router'; // Add this import
import ProfileAthlete, { AthleteData } from './profile';
import ProfileCoach, { CoachData } from './profile-coach';
import SessionsScreen from './sessions';

export interface Player {
  id: string;
  name: string;
}
export interface UserProfileData {
  role: 'Athlete' | 'Coach';
  name: string;
  isVerified?: boolean;
  players?: Player[];
  sessions?: string[]; 
}

const Index = () => {
  const [view, setView] = useState<'profile' | 'sessions'>('profile');
  const navigation = useNavigation(); // Initialize navigation

  //Athelet sample data
  const athleteData: UserProfileData = {
    role: 'Athlete',
    name: 'JOHN DOE'
  };

  //Coach sample data
  const coachData: UserProfileData = {
    role: 'Coach',
    name: 'JANE DOE',
    isVerified: true,
    players: [
      { id: '1', name: 'PLAYER 1' },
      { id: '2', name: 'PLAYER 2' },
      { id: '3', name: 'PLAYER 3' },
      { id: '4', name: 'PLAYER 4' }
    ]
  };

  //User change (Athlete or Coach)
  const currentUser = coachData; // Change to coachData to test coach view

  // This logic hides the bottom navbar dynamically
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { 
        display: view === 'sessions' ? 'none' : 'flex', // Hide bar if view is sessions
      },
    });
  }, [navigation, view]);


  return (
    <SafeAreaView 
      className="flex-1 bg-white" 
      edges={view === 'sessions' ? ['top'] : ['bottom']}
    >
      <View className="flex-1">
        {view === 'profile' ? (
          //Role Check
          currentUser.role === 'Coach' ? (
            <ProfileCoach 
              data={currentUser as unknown as CoachData} 
              onPressPlayer={() => setView('sessions')}
            />
          ) : (
            <ProfileAthlete 
              data={currentUser as unknown as AthleteData} 
              onPressSessions={() => setView('sessions')} 
            />
          )
        ) : (
          <SessionsScreen 
            onBackPress={() => setView('profile')} 
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Index;