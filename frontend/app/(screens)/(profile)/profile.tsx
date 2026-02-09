import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export interface AthleteData {
  name: string;
  role: 'Athlete';
}

// Ensure the interface includes the onPressSessions function
interface ProfileAthleteProps {
  data: AthleteData;
  onPressSessions: () => void; 
}

const ProfileAthlete = ({ data, onPressSessions }: ProfileAthleteProps) => {
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
          <Text className="text-white text-5xl font-bebas uppercase tracking-tighter">
            {data.name}
          </Text>
        </View>
      </View>

      <View className="mt-1 px-4">
        {/* CRITICAL: Ensure onPress={onPressSessions} is present here */}
        <Pressable 
          onPress={onPressSessions} 
          className="px-4 py-6 border-b border-neutral-100 flex-row justify-between items-center active:opacity-50"
        >
          <Text className="text-xl font-manrope text-black uppercase">SESSIONS</Text>
          <Entypo name="chevron-right" size={20} color="#ADABAB" />
        </Pressable>
        
        <Pressable className="px-4 py-6 border-b border-neutral-100 flex-row justify-between items-center active:opacity-50">
          <Text className="text-xl font-manrope text-black uppercase">PROGRESS CHART</Text>
          <Entypo name="chevron-right" size={20} color="#ADABAB" />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileAthlete;