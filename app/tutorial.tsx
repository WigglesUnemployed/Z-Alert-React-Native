import { IconSymbol } from '@/components/ui/icon-symbol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  details: string[];
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    title: 'Welcome to Z-Alert',
    description: 'Your emergency response companion',
    icon: 'shield.checkered',
    iconColor: '#F54B2A',
    details: [
      'Z-Alert helps you quickly access emergency services',
      'Get location-based emergency hotlines',
      'Receive real-time emergency notifications',
      'Stay safe and connected in emergencies',
    ],
  },
  {
    id: 2,
    title: 'Emergency Services',
    description: 'Quick access to help when you need it',
    icon: 'cross.case.fill',
    iconColor: '#0066FF',
    details: [
      'Tap Police for law enforcement assistance',
      'Tap Fire for fire department emergencies',
      'Tap Medical for medical emergencies',
      'Tap Rescue for rescue operations',
      'Each service shows location-specific hotlines',
    ],
  },
  {
    id: 3,
    title: 'Call 911',
    description: 'Direct access to emergency services',
    icon: 'phone.fill',
    iconColor: '#ED1C24',
    details: [
      'Use the red "Call 911" button for immediate emergencies',
      'Confirms before dialing to prevent accidental calls',
      'Works even when the app is in the background',
      'Always available on the home screen',
    ],
  },
  {
    id: 4,
    title: 'Location-Based Features',
    description: 'Personalized emergency information',
    icon: 'location.fill',
    iconColor: '#0066CC',
    details: [
      'Your location is displayed at the top',
      'Emergency hotlines are prioritized by your area',
      'Notifications are filtered by your municipality',
      'Relevant alerts for your barangay',
    ],
  },
  {
    id: 5,
    title: 'Search & Navigation',
    description: 'Find what you need quickly',
    icon: 'magnifyingglass',
    iconColor: '#000000',
    details: [
      'Use the search icon to find specific services',
      'Navigate using bottom tabs: Home, Mambo AI, Notifications, Weather, Profile',
      'Each tab provides different features',
      'Swipe or tap to navigate between screens',
    ],
  },
  {
    id: 6,
    title: 'Notifications',
    description: 'Stay informed about emergencies',
    icon: 'bell.fill',
    iconColor: '#FF6600',
    details: [
      'Receive real-time emergency alerts',
      'Location-based notifications for your area',
      'Weather warnings and safety notices',
      'Check the Notifications tab for all alerts',
    ],
  },
  {
    id: 7,
    title: 'You\'re All Set!',
    description: 'Ready to use Z-Alert',
    icon: 'checkmark.circle.fill',
    iconColor: '#006600',
    details: [
      'Remember: This app is for emergencies',
      'Keep your location information updated',
      'Allow notifications for important alerts',
      'Stay safe and help others stay safe too',
    ],
  },
];

export default function TutorialScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate current step
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  const goToNextStep = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      // Fade out current step
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Move to next step
        setCurrentStep(currentStep + 1);
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.8);
      });
    } else {
      // Complete tutorial
      handleComplete();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      // Fade out current step
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Move to previous step
        setCurrentStep(currentStep - 1);
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.8);
      });
    }
  };

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedTutorial', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error completing tutorial:', error);
      router.replace('/(tabs)');
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedTutorial', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error skipping tutorial:', error);
      router.replace('/(tabs)');
    }
  };

  const currentStepData = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Skip button */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <View style={styles.progressContainer}>
          {TUTORIAL_STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive,
                index < currentStep && styles.progressDotCompleted,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: `${currentStepData.iconColor}15` }]}>
            <IconSymbol
              name={currentStepData.icon}
              size={80}
              color={currentStepData.iconColor}
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>{currentStepData.title}</Text>

          {/* Description */}
          <Text style={styles.description}>{currentStepData.description}</Text>

          {/* Details List */}
          <View style={styles.detailsContainer}>
            {currentStepData.details.map((detail, index) => (
              <View key={index} style={styles.detailItem}>
                <View style={[styles.bullet, { backgroundColor: currentStepData.iconColor }]} />
                <Text style={styles.detailText}>{detail}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={goToPreviousStep}
          disabled={isFirstStep}
          style={[styles.navButton, styles.backButton, isFirstStep && styles.navButtonDisabled]}
        >
          <IconSymbol
            name="chevron.left"
            size={20}
            color={isFirstStep ? '#CCCCCC' : '#000000'}
          />
          <Text style={[styles.navButtonText, isFirstStep && styles.navButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToNextStep}
          style={[styles.navButton, styles.nextButton]}
        >
          <Text style={styles.nextButtonText}>
            {isLastStep ? 'Get Started' : 'Next'}
          </Text>
          {!isLastStep && (
            <IconSymbol name="chevron.right" size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerLeft: {
    width: 60,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  progressDotActive: {
    width: 24,
    backgroundColor: '#F54B2A',
  },
  progressDotCompleted: {
    backgroundColor: '#F54B2A',
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingRight: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
    flexShrink: 0,
  },
  detailText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    gap: 12,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 120,
  },
  backButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  navButtonTextDisabled: {
    color: '#CCCCCC',
  },
  nextButton: {
    backgroundColor: '#F54B2A',
    flex: 1,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

