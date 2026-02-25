import React, { useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from 'expo-router';


//file imports
import ViewVideo from './viewVideo';
import CricketDetail from './technique-detailsCricket';
import BadmintonDetail from './technique-detailsBadminton';
import FundamentalsDetail from './fundamentals';
import SportOverview from './sportOverview'; 

const Index = () => {
  const navigation = useNavigation();

  const [activeSport, setActiveSport] = useState<'cricket' | 'badminton'>('cricket');
  const [currentView, setCurrentView] = useState<'OVERVIEW' | 'LIST' | 'DETAIL' | 'FUNDAMENTALS'>('OVERVIEW');
  const [selectedTechnique, setSelectedTechnique] = useState('');

  //Layouteffect for prevent navbar from flickering (runs before screen is printed)
  useLayoutEffect(() => {
    //safety messure
    if (navigation && typeof navigation.setParams === 'function') {
      navigation.setOptions({
        tabBarVisible: currentView === 'OVERVIEW',
      } as any);
    }
  }, [currentView, navigation]);

  //go from Overview to Tutorial List
  const handleStartTutorial = (sport: 'cricket' | 'badminton') => {
    setActiveSport(sport);
    setCurrentView('LIST');
  };

  //go to Fundamentals
  const handleSelectFundamentals = (sport: 'cricket' | 'badminton') => {
    setActiveSport(sport);
    setCurrentView('FUNDAMENTALS');
  };

  //go to Shot Details
  const handleSelectShot = (technique: string) => {
    setSelectedTechnique(technique);
    setCurrentView('DETAIL');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 1. STARTING SCREEN */}
      {currentView === 'OVERVIEW' && (
        <SportOverview onNavigate={handleStartTutorial} />
      )}

      {/* 2. THE SEARCHABLE LIST */}
      {currentView === 'LIST' && (
        <ViewVideo 
          activeSport={activeSport}
          setSport={setActiveSport}
          onBack={() => setCurrentView('OVERVIEW')}
          onSelect={handleSelectShot}
          onSelectFundamentals={handleSelectFundamentals}
        />
      )}

      {/* 3. SHOT DETAILS (Difficulty, Risks, Video, etc.) */}
      {currentView === 'DETAIL' && (
        activeSport === 'cricket' ? (
          <CricketDetail 
            techniqueName={selectedTechnique} 
            onBack={() => setCurrentView('LIST')} 
          />
        ) : (
          <BadmintonDetail 
            techniqueName={selectedTechnique} 
            onBack={() => setCurrentView('LIST')} 
          />
        )
      )}

      {/* 4. FUNDAMENTALS (Clean Layout, No Difficulty/Risks) */}
      {currentView === 'FUNDAMENTALS' && (
        <FundamentalsDetail 
          sport={activeSport} 
          onBack={() => setCurrentView('LIST')} 
        />
      )}
    </View>
  );
};

export default Index;