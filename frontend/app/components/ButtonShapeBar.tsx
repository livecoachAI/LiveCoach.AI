import React from "react";
import { View, Pressable } from "react-native";
import { usePathname } from "expo-router";

type Tab = {
  name: string;
  Icon: React.ComponentType<any>;
};

type Props = {
  tabs: Tab[];
  navigation: any;
  color?: string;
  activeColor?: string;
  inactiveColor?: string;
};

export default function ButtonShapeBar({
  tabs,
  navigation,
  color = "#E5E7EB",
  activeColor = "#F8FE11",
  inactiveColor = "#000",
}: Props) {
  const pathname = usePathname();

  return (
    <View className="w-full flex-row items-center">

      {/* LEFT TIP (same as button) */}
      <View
        style={{
          width: 0,
          height: 0,
          borderTopWidth: 26,
          borderBottomWidth: 26,
          borderRightWidth: 20,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderRightColor: color,
        }}
      />

      {/* CENTER BODY (same height as button) */}
      <View
        style={{ height: 52, backgroundColor: color }}
        className="flex-1 flex-row items-center justify-around"
      >
        {tabs.map((tab, i) => {
          const active = pathname.startsWith(
            "/" + tab.name.split("/")[0]
          );

          return (
            <Pressable
              key={i}
              onPress={() => navigation.navigate(tab.name)}
              className="active:opacity-80"
            >
              <tab.Icon
                width={26}
                height={26}
                fill={active ? activeColor : inactiveColor}
              />
            </Pressable>
          );
        })}
      </View>

      {/* RIGHT TIP (same as button) */}
      <View
        style={{
          width: 0,
          height: 0,
          borderTopWidth: 26,
          borderBottomWidth: 26,
          borderLeftWidth: 20,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: color,
        }}
      />
    </View>
  );
}

