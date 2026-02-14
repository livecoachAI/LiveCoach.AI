import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const TabButton = ({ label, isActive, onPress }: TabButtonProps) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center"
    style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
  >
    <View className={`w-0 h-0 border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent border-r-[12px] ${isActive ? 'border-r-accent-yellow' : 'border-r-white'}`} />
    <View className={`h-[36px] px-2 justify-center items-center ${isActive ? 'bg-accent-yellow' : 'bg-white'}`}>
      <Text className="font-manrope font-semibold text-primary-dark uppercase">{label}</Text>
    </View>
    <View className={`w-0 h-0 border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent border-l-[12px] ${isActive ? 'border-l-accent-yellow' : 'border-l-white'}`} />
  </Pressable>
);

const ViewVideo = () => {
  //Get params using Expo Router hook
  const params = useLocalSearchParams<{ defaultTab?: 'cricket' | 'badminton' }>();
  
  // Initialize state
  const [currentStep, setCurrentStep] = useState<'cricket' | 'badminton'>('cricket');
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  //Sync state when navigation parameters change
  useEffect(() => {
    if (params.defaultTab) {
      setCurrentStep(params.defaultTab);
    }
  }, [params.defaultTab]);

  const cricketTutorial = ['FUNDAMENTALS', 'COVER DRIVE', 'ON DRIVE', 'CUT SHOT', 'LATE CUT', 'SWEEP', 'REVERSE SWEEP', 'HOOK SHOT', 'SCOOP SHOT', 'DOWN THE GROUND'];
  const badmintonTutorial = ['SMASH', 'CLEAR', 'DROP', 'NET SHOT'];

  const baseTechniques = currentStep === 'cricket' ? cricketTutorial : badmintonTutorial;

  const filteredTechniques = baseTechniques.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (isSearching) setSearchText(''); 
  };

  return (
    <View className="flex-1 bg-white pt-8">
      <View className="bg-neutral-50 pt-8 pb-4 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="font-bebas text-4xl font-bold text-primary-dark">
            TUTORIALS
          </Text>
          <TouchableOpacity onPress={toggleSearch} className="p-1">
            <Ionicons 
              name={isSearching ? "close" : "search"} 
              size={28} 
              color="#150000" 
            />
          </TouchableOpacity>
        </View>

        {isSearching && (
          <View className="mb-4 flex-row items-center bg-white border border-neutral-200 rounded-full px-4 h-10">
            <Ionicons name="search" size={20} color="#ADABAB" />
            <TextInput
              autoFocus
              placeholder="Search shots..."
              placeholderTextColor="#ADABAB" 
              value={searchText}
              onChangeText={setSearchText}
              className="flex-1 ml-2 font-manrope text-primary-dark"
            />
          </View>
        )}

        <View className="flex-row gap-4">
          <TabButton 
            label="Cricket" 
            isActive={currentStep === 'cricket'}
            onPress={() => { setCurrentStep('cricket'); setSearchText(''); }}
          />
          <TabButton 
            label="Badminton" 
            isActive={currentStep === 'badminton'}
            onPress={() => { setCurrentStep('badminton'); setSearchText(''); }}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        {filteredTechniques.length > 0 ? (
          filteredTechniques.map((technique, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center justify-between py-5 border-b border-neutral-100"
            >
              <Text className="text-base font-manrope font-medium text-primary-dark">
                {technique}
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#ADABAB" />
            </TouchableOpacity>
          ))
        ) : (
          <View className="mt-20 items-center">
            <Text className="font-manrope text-neutral-400">No techniques found...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewVideo;