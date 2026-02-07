import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react-native';

// 1. Define the Item Component here (Local to this file)
const SessionItem = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-row items-center justify-between px-6 py-7 bg-white"
    activeOpacity={0.6}
  >
    <View className="flex-row items-center">
      <View className="mr-5">
        <ClipboardList size={40} color="black" strokeWidth={1.2} />
      </View>
      <Text className="text-lg font-bold tracking-widest text-black">
        {title}
      </Text>
    </View>
    <ChevronRight size={24} color="black" strokeWidth={1.5} />
  </TouchableOpacity>
);

// 2. The Main Screen
const SessionsScreen = () => {
  const sessions = [
    { id: '1', title: 'SESSION 1' },
    { id: '2', title: 'SESSION 2' },
    { id: '3', title: 'SESSION 3' },
    { id: '4', title: 'SESSION 4' },
    { id: '5', title: 'SESSION 5' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="flex-row items-center px-4 py-5 border-b border-gray-100">
        <TouchableOpacity className="p-2">
          <ChevronLeft size={32} color="black" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="ml-2 text-2xl font-black tracking-tighter text-black">
          SESSIONS
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SessionItem 
            title={item.title} 
            onPress={() => console.log(`Selected ${item.title}`)} 
          />
        )}
        ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-100 mx-4" />}
      />
    </SafeAreaView>
  );
};

export default SessionsScreen;