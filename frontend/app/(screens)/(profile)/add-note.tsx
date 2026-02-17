import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SafeAreaView, 
  KeyboardAvoidingView, Platform, ScrollView, StyleSheet 
} from 'react-native';
// Custom icon choices to match your unique brand identity
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
    <SafeAreaView className="flex-1 bg-primary">
      {/* HEADER SECTION */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 bg-white z-20">
          <TouchableOpacity onPress={onClose} className="flex-row items-center">
            <ChevronLeft size={28} color="#000000" strokeWidth={2.5} />
            <Text className="font-bebas text-[#000000] text-2xl font-semibold ml-[-2px]">Notes</Text>
          </TouchableOpacity>

          {/* Spacing kept at mr-6 as you liked */}
          <View className="flex-row items-center"> 
            <TouchableOpacity activeOpacity={0.6} className="mr-6">
              <ExternalLink size={24} color="#000000" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity activeOpacity={0.6} className="mr-6">
              <SlidersHorizontal size={22} color="#000000" strokeWidth={2} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} activeOpacity={0.6}>
              <Text className="font-bebas text-[#000000] text-2xl font-bold">Done</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CONTENT AREA WITH WATERMARK */}
        <View className="flex-1 relative">
          {/* HORIZONTAL WATERMARK WITH SHADE */}
          <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center pointer-events-none z-0">
            <Text 
              style={styles.watermarkText}
              className="font-bebas text-4xl font-black text-black tracking-[4px]"
            >
              LiveCoach.AI
            </Text>
          </View>

          <ScrollView className="flex-1 px-6 pt-5" keyboardShouldPersistTaps="handled">
            <Text className="text-gray-400 text-xs mb-3 uppercase tracking-[1.5px] font-black italic">
              {sessionTitle}
            </Text>
            <TextInput
              ref={inputRef}
              multiline
              placeholder="Start typing..."
              placeholderTextColor="#D1D5DB"
              className="text-[18px] text-black leading-7 font-medium"
              style={{ minHeight: 300 }}
              value={note}
              onChangeText={setNote}
              textAlignVertical="top"
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Custom styles for the shaded watermark
const styles = StyleSheet.create({
  watermarkText: {
    opacity: 0.06,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default AddNoteScreen;