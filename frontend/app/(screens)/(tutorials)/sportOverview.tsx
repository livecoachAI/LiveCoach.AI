import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

type SportType = 'cricket' | 'badminton';

const SportOverview = () => {
  const navigation = useNavigation<any>();
  const [activeSport, setActiveSport] = useState<SportType>('cricket');

  const content = {
    cricket: {
      title: "CRICKET",
      text1: "Originating in the 16th-century Weald of south-east England, cricket evolved into a strategic duel between two teams of eleven.",
      text2: "Far beyond hitting a ball, it requires psychological warfare, complex field placements, and pitch analysis.\nThe sport spans from traditional 5-day Test matches to the explosive, high-scoring intensity of modern T20s.",
      image: require('../../../assets/overview/cricketOverview.png'), 
    },
    badminton: {
      title: "BADMINTON",
      text1: "Originating from the ancient game of 'Battledore and Shuttlecock' and formalized in 19th-century British India.",
      text2: "Badminton is a high-octane duel of agility.\nIt is the world's fastest racket sport, requiring explosive power, deceptive net play, and lightning-fast reflexes.\nWhether in Singles or Doubles, the game is a masterclass in tactical geometry and aerobic endurance.",
      image: require('../../../assets/overview/badmintonOverview.png'), 
    }
  };

  const goToTutorial = () => {
    navigation.navigate('(tutorials)/viewVideo', {
      defaultTab: activeSport,
    });
  };

  return (
      <View className="flex-1 relative">
        
        {/* Header */}
        <View className="flex-row items-center gap-4 px-6 mb-8 pt-6">
          <Pressable onPress={() => setActiveSport('cricket')}>
            <Text 
              className={`font-bebas text-4xl tracking-tight ${activeSport === 'cricket' ? 'text-black' : 'text-neutral-300'}`}
            >
              CRICKET
            </Text>
          </Pressable>

          <Pressable onPress={() => setActiveSport('badminton')}>
            <Text 
              className={`font-bebas text-4xl tracking-tight ${activeSport === 'badminton' ? 'text-black' : 'text-neutral-300'}`}
            >
              BADMINTON
            </Text>
          </Pressable>
        </View>

        {/* --- Text Content --- */}
        <View className="px-6 z-10 pt-6">
          <Text className="text-primary-dark font-manrope text-center font-semibold leading-7 mb-6 text-xl">
            {content[activeSport].text1}
          </Text>

          <Text className="text-black font-manrope text-lg text-center leading-7 opacity-80">
            {content[activeSport].text2}
          </Text>
        </View>

        {/* --- Bottom Image Section --- */}
        <View className="absolute bottom-0 w-full h-[60%] justify-end items-center -z-10">
          <Image
            source={content[activeSport].image}
            className="w-full h-full"
            resizeMode="cover"
            style={{ opacity: 0.9 }} 
          />
          <View className="absolute top-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        </View>

        {/* --- Tutorial Link --- */}
        <View className="absolute bottom-24 right-8 z-20">
          <Pressable 
            onPress={goToTutorial}
            className="flex-row items-center gap-1"
          >
            <Text className="font-bebas text-4xl text-neutral-800 pt-1">
              TUTORIAL
            </Text>
            <View className="flex-row">
              <Entypo name="chevron-right" size={40} color="black" style={{ marginRight:-25}} />
              <Entypo name="chevron-right" size={40} color="black" />
            </View>
          </Pressable>
        </View>

      </View>
  );
};

export default SportOverview;