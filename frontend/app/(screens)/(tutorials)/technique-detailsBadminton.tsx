import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Data structured 
const BADMINTON_DATA: Record<string, any> = {

};

const BadmintonDetail = ({ techniqueName, onBack }: any) => {
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
      {/* labels */}
      <Text className="font-abeezee text-2xl text-primary-dark mb-1 opacity-90">{label}</Text>
      {/* content */}
      <Text className="font-manrope text-base font-semibold text-neutral-900 leading-6 text-justify">
        {content}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary pt-20">
      {/* Header - Ensures return to the Badminton tab */}
      <View className="py-4 pb-4 px-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Ionicons name="arrow-back" size={28} color="#150000" />
        </TouchableOpacity>
        <Text className="font-bebas text-4xl text-black pt-1">{title}</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 140 }}>
        {/* Difficulty Badge */}
        <View className="flex-row items-center mb-6">
          <Text className="font-bebas text-2xl text-black mr-2">DEGREE OF DIFFICULTY:</Text>
          <View className="bg-accent-yellow px-3 py-1 rounded-md">
            <Text className="font-bold font-manrope text-base">{data.difficulty}</Text>
          </View>
        </View>

        {/* Content Sections */}
        <DetailSection label="DESCRIPTION" content={data.description} />
        <DetailSection label="RISKS" content={data.risks} />
        <DetailSection label="WHEN TO USE" content={data.whenToUse} />

        {/* Best Exponents */}
        <View className="my-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <Text className="font-bebas text-xl text-primary-dark my-2">BEST EXPONENTS</Text>
          <Text className="font-manrope text-base text-gray-800 italic">
            {data.exponents}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BadmintonDetail;