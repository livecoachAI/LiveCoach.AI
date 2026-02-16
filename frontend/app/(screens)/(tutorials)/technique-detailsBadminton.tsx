import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Data structured exactly like your Cricket data
const BADMINTON_DATA: Record<string, any> = {

};

const BadmintonDetail = () => {
  const router = useRouter();
  const { techniqueName } = useLocalSearchParams<{ techniqueName: string }>();
  
  const title = techniqueName?.toUpperCase() || 'UNKNOWN';
  
  // Fallback data if the specific technique isn't in our record yet
  const data = BADMINTON_DATA[title] || { 
    difficulty: 'N/A', 
    description: 'coming soon....',
    risks: 'N/A',
    whenToUse: 'N/A',
    exponents: 'N/A'
  };

  // Reusable component for consistent styling
  const DetailSection = ({ label, content }: { label: string, content: string }) => (
    <View className="mb-6">
      <Text className="font-bebas text-xl text-black mb-1 opacity-90">{label}</Text>
      <Text className="font-manrope text-base text-gray-600 leading-6 text-justify">
        {content}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header - Ensures return to the Badminton tab */}
      <View className="pt-14 pb-4 px-4 bg-neutral-50 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity 
          onPress={() => router.push({ pathname: './viewVideo', params: { defaultTab: 'badminton' } })}
          className="mr-3"
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text className="font-bebas text-3xl text-black pt-1">{title}</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Difficulty Badge */}
        <View className="flex-row items-center mb-6">
          <Text className="font-bebas text-xl text-black mr-2">DEGREE OF DIFFICULTY:</Text>
          <View className="bg-accent-yellow px-3 py-1 rounded-md">
            <Text className="font-bold font-manrope text-sm">{data.difficulty}</Text>
          </View>
        </View>

        {/* Content Sections */}
        <DetailSection label="DESCRIPTION" content={data.description} />
        <DetailSection label="RISKS" content={data.risks} />
        <DetailSection label="WHEN TO USE" content={data.whenToUse} />

        {/* Best Exponents Section */}
        <View className="mb-10 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <Text className="font-bebas text-xl text-black mb-2">BEST EXPONENTS</Text>
          <Text className="font-manrope text-base text-gray-800 italic">
            {data.exponents}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BadmintonDetail;