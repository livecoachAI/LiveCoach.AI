import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// TabButton remains the same...
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
    <View className={`h-[35px] px-2 justify-center items-center ${isActive ? 'bg-accent-yellow' : 'bg-white'}`}>
      <Text className="font-manrope font-semibold text-primary-dark">{label}</Text>
    </View>
    <View className={`w-0 h-0 border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent border-l-[12px] ${isActive ? 'border-l-accent-yellow' : 'border-l-white'}`} />
  </Pressable>
);

const ViewVideo = () => {
  const [currentStep, setCurrentStep] = useState('cricket');
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const cricketTutorial = ['FUNDAMENTALS', 'BODY ALIGNMENT', 'COVER DRIVE', 'ON DRIVE', 'CUT', 'LATE CUT', 'SWEEP', 'REVERSE SWEEP', 'HOOK SHOT', 'SCOOP SHOT', 'DOWN THE GROUND'];
  const badmintonTutorial = ['SMASH', 'CLEAR', 'DROP', 'NET SHOT'];

  // base list
  const baseTechniques = currentStep === 'cricket' ? cricketTutorial : badmintonTutorial;

  // Filtering the list
  const filteredTechniques = baseTechniques.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    setSearchText(''); // Clear search text when closing search
  };

  return (
    <View className="flex-1 bg-white">
      <View className="bg-neutral-50 pt-6 pb-2 px-4 -mx-4 ">

        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          {!isSearching ? (
            <>
              <Text className="font-bebas text-4xl font-bold text-primary-dark px-4">
                TUTORIALS
              </Text>
              <TouchableOpacity onPress={() => setIsSearching(true)} className="p-2">
                <Ionicons name="search" size={28} color="#150000" />
              </TouchableOpacity>
            </>
          ) : (
            <View className="flex-1 flex-row items-center bg-white border border-neutral-200 rounded-full px-4 h-10">
              <Ionicons name="search" size={20} color="#ADABAB" />
              <TextInput
                autoFocus
                placeholder="Search techniques..."
                value={searchText}
                onChangeText={setSearchText}
                className="flex-1 ml-2 font-manrope text-primary-dark"
              />
              <TouchableOpacity onPress={toggleSearch}>
                <Ionicons name="close-circle" size={20} color="#ADABAB" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Tabs */}
        <View className="flex-row gap-3 px-2 pb-4">
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

      {/* List */}
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