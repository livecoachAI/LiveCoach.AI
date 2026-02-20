import React, { useRef, useState } from "react";
import { View, Text, TextInput, Modal, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
}

export default function OtpPopup({ visible, onClose, onSubmit }: Props) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const copy = [...otp];
    copy[index] = value;
    setOtp(copy);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const submit = () => {
    const code = otp.join("");
    if (code.length === 6) onSubmit(code);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        <View className="bg-white w-full rounded-2xl p-6">
          <Text className="text-xl font-bold text-center mb-2">Enter OTP</Text>

          <Text className="text-neutral-500 text-center mb-6">
            We sent you a 6 digit code to your email
          </Text>

          <View className="flex-row justify-between mb-6">
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(ref) => {
                  inputs.current[i] = ref!;
                }}
                value={digit}
                onChangeText={(v) => handleChange(v, i)}
                keyboardType="number-pad"
                maxLength={1}
                className="w-12 h-14 border border-gray-300 rounded-lg text-center text-xl"
              />
            ))}
          </View>

          <Pressable onPress={submit} className="bg-neutral-400 py-4 rounded-xl mb-3">
            <Text className="text-black text-center font-bold">VERIFY</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text className="text-center text-gray-500">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
