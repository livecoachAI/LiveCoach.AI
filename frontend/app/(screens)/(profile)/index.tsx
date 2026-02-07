import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Note: If you move these to a components folder, update the paths below
import ProfileAthlete from './profile'; 
import ProfileCoach from './profile-coach';
import SessionsScreen from './sessions'

const Index = () => {

  /* DEMO COACH Coach */
  const coachData = {
    role: 'Coach' as const,
    name: 'BENNY FILLER',
    isVerified: true,
    players: [
      { id: '1', name: 'PLAYER 1' },
      { id: '2', name: 'PLAYER 2' },
      { id: '3', name: 'PLAYER 3' },
      { id: '4', name: 'PLAYER 4' }
    ]
  };

  /* DEMO Athlete Data*/
  const athleteData = {
    role: 'Athlete' as const,
    name: 'JOHN DOE'
  };



  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1">
        {/* Coach */}
        {/* <ProfileCoach data={coachData} /> */}
        
        <SessionsScreen/>
        
        {/* Athelete */}
        {/* <ProfileAthlete data={athleteData} /> */}
      </View>
    </SafeAreaView>
  );
};

export default Index;