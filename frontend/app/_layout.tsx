import {Slot, Stack} from "expo-router";
import "./global.css";
import {StatusBar} from "react-native";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Your route groups are children automatically */}
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        </Stack>
    );
}
