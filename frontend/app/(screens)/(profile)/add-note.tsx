import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SafeAreaView, 
  KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { ChevronLeft, Share2, MoreHorizontal } from 'lucide-react-native';

interface AddNoteProps {
  onClose: () => void;
  sessionTitle: string;
}

const AddNoteScreen: React.FC<AddNoteProps> = ({ onClose, sessionTitle }) => {
  const [note, setNote] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-50">
          <TouchableOpacity onPress={onClose} className="flex-row items-center">
            <ChevronLeft size={30} color="#EAB308" strokeWidth={2.5} />
            <Text className="text-[#EAB308] text-lg font-medium">Notes</Text>
          </TouchableOpacity>

          <View className="flex-row items-center space-x-5">
            <Share2 size={24} color="#EAB308" />
            <View className="border border-[#EAB308] rounded-full p-0.5">
              <MoreHorizontal size={16} color="#EAB308" />
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-[#EAB308] text-lg font-bold">Done</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 px-5 pt-4">
          <Text className="text-gray-400 text-xs mb-2 uppercase tracking-widest font-bold">
            {sessionTitle}
          </Text>
          <TextInput
            ref={inputRef}
            multiline
            placeholder="Start typing..."
            className="text-lg text-black leading-6"
            value={note}
            onChangeText={setNote}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddNoteScreen;