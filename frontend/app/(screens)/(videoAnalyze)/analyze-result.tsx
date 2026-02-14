import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AnalyzeResult = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-4 pt-6">
        <Text className="font-bebas text-4xl font-bold text-black">
          ANALYTICS AND FEEDBACK
        </Text>

        {/* Later you can add charts, scores, feedback, etc */}
      </View>
    </SafeAreaView>
  );
};

export default AnalyzeResult;
