import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  SafeAreaViewBase,
} from "react-native";
import Dropdown from "../../components/Dropdown";

export default function UploadSession() {
  return (
    <View className="flex-1 p-20 bg-white">
      <Dropdown label="Badminton"></Dropdown>
    </View>
  );
}

