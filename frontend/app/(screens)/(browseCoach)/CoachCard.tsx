import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

type CoachCardProps = {
  name: string;
  location: string;
  image: any; 
};

const CoachCard = ({ name, location, image }: CoachCardProps) => {
  return (
    <View className="bg-white rounded-lg mb-2 mt-8">
        <Image
          source={image}
          className="w-full h-32 rounded-lg bg-gray-200"
          resizeMode="contain"
        />
  
      <View className="mt-3 flex-row items-center">  
        <View className="flex-1">
          <Text className="font-manrope text-base font-bold text-black">
            {name}
          </Text>
          <Text className="font-manrope text-sm text-gray-500 mt-1">
            {location}
          </Text>
        </View>

      <Pressable className="bg-[#E6F20D] px-4 py-2 rounded-md ml-3">
          <Text className="font-manrope text-sm font-semibold text-black">
            Contact
          </Text>
      </Pressable>
      </View>
    </View>

  );
};

export default CoachCard;
