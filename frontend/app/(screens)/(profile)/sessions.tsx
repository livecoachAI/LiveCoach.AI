import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { ChevronLeft, ChevronRight, ClipboardList, Plus } from 'lucide-react-native';

interface SessionsScreenProps {
  onBackPress: () => void;
}

const SessionsScreen: React.FC<SessionsScreenProps> = ({ onBackPress }) => {
  const sessions = [
    { id: '1', title: 'SESSION 1' },
    { id: '2', title: 'SESSION 2' },
    { id: '3', title: 'SESSION 3' },
    { id: '4', title: 'SESSION 4' },
    { id: '5', title: 'SESSION 5' },
  ];

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="flex-row items-center px-4 py-5 border-b border-gray-100">
        <TouchableOpacity onPress={onBackPress} className="p-2" activeOpacity={0.7}>
          <ChevronLeft size={32} color="black" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="ml-2 text-2xl font-abeezee text-black">
          SESSIONS
        </Text>
      </View>

      {/* Sessions List */}
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="flex-row items-center justify-between px-6 py-7 bg-white"
            activeOpacity={0.6}
          >
            <View className="flex-row items-center">
              <View className="mr-5">
                <ClipboardList size={40} color="black" strokeWidth={1.2} />
              </View>
              <Text className="text-lg font-abeezee  text-black">
                {item.title}
              </Text>
            </View>
            <ChevronRight size={24} color="black" strokeWidth={1.5} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-100 mx-4" />}
        contentContainerStyle={{ paddingBottom: 100 }} // Extra space so button doesn't hide last item
      />

      {/* --- FLOATING PLUS BUTTON --- */}
      <View className="absolute bottom-10 left-0 right-0 items-center">
        <TouchableOpacity 
          className="bg-[yellow] w-16 h-16 rounded-full items-center justify-center shadow-lg shadow-black/15"
          activeOpacity={0.8}
          onPress={() => console.log("Add new session")}
        >
          <Plus size={32} color="black" strokeWidth={3} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SessionsScreen;