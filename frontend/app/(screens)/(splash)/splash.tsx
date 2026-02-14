import React, { useEffect, useRef, FC } from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import { router } from 'expo-router'

const Splash: FC = () => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const opacityAnim = useRef(new Animated.Value(0)).current
  const pulse1 = useRef(new Animated.Value(0.3)).current
  const pulse2 = useRef(new Animated.Value(0.3)).current
  const pulse3 = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    // Animation sequence for logo
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start()

    // Pulse animations for loading dots
    const createPulseAnimation = (pulseRef: Animated.Value, delay: number) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseRef, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(pulseRef, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        ).start()
      }, delay)
    }

    createPulseAnimation(pulse1, 0)
    createPulseAnimation(pulse2, 300)
    createPulseAnimation(pulse3, 600)

    // Navigate after 2 seconds
    const navigationTimer = setTimeout(() => {
      router.replace('/(screens)/(social)')
    }, 200)

    return () => clearTimeout(navigationTimer)
  }, [scaleAnim, opacityAnim, pulse1, pulse2, pulse3])

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      {/* Logo Section */}
      <Animated.View
        style={{
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        }}
        className="items-center"
      >
        <Text
          className="text-5xl font-bold text-center text-gray-800"
          style={{
            fontFamily: 'bebas',
            letterSpacing: 2,
          }}
        >
          LiveCoach.AI
        </Text>
        
      </Animated.View>

      {/* Loading Indicator */}
      <View className="absolute bottom-20">
        <View className="flex-row gap-2">
          <Animated.View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#3b82f6',
              opacity: pulse1,
            }}
          />
          <Animated.View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#3b82f6',
              opacity: pulse2,
            }}
          />
          <Animated.View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#3b82f6',
              opacity: pulse3,
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default Splash