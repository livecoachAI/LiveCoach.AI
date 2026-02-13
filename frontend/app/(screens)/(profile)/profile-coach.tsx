import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

export interface Player {
  id: string;
  name: string;
}

export interface CoachData {
  name: string;
  role: 'Coach';
  isVerified: boolean;
  players: Player[];
}

interface ProfileCoachProps {
  data: CoachData;
  onPressPlayer: () => void; 
}

const ProfileCoach = ({ data, onPressPlayer }: ProfileCoachProps) => {
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} className="flex-1 bg-white">
      {/* Header Section */}
      <View className="h-[400px] w-full relative">
        <Image 
          source={require("../../../assets/BrowseCoachImages/cricketCoach3.jpg")} 
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 left-0 right-0 bg-black/40 p-6">
          <Text className="text-white text-xs font-bold uppercase tracking-widest opacity-80">
            {data.role}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-white text-5xl font-bebas uppercase tracking-tighter">
              {data.name}
            </Text>
            {data.isVerified && (
              <MaterialIcons name="verified" size={24} color="white" style={{ marginLeft: 8 }} />
            )}
          </View>
        </View>
      </View>

      {/* Coach Content: Players List */}
      <View className="px-8 py-4 bg-neutral-100 border-b border-neutral-100">
        <Text className="font-bebas text-3xl text-black">PLAYERS</Text>
      </View>
      <View className='px-4'>
        {data.players.map((player) => (
          <Pressable 
            key={player.id} 
            onPress={onPressPlayer}
            className="px-4 py-5 border-b border-neutral-100 flex-row justify-between items-center active:opacity-50"
          >
            <View className="flex-1">
              <Text className="text-xl font-manrope text-black uppercase">{player.name}</Text>
            </View>
            <Entypo name="chevron-right" size={20} color="#ADABAB" />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};


export default ProfileCoach;