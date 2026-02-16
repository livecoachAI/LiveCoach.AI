import { Tabs } from "expo-router";
import { Pressable, StatusBar, View } from "react-native";

// SVG Icons
import HomeIcon from "../../assets/navbarIcons/homeIcon.svg";
import TutorialsIcon from "../../assets/navbarIcons/tutorialsIcon.svg";
import UploadIcon from "../../assets/navbarIcons/uploadIcon.svg";
import CoachIcon from "../../assets/navbarIcons/coachIcon.svg";
import ProfileIcon from "../../assets/navbarIcons/profileIcon.svg";

export default function ScreensTabsLayout() {
  const ACTIVE_COLOR = "#F8FE11";
  const INACTIVE_COLOR = "#000000";

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          animation: "fade",
          tabBarStyle: {
            display: "none", 
          },
        }}
        tabBar={(props) => {
          const tabs = [
            { name: "(social)/index", Icon: HomeIcon },
            { name: "(tutorials)/index", Icon: TutorialsIcon },
            { name: "(videoAnalyze)/index", Icon: UploadIcon },
            { name: "(browseCoach)/index", Icon: CoachIcon },
            { name: "(profile)/index", Icon: ProfileIcon },
          ];

          return (
            <View className="bg-white px-3 pb-8 pt-2">
              <View className="flex-row items-center justify-center">
                <View className="w-0 h-0 border-t-[26px] border-t-transparent border-b-[26px] border-b-transparent border-r-[20px] border-r-gray-100" />

                <View className="flex-1 h-[52px] bg-gray-100 flex-row justify-between items-center px-6">
                  {tabs.map((tab, index) => {
                    const isActive = props.state.index === index;

                    return (
                      <Pressable
                        key={index}
                        onPress={() => props.navigation.navigate(tab.name)}
                        className="active:opacity-70"
                      >
                        <tab.Icon
                          width={26}
                          height={26}
                          color={isActive ? "#F8FE11" : "#000000"}
                        />
                      </Pressable>
                    );
                  })}
                </View>

                <View className="w-0 h-0 border-t-[26px] border-t-transparent border-b-[26px] border-b-transparent border-l-[20px] border-l-gray-100" />
              </View>
            </View>
          );
        }}
      >
        {/* Main Routes */}
        <Tabs.Screen name="(social)/index" />
        <Tabs.Screen name="(tutorials)/index" />
        <Tabs.Screen name="(videoAnalyze)/index" />
        <Tabs.Screen name="(browseCoach)/index" />
        <Tabs.Screen name="(profile)/index" />

        {/* Hidden Routes */}
        <Tabs.Screen name="(splash)/index" options={{ href: null }} />
        <Tabs.Screen name="(splash)/splash" options={{ href: null }} />
        <Tabs.Screen name="(profile)/sessions" options={{ href: null }} />
        <Tabs.Screen name="(tutorials)/viewVideo" options={{ href: null }} />
        <Tabs.Screen name="(tutorials)/sportOverview" options={{ href: null }}/>
        <Tabs.Screen name="(browseCoach)/SportTabs" options={{ href: null }} />
        <Tabs.Screen name="(browseCoach)/CoachCard" options={{ href: null }} />
        <Tabs.Screen name="(browseCoach)/CoachContactModel" options={{ href: null }}/>
        <Tabs.Screen name="(videoAnalyze)/upload" options={{ href: null }} />
        <Tabs.Screen name="(videoAnalyze)/upload-coach" options={{ href: null }}/>
        <Tabs.Screen name="(videoAnalyze)/upload-result" options={{ href: null }}/>
        <Tabs.Screen name="(videoAnalyze)/analyze-result" options={{ href: null }}/>
        <Tabs.Screen name="(profile)/profile" options={{ href: null }} />
        <Tabs.Screen name="(profile)/profile-coach" options={{ href: null }} />
        <Tabs.Screen name="(profile)/add-note" options={{ href: null }} />
        <Tabs.Screen name="(social)/social" options={{ href: null }} />
      </Tabs>
    </>
  );
}
