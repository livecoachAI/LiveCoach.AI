import { Text, View } from "react-native";
import { Redirect } from "expo-router";

export default function Index() {
    const shouldRedirect = true;

    if (shouldRedirect) {
        return <Redirect href="/onboarding" />;
    }

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-blue-500">Home</Text>
        </View>
    );
}
