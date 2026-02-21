import React, { useState } from 'react';
import { View, Text, Pressable, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';


type SportType = 'cricket' | 'badminton';

const SportOverview = ({ onNavigate }: any) => {
const [activeSport, setActiveSport] = useState<SportType>('cricket');

  const content = {
    cricket: {
      title: "CRICKET",
      text1: "Originating in the 16th-century Weald of south-east England, cricket evolved into a strategic duel between two teams of eleven.",
      text2: "Far beyond hitting a ball,\nit requires psychological warfare, complex field placements, and pitch analysis.\nThe sport spans from traditional 5-day Test matches to the explosive, high-scoring intensity of modern T20s.",
      image: require('../../../assets/overview/cricketOverview.png'), 
    },
    badminton: {
      title: "BADMINTON",
      text1: "Originating from the ancient game of 'Battledore and Shuttlecock' and formalized in 19th-century British India.",
      text2: "Badminton is a high-octane duel of agility. It is the world's fastest racket sport, requiring explosive power, deceptive net play, and lightning-fast reflexes.\nWhether in Singles or Doubles, the game is a masterclass in tactical geometry and aerobic endurance.",
      image: require('../../../assets/overview/badmintonOverview.png'), 
    }
  };

const goToTutorial = () => {
    //tell the parent to switch
    onNavigate(activeSport);
  };

  return (
      <View className="flex-1 pt-16">
        {/* Header */}
        <View className="flex-row items-center gap-4 px-6 mb-8 pt-6 bg-primary">
          <Pressable onPress={() => setActiveSport('cricket')}>
            <Text 
              className={`font-bebas text-4xl tracking-tight ${activeSport === 'cricket' ? 'text-primary-dark' : 'text-neutral-300'}`}
            >
              CRICKET
            </Text>
          </Pressable>

          <Pressable onPress={() => setActiveSport('badminton')}>
            <Text 
              className={`font-bebas text-4xl tracking-tight ${activeSport === 'badminton' ? 'text-primary-dark' : 'text-neutral-300'}`}
            >
              BADMINTON
            </Text>
          </Pressable>
        </View>

        {/* --- Text Content --- */}
        <View className="z-10 pt-6">
          <Text className="text-primary-dark font-manrope text-center font-bold leading-7 mb-8 text-xl px-8">
            {content[activeSport].text1}
          </Text>

          <Text className="text-neutral-900 font-abeezee text-xl text-center leading-8 px-6">
            {content[activeSport].text2}
          </Text>
        </View>

        {/* -- BACKGROUND IMAGE --- */}
      <View style={{ 
          position: 'absolute', 
          bottom: 0,  
          left: 0, 
          right: 0, 
          height: '80%'
        }} className="-z-10 items-center justify-end">
        <Image
          source={content[activeSport].image}
          style={{
            width: '100%', 
            height: '100%',
            opacity: 0.8,
          }}
        />
      </View>

        {/* --- Tutorial Link --- */}
        <View className="absolute bottom-40 right-8 z-20">
          <Pressable 
            onPress={goToTutorial}
            className="flex-row items-center gap-1"
          >
            <Text className="font-bebas text-5xl text-neutral-900 pt-3">
              TUTORIAL
            </Text>
            <View className="flex-row">
              <Entypo name="chevron-right" size={60} color="#322D2D" style={{ marginRight:-40, marginLeft:-20}} />
              <Entypo name="chevron-right" size={60} color="#322D2D" />
            </View>
          </Pressable>
        </View>

      </View>
  );
};

export default SportOverview;