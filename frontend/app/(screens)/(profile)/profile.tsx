import React from 'react'
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
//import { ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. Define the interface for your data (The "Blueprint")
interface AthleteData {
  name?: string;
  role?: string;
  profileImage?: string;
  sections?: { title: string }[];
}

// 2. Assign the type to your props
const Profile = ({ athleteData = {} }: { athleteData?: AthleteData }) => {
  
  // 3. Destructure with default values
  const { 
    name = "JOHN DOE", 
    role = "Athlete", 
    profileImage = "https://images.unsplash.com/photo-1531415074968-036ba1b575da", 
    sections = [{ title: "SESSIONS" }, { title: "PROGRESS CHART" }] 
  } = athleteData;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView bounces={false}>
        {/* Header Section */}
        <View className="h-[400px] w-full relative">
          <Image
            source={{ uri: profileImage }}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/30" />
          
          <View className="absolute bottom-10 left-6">
            <Text className="text-white text-lg font-medium opacity-90 capitalize">
              {role}
            </Text>
            <Text className="text-white text-5xl font-bold uppercase tracking-tight">
              {name}
            </Text>
          </View>
        </View>

        {/* List Sections */}
        <View className="mt-2">
          {sections.map((item, index) => (
            <Pressable
              key={index}
              className="flex-row items-center justify-between px-6 py-6 border-b border-gray-100 active:bg-gray-50"
            >
              <Text className="text-lg font-semibold text-gray-900 uppercase tracking-wide">
                {item.title}
              </Text>
              {/* <ChevronRight size={24} color="#000" strokeWidth={1.5} /> */}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Dummy data for your App entry point
const dummyAthlete: AthleteData = {
  name: "JOHN DOE",
  role: "Athlete",
  profileImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067",
  sections: [
    { title: "SESSIONS" },
    { title: "PROGRESS CHART" }
  ]
};

export default Profile;