import { getHotlinesForLocation } from '@/constants/hotlines';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  age: string;
  sex: string;
  municipality: string;
  barangay: string;
}

interface UserContextType {
  userProfile: UserProfile | null;
  hasCompletedOnboarding: boolean;
  hasCompletedTutorial: boolean;
  isLoading: boolean;
  updateUserProfile: (profile: UserProfile) => Promise<void>;
  clearUserData: () => Promise<void>;
  getLocationHotlines: () => any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Check if user has completed onboarding
      const onboardingStatus = await AsyncStorage.getItem('hasCompletedOnboarding');
      const completed = onboardingStatus === 'true';
      setHasCompletedOnboarding(completed);

      // Check if user has completed tutorial
      const tutorialStatus = await AsyncStorage.getItem('hasCompletedTutorial');
      const tutorialCompleted = tutorialStatus === 'true';
      setHasCompletedTutorial(tutorialCompleted);

      // Load user profile if onboarding is completed
      if (completed) {
        const profileData = await AsyncStorage.getItem('userProfile');
        if (profileData) {
          const profile = JSON.parse(profileData);
          setUserProfile(profile);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (profile: UserProfile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      setUserProfile(profile);
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userProfile');
      await AsyncStorage.removeItem('hasCompletedOnboarding');
      await AsyncStorage.removeItem('hasCompletedTutorial');
      setUserProfile(null);
      setHasCompletedOnboarding(false);
      setHasCompletedTutorial(false);
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  };

  const getLocationHotlines = () => {
    if (!userProfile) return null;
    return getHotlinesForLocation(userProfile.municipality, userProfile.barangay);
  };

  const value: UserContextType = {
    userProfile,
    hasCompletedOnboarding,
    hasCompletedTutorial,
    isLoading,
    updateUserProfile,
    clearUserData,
    getLocationHotlines,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
