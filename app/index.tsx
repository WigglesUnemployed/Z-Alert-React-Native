import { useUser } from '@/contexts/UserContext';
import NotificationService from '@/services/NotificationService';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function AppIndex() {
  const { hasCompletedOnboarding, hasCompletedTutorial, isLoading, userProfile } = useUser();

  useEffect(() => {
    // Request notification permissions when app starts
    const initializeNotifications = async () => {
      const notificationService = NotificationService.getInstance();
      await notificationService.requestPermissions();
      
      if (userProfile) {
        notificationService.setUserProfile(userProfile);
      }
    };

    initializeNotifications();
  }, [userProfile]);

  useEffect(() => {
    if (!isLoading) {
      if (!hasCompletedOnboarding) {
        router.replace('/onboarding');
      } else if (!hasCompletedTutorial) {
        router.replace('/tutorial');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [hasCompletedOnboarding, hasCompletedTutorial, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
