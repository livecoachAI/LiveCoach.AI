import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, Modal, TextInput } from 'react-native';
import { ChevronLeft, ChevronRight, ClipboardList, Plus } from 'lucide-react-native';
import AddNoteScreen from './add-note'; 

interface SessionsScreenProps {
  onBackPress: () => void;
}

const SessionsScreen: React.FC<SessionsScreenProps> = ({ onBackPress }) => {
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newSessionName, setNewSessionName] = useState("");
  const [selectedSession, setSelectedSession] = useState<string>("");

  const [sessions, setSessions] = useState([
    { id: '1', title: 'SESSION 1' },
    { id: '2', title: 'SESSION 2' },
    { id: '3', title: 'SESSION 3' },
    { id: '4', title: 'SESSION 4' },
    { id: '5', title: 'SESSION 5' },


  ]);

  const handleAddNewSession = () => {
    if (newSessionName.trim().length > 0) {
      const newEntry = {
        id: Math.random().toString(),
        title: newSessionName.toUpperCase(),
      };
      setSessions([...sessions, newEntry]);
      setNewSessionName("");
      setIsAddModalVisible(false);
      
      // Automatically open the note for the brand new session
      setSelectedSession(newEntry.title);
      setIsNoteVisible(true);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="flex-row items-center px-4 py-5 border-b border-gray-100">
        <TouchableOpacity onPress={onBackPress} className="p-2">
          <ChevronLeft size={32} color="black" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="ml-2 text-2xl font-black tracking-tighter text-black">SESSIONS</Text>
      </View>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="flex-row items-center justify-between px-6 py-7 bg-white"
            onPress={() => {
              setSelectedSession(item.title);
              setIsNoteVisible(true);
            }}
          >
            <View className="flex-row items-center">
              <ClipboardList size={40} color="black" strokeWidth={1.2} className="mr-5" />
              <Text className="text-lg font-bold tracking-widest text-black">{item.title}</Text>
            </View>
            <ChevronRight size={24} color="black" strokeWidth={1.5} />
          </TouchableOpacity>
        )}
      />

      {/* Yellow Plus Button */}
      <View className="absolute bottom-10 left-0 right-0 items-center">
        <TouchableOpacity 
          className="bg-yellow-400 w-16 h-16 rounded-full items-center justify-center shadow-lg"
          onPress={() => setIsAddModalVisible(true)}
        >
          <Plus size={32} color="black" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* Modal to Give New Session a Name */}
      <Modal visible={isAddModalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-white w-full rounded-3xl p-6 shadow-2xl">
            <Text className="text-xl font-bold mb-4 text-center">NAME YOUR SESSION</Text>
            
            <View className="border-2 border-yellow-400 rounded-xl px-4 py-3 mb-6">
              <TextInput
                placeholder="ADD NEW SESSION"
                value={newSessionName}
                onChangeText={setNewSessionName}
                className="text-lg font-medium text-black"
                autoFocus
              />
            </View>

            <View className="flex-row space-x-4">
              <TouchableOpacity 
                onPress={() => setIsAddModalVisible(false)}
                className="flex-1 py-4 bg-gray-100 rounded-xl"
              >
                <Text className="text-center font-bold text-gray-500">CANCEL</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleAddNewSession}
                className="flex-1 py-4 bg-yellow-400 rounded-xl"
              >
                <Text className="text-center font-bold text-black">CREATE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Note Modal */}
      <Modal visible={isNoteVisible} animationType="slide" presentationStyle="fullScreen">
        <AddNoteScreen 
          onClose={() => setIsNoteVisible(false)} 
          sessionTitle={selectedSession} 
        />
      </Modal>
    </View>
  );
};

export default SessionsScreen;