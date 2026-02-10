import { Tabs } from "expo-router";
import { StatusBar } from "react-native";

// Correct imports from your folder
import HomeIcon from "../../assets/navbarIcons/homeIcon.svg";
import TutorialsIcon from "../../assets/navbarIcons/tutorialsIcon.svg";
import UploadIcon from "../../assets/navbarIcons/uploadIcon.svg";
import CoachIcon from "../../assets/navbarIcons/coachIcon.svg";
import ProfileIcon from "../../assets/navbarIcons/profileIcon.svg";

export default function ScreensTabsLayout() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#000",
                    tabBarInactiveTintColor: "#9CA1AF",
                    tabBarStyle: {
                        height: 65,
                        paddingBottom: 10,
                        paddingTop: 10,
                    },
                }}
            >
                <Tabs.Screen
                    name="(social)/index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color }) => (
                            <HomeIcon width={26} height={26} fill={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="(tutorials)/index"
                    options={{
                        title: "Tutorials",
                        tabBarIcon: ({ color }) => (
                            <TutorialsIcon width={26} height={26} fill={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="(videoAnalyze)/index"
                    options={{
                        title: "Upload",
                        tabBarIcon: ({ color }) => (
                            <UploadIcon width={26} height={26} fill={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="(browseCoach)/index"
                    options={{
                        title: "Coach Find",
                        tabBarIcon: ({ color }) => (
                            <CoachIcon width={26} height={26} fill={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="(profile)/index"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color }) => (
                            <ProfileIcon width={26} height={26} fill={color} />
                        ),
                    }}
                />

                {/* Hidden routes inside tab groups */}
                <Tabs.Screen name="(profile)/sessions" options={{ href: null }} />
                <Tabs.Screen name="(tutorials)/viewVideo" options={{ href: null }} />
                <Tabs.Screen name="(browseCoach)/SportTabs" options={{ href: null }} />
                <Tabs.Screen name="(browseCoach)/CoachCard" options={{ href: null }} />
                <Tabs.Screen name="(browseCoach)/CoachContactModel" options={{ href: null }} />
                <Tabs.Screen name="(videoAnalyze)/upload" options={{ href: null }} />
                <Tabs.Screen name="(videoAnalyze)/upload-coach" options={{ href: null }} />
                <Tabs.Screen name="(videoAnalyze)/upload-result" options={{ href: null }} />
                <Tabs.Screen name="(profile)/profile" options={{ href: null }} />
                <Tabs.Screen name="(profile)/profile-coach" options={{ href: null }} />
                <Tabs.Screen name="(social)/social" options={{ href: null }} />
            </Tabs>
        </>
    );
}
