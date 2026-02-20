import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const PasswordInput = ({ value, onChangeText, placeholder }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <View className="bg-gray-100 rounded-lg px-4 py-3 flex-row items-center">
      <TextInput
        placeholder={placeholder ?? "Password"}
        placeholderTextColor="#D6D5D5"
        secureTextEntry={!visible}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 text-base text-primary-dark font-medium"
      />

      <Pressable onPress={() => setVisible(!visible)}>
        <Feather
          name={visible ? "eye-off" : "eye"}
          size={20}
          color="#ADABAB"
        />
      </Pressable>
    </View>
  );
};

export default PasswordInput;