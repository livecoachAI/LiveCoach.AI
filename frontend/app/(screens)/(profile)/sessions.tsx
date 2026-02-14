import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ChevronLeft, ChevronRight, ClipboardList, Plus, RotateCw, Trash2 } from 'lucide-react-native';
import AddNoteScreen from './add-note'; 

interface SessionsScreenProps {
  onBackPress: () => void;
}

const SessionsScreen: React.FC<SessionsScreenProps> = ({ onBackPress }) => {
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isRenameVisible, setIsRenameVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  
  const [selectedSession, setSelectedSession] = useState<{id: string, title: string} | null>(null);
  const [sessionInput, setSessionInput] = useState("");

  const [sessions, setSessions] = useState([
    { id: '1', title: 'SESSION 1' },
    { id: '2', title: 'SESSION 2' },
    { id: '3', title: 'SESSION 3' },
    { id: '4', title: 'SESSION 4' },
    { id: '5', title: 'SESSION 5' },
  ]);

  const handleLongPress = (session: {id: string, title: string}) => {
    setSelectedSession(session);
    setIsOptionsVisible(true);
  };

  const handleDelete = () => {
    if (selectedSession) {
      setSessions(sessions.filter(s => s.id !== selectedSession.id));
      setIsOptionsVisible(false);
    }
  };

  const handleCreateOrRename = () => {
    if (sessionInput.trim()) {
      if (isRenameVisible && selectedSession) {
        setSessions(sessions.map(s => s.id === selectedSession.id ? { ...s, title: sessionInput.toUpperCase() } : s));
      } else {
        const newEntry = { id: Math.random().toString(), title: sessionInput.toUpperCase() };
        setSessions([...sessions, newEntry]);
      }
      setSessionInput("");
      setIsAddModalVisible(false);
      setIsRenameVisible(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="flex-row items-center px-4 py-5 border-b border-neutral-50">
        <TouchableOpacity onPress={onBackPress} className="p-1">
          <ChevronLeft size={32} color="black" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="font-bebas pt-2 text-4xl font-black tracking-tighter text-primary-dark uppercase">Sessions</Text>
      </View>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="flex-row items-center justify-between px-6 py-7 bg-white"
            onPress={() => {
              setSelectedSession(item);
              setIsNoteVisible(true);
            }}
            onLongPress={() => handleLongPress(item)}
            delayLongPress={500}
          >
            <View className="flex-row items-center">
              <ClipboardList size={40} color="black" strokeWidth={1.2} className="mr-5" />
              <Text className="font-abeezee text-lg font-bold tracking-widest text-black">{item.title}</Text>
            </View>
            <ChevronRight size={24} color="black" strokeWidth={1.5} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-100 mx-4" />}
      />

      {/* Yellow Floating Plus Button */}
      <View className="absolute bottom-10 left-0 right-0 items-center">
        <TouchableOpacity 
          className="bg-[#FAFAFA] w-16 h-16 rounded-full items-center justify-center shadow-lg"
          onPress={() => {
            setSessionInput("");
            setIsRenameVisible(false);
            setIsAddModalVisible(true);
          }}
        >
          <Plus size={36} color="black" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* --- RENAME & DELETE OPTIONS MODAL (White Background) --- */}
      <Modal visible={isOptionsVisible} transparent animationType="fade">
        <TouchableOpacity 
          className="flex-1 justify-center items-center bg-black/40 px-8"
          activeOpacity={1}
          onPress={() => setIsOptionsVisible(false)}
        >
          <View className="bg-white w-full rounded-[40px] p-10 items-center shadow-2xl">
            {/* Rename Button */}
            <TouchableOpacity 
              className="bg-[#FFED00] w-full rounded-2xl py-4 flex-row items-center justify-center mb-5"
              onPress={() => {
                setIsOptionsVisible(false);
                setIsRenameVisible(true);
                setSessionInput(selectedSession?.title || "");
                setIsAddModalVisible(true);
              }}
            >
              <Text className="text-xl font-black mr-3 italic">RENAME</Text>
              <RotateCw size={24} color="black" strokeWidth={2.5} />
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity 
              className="bg-[#FFED00] w-full rounded-2xl py-4 flex-row items-center justify-center"
              onPress={handleDelete}
            >
              <Text className="text-xl font-black mr-3 italic">DELETE SESSION</Text>
              <Trash2 size={24} color="black" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- NAME YOUR SESSION MODAL --- */}
      <Modal visible={isAddModalVisible} transparent animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
          <TouchableOpacity 
            className="flex-1 justify-center items-center bg-black/40 px-6"
            activeOpacity={1}
            onPress={() => setIsAddModalVisible(false)}
          >
            <View className="bg-white w-full rounded-[35px] p-8 shadow-2xl items-center">
              <Text className="text-2xl font-black mb-6 text-black italic">NAME YOUR SESSION</Text>
              
              <View className="border-2 border-[#FFED00] rounded-2xl w-full px-4 py-4 mb-8">
                <TextInput
                  placeholder="ADD NEW SESSION"
                  placeholderTextColor="#D1D5DB"
                  value={sessionInput}
                  onChangeText={setSessionInput}
                  className="text-lg font-bold text-center text-black"
                  autoFocus
                />
              </View>

              <View className="flex-row w-full space-x-4">
                <TouchableOpacity 
                  onPress={() => setIsAddModalVisible(false)}
                  className="flex-1 py-4 bg-gray-100 rounded-2xl"
                >
                  <Text className="text-center font-black text-gray-400 italic">CANCEL</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={handleCreateOrRename}
                  className="flex-1 py-4 bg-[#FFED00] rounded-2xl"
                >
                  <Text className="text-center font-black text-black italic">
                    {isRenameVisible ? "SAVE" : "CREATE"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>

      {/* Note Screen Modal */}
      <Modal visible={isNoteVisible} animationType="slide" presentationStyle="fullScreen">
        <AddNoteScreen 
          onClose={() => setIsNoteVisible(false)} 
          sessionTitle={selectedSession?.title || ""} 
        />
      </Modal>
    </View>
  );
};

export default SessionsScreen;