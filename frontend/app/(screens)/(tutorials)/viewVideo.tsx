import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams , useRouter} from 'expo-router';

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

//triangles
const styles = StyleSheet.create({
  triangleLeft: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 18,
    borderBottomWidth: 18,
    borderRightWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  triangleRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 18,
    borderBottomWidth: 18,
    borderLeftWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});

//Tab Button 
const TabButton = ({ label, isActive, onPress }: TabButtonProps) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center"
    style={({ pressed }) => [
      {
        transform: [{ scale: pressed ? 0.95 : 1 }],
        opacity: pressed ? 0.9 : 1,
      }
    ]}
  >
    {/* Left Triangle */}
    <View style={styles.triangleLeft}
    className={isActive ? 'border-r-accent-yellow' : 'border-r-white'} />
    
    {/* Center Rectangle */}
    <View 
      className={`h-[36px] px-4 justify-center items-center ${isActive ? 'bg-accent-yellow' : 'bg-white'}`}
    >
      <Text className={`font-manrope uppercase tracking-tighter ${isActive ? 'font-extrabold text-black' : 'font-semibold text-neutral-500'}`}>
        {label}
      </Text>
    </View>
    
    {/* Right Triangle */}
    <View style={styles.triangleRight}
    className={isActive ? 'border-l-accent-yellow' : 'border-l-white'} />
  </Pressable>
);

const ViewVideo = () => {
  const router = useRouter();
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
      <View className="bg-neutral-50 pt-10 pb-4 px-4">
       <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.push({
                pathname: '/',
                params: { returnToSport: currentStep }
              })} 
              className="p-1 -ml-2"
            >
              <Ionicons name="chevron-back" size={40} color="black" />
            </TouchableOpacity>
            <Text className="font-bebas text-4xl text-black pt-1">TUTORIALS</Text>
          </View>

          <TouchableOpacity onPress={toggleSearch} className="px-2 mb-4 shadow-sm">
            <Ionicons 
              name={isSearching ? "close" : "search"} 
              size={25} 
              color="1500000" 
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

        <View className="flex-row gap-2 mb-4">
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