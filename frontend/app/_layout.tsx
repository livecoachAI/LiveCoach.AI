import { Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { AuthProvider } from "@/app/context/AuthContext";

export default function RootLayout() {
    const [loaded] = useFonts({
        abeezee: require("../app/fonts/ABeeZee-Regular.ttf"),
        bebas: require("../app/fonts/BebasNeue-Regular.ttf"),
        manrope: require("../app/fonts/Manrope-VariableFont_wght.ttf"),
    });

    if (!loaded) return null;

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
    );
}