import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import ButtonShapeBar from "../components/ButtonShapeBar";

// SVG Icons
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
          tabBarActiveTintColor: "#F8FE11",
          tabBarInactiveTintColor: "#000",

          animation: "fade",
          tabBarStyle: {
            height: 65,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        {/* HOME */}
        <Tabs.Screen
          name="(social)/index"
          options={{
            tabBarIcon: ({ color }) => (
              <HomeIcon width={26} height={26} color={color} />
            ),
          }}
        />

        {/* TUTORIALS */}
        <Tabs.Screen
          name="(tutorials)/index"
          options={{
            tabBarIcon: ({ color }) => (
              <TutorialsIcon width={26} height={26} color={color} />
            ),
          }}
        />

        {/* UPLOAD */}
        <Tabs.Screen
          name="(videoAnalyze)/index"
          options={{
            tabBarIcon: ({ color }) => (
              <UploadIcon width={26} height={26} color={color} />
            ),
          }}
        />

        {/* COACH */}
        <Tabs.Screen
          name="(browseCoach)/index"
          options={{
            tabBarIcon: ({ color }) => (
              <CoachIcon width={26} height={26} color={color} />
            ),
          }}
        />

        {/* PROFILE */}
        <Tabs.Screen
          name="(profile)/index"
          options={{
            tabBarIcon: ({ color }) => (
              <ProfileIcon width={26} height={26} color={color} />
            ),
          }}
        />

        {/* Hidden routes */}
        <Tabs.Screen name="(splash)/index" options={{ href: null }} />
        <Tabs.Screen name="(splash)/splash" options={{ href: null }} />
        <Tabs.Screen name="(profile)/sessions" options={{ href: null }} />
        <Tabs.Screen name="(tutorials)/viewVideo" options={{ href: null }} />
        <Tabs.Screen name="(tutorials)/sportOverview" options={{ href: null }} />
        <Tabs.Screen name="(browseCoach)/SportTabs" options={{ href: null }} />
        <Tabs.Screen name="(browseCoach)/CoachCard" options={{ href: null }} />
        <Tabs.Screen name="(browseCoach)/CoachContactModel"
          options={{ href: null }}
        />
        <Tabs.Screen name="(videoAnalyze)/upload" options={{ href: null }} />
        <Tabs.Screen
          name="(videoAnalyze)/upload-coach"
          options={{ href: null }}
        />
        <Tabs.Screen
          name="(videoAnalyze)/upload-result"
          options={{ href: null }}
        />
        <Tabs.Screen name="(videoAnalyze)/analyze-result" options={{href: null}}/>
        <Tabs.Screen name="(videoAnalyze)/AnalyticsCard" options={{href: null}}/>
        <Tabs.Screen name="(profile)/profile" options={{ href: null }} />
        <Tabs.Screen name="(profile)/profile-coach" options={{ href: null }} />
        <Tabs.Screen name="(profile)/add-note" options={{ href: null }} />
        <Tabs.Screen name="(social)/social" options={{ href: null }} />
      </Tabs>
    </>
  );
}
