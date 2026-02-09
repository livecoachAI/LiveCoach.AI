import React, { useState } from 'react'; // Import useState
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileAthlete from './profile';
import SessionsScreen from './sessions';

const Index = () => {
  // Use state to track which "view" to show
  const [currentView, setCurrentView] = useState<'profile' | 'sessions'>('profile');

  const athleteData = {
    role: 'Athlete' as const,
    name: 'JOHN DOE'
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1">
        {currentView === 'profile' ? (
          <ProfileAthlete 
            data={athleteData} 
            onPressSessions={() => setCurrentView('sessions')} // Switch to sessions
          />
        ) : (
          <SessionsScreen 
            onBackPress={() => setCurrentView('profile')} // Switch back to profile
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Index;