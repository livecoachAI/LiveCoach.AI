import {Stack, Tabs} from "expo-router";
import {StatusBar} from "react-native";

export default function TabLayout() {
  return (
      <Tabs>
          <Tabs.Screen
          name = "home"
          options = {{
              title : 'Home',
              headerShown:false
              }}
          />
          <Tabs.Screen
              name = "profile"
              options = {{
                  title : 'Profile',
                  headerShown:false
              }}
          />
      </Tabs>
  );
}
