import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, Platform } from 'react-native';

export default function TabLayout() {
  // Animation values
  const tabBarFadeAnim = useRef(new Animated.Value(0)).current;
  const tabBarSlideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(tabBarFadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(tabBarSlideAnim, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        // No opacity, no transform on outer container!
      }}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FF0000',
          tabBarInactiveTintColor: '#000000',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: [
            {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 1,
              borderTopColor: '#E5E5E5',
              height: Platform.OS === 'ios' ? 80 : 65,
              paddingBottom: Platform.OS === 'ios' ? 15 : 10,
            },
            {
              opacity: tabBarFadeAnim,
              transform: [{ translateY: tabBarSlideAnim }],
            }
          ],
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 5,
          },
        }}>
        
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol 
                size={26} 
                name={focused ? "house.fill" : "house"} 
                color={color} 
              />
            ),
          }}
        />

<Tabs.Screen
  name="mambo-ai"
  options={{
    title: 'Mambo AI',
    tabBarIcon: ({ color }) => (
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
          marginRight: 13, 
        }}
      >
        <Image 
          source={require('@/assets/images/Mlogo.png')}
          style={{ width: 35, height: 35 }} // slightly smaller for balance
          resizeMode="contain"
        />
      </Animated.View>
    ),
    tabBarLabelStyle: {
      fontSize: 12,
      marginTop: 5,
      marginRight: 13, 
    },
  }}
/>

        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol 
                size={26} 
                name={focused ? "bell.fill" : "bell"} 
                color={color} 
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <IconSymbol 
                size={26} 
                name="person.circle" 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
    </Animated.View>
  );
}
