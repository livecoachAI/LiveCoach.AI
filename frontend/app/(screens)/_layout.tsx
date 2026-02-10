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
                name="(tutorials)/index"
                options={{ title: "Tutorials" }}
            />
            <Tabs.Screen
                name="(videoAnalyze)/index"
                options={{ title: "Upload" }}
            />
            <Tabs.Screen
                name="(browseCoach)/index"
                options={{ title: "Coach Find" }}
            />
            <Tabs.Screen
                name="(profile)/index"
                options={{ title: "Profile" }}
            />
            {/* Hidden routes inside tab groups */}
            <Tabs.Screen name="(profile)/sessions" options={{ href: null }} />
            <Tabs.Screen name="(tutorials)/viewVideo" options={{ href: null }} />
            <Tabs.Screen name="(browseCoach)/SportTabs" options={{ href: null }} />
            <Tabs.Screen name="(browseCoach)/CoachCard" options={{ href: null }} />
            <Tabs.Screen name="(browseCoach)/CoachContactModel" options={{ href: null }} />
            <Tabs.Screen name="(videoAnalyze)/upload" options={{ href: null }} />
            <Tabs.Screen name="(videoAnalyze)/upload-coach" options={{ href: null }} />
            <Tabs.Screen name="(videoAnalyze)/upload-result" options={{href: null}}/>
            <Tabs.Screen name="(profile)/profile" options={{ href: null }} />
            <Tabs.Screen name="(profile)/profile-coach" options={{ href: null }} />
            <Tabs.Screen name="(social)/social" options={{href: null}}/>
        </Tabs>
    );
}
