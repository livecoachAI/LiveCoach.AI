import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SafeAreaView, 
  KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
// Updated imports with new icon choices
import { ChevronLeft, ExternalLink, SlidersHorizontal } from 'lucide-react-native';

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
        {/* Header - Maintaining your requested spacing */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
          <TouchableOpacity onPress={onClose} className="flex-row items-center">
            <ChevronLeft size={28} color="#000000" strokeWidth={2.5} />
            <Text className="font-bebas text-lg text-[#000000] text-lg font-semibold ml-[-2px]">Notes</Text>
          </TouchableOpacity>

          {/* Spacing kept exactly as you liked it */}
          <View className="flex-row items-center"> 
            <TouchableOpacity activeOpacity={0.6} className="mr-6">
              {/* New 'ExternalLink' icon instead of iOS Share */}
              <ExternalLink size={24} color="#000000" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity activeOpacity={0.6} className="mr-6">
              {/* New 'SlidersHorizontal' icon for a modern 'More' action */}
              <SlidersHorizontal size={22} color="#000000" strokeWidth={2} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} activeOpacity={0.6}>
              <Text className="font-bebas text-[#000000] text-lg font-bold">Done</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Note Content Area */}
        <ScrollView className="flex-1 px-6 pt-5">
          <Text className="text-gray-400 text-xs mb-3 uppercase tracking-[1.5px] font-black italic">
            {sessionTitle}
          </Text>
          <TextInput
            ref={inputRef}
            multiline
            placeholder="Start typing..."
            placeholderTextColor="#D1D5DB"
            className="text-[18px] text-black leading-7 font-medium"
            value={note}
            onChangeText={setNote}
            textAlignVertical="top"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddNoteScreen;