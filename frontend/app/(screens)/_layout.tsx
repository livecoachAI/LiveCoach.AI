import {Stack, Tabs} from "expo-router";
import {StatusBar} from "react-native";

export default function ScreensTabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="(social)/index"
                options={{ title: "Home" }}
            />
            <Tabs.Screen
                name="(browseCoach)/index"
                options={{ title: "Coach Browse" }}
            />
            <Tabs.Screen
                name="(profile)/index"
                options={{ title: "Profile" }}
            />
            <Tabs.Screen
                name="(tutorials)/index"
                options={{ title: "Tutorials" }}
            />
            <Tabs.Screen
                name="(videoAnalyze)/index"
                options={{ title: "Analyze video" }}
            />
            {/* Hidden routes inside tab groups */}
            <Tabs.Screen name="(profile)/sessions" options={{ href: null }} />
            <Tabs.Screen name="(tutorials)/viewVideo" options={{ href: null }} />
        </Tabs>
    );
}
