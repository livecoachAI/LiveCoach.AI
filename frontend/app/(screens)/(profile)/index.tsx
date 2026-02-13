import React, { useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router'; // Add this import
import ProfileAthlete from './profile';
import SessionsScreen from './sessions';

const Index = () => {
  const [view, setView] = useState<'profile' | 'sessions'>('profile');
  const navigation = useNavigation(); // Initialize navigation

  useLayoutEffect(() => {
  navigation.setOptions({
    tabBarStyle: [
      {
        height: 65,
        paddingBottom: 10,
        paddingTop: 10,
      },
      {
        display: view === "sessions" ? "none" : "flex",
      },
    ],
  });
}, [navigation, view]);

  const athleteData = {
    role: 'Athlete' as const,
    name: 'JOHN DOE'
  };

  return (
    <SafeAreaView 
      className="flex-1 bg-white" 
      edges={view === 'sessions' ? ['top'] : ['bottom']}
    >
      <View className="flex-1">
        {view === 'profile' ? (
          <ProfileAthlete 
            data={athleteData} 
            onPressSessions={() => setView('sessions')} 
          />
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