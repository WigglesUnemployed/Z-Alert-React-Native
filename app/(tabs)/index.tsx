import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { getHotlinesForLocation } from '@/constants/hotlines';
import { useUser } from '@/contexts/UserContext';
import NotificationService from '@/services/NotificationService';
import { Link, router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Alert, Animated, Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const { userProfile, clearUserData } = useUser();
  const locationHotlines = userProfile ? getHotlinesForLocation(userProfile.municipality, userProfile.barangay) : null;

  // Animation values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const locationOpacity = useRef(new Animated.Value(0)).current;
  const locationTranslateY = useRef(new Animated.Value(-20)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const sectionTitleOpacity = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(30)).current;
  const call911Opacity = useRef(new Animated.Value(0)).current;
  const call911TranslateY = useRef(new Animated.Value(30)).current;

  // Start animations on mount
  useEffect(() => {
    Animated.sequence([
      // Logo animation - scale up and fade in
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Location info fade in and slide down
      Animated.parallel([
        Animated.timing(locationOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(locationTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Title fade in and slide up
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Section title and buttons together
      Animated.parallel([
        Animated.timing(sectionTitleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(buttonsOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(buttonsTranslateY, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]),
      // Call 911 button with spring effect
      Animated.parallel([
        Animated.timing(call911Opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(call911TranslateY, {
          toValue: 0,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleTestNotification = async () => {
    if (!userProfile) {
      Alert.alert('Error', 'Please complete your profile setup first.');
      return;
    }

    const notificationService = NotificationService.getInstance();
    notificationService.setUserProfile(userProfile);
    await notificationService.simulateLocationAlert();
    Alert.alert('Success', 'Test notifications sent! Check your notification panel.');
  };

  const handleClearData = async () => {
    Alert.alert(
      'Clear App Data',
      'This will clear your profile and return you to the setup screen. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearUserData();
            Alert.alert('Success', 'App data cleared. Please restart the app.');
          },
        },
      ]
    );
  };

  const handleCall911 = () => {
    Alert.alert(
      'Call 911',
      'Are you sure you want to call emergency services?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL('tel:911');
          },
        },
      ]
    );
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <Animated.View style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }]
          }
        ]}>
          <Image 
            source={require('@/assets/images/z-alertlogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <TouchableOpacity style={styles.headerIcon} onPress={handleSearchPress}>
          <IconSymbol name="magnifyingglass" size={24} color="#000"/>
        </TouchableOpacity>

      </ThemedView>

      {/* Location Info */}
      {userProfile && (
        <Animated.View style={[
          styles.locationInfo,
          {
            opacity: locationOpacity,
            transform: [{ translateY: locationTranslateY }]
          }
        ]}>
          <ThemedText style={styles.locationText}>
            📍 {userProfile.municipality}, {userProfile.barangay}
          </ThemedText>
        </Animated.View>
      )}

      {/* Main Question */}
      <Animated.View style={[
        styles.titleContainer,
        {
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslateY }]
        }
      ]}>
        <ThemedText type="title" style={styles.mainTitle}>
          What is your emergency?
        </ThemedText>
      </Animated.View>

      {/* Assistance Section */}
      <ThemedView style={styles.assistanceContainer}>
        <Animated.Text style={[
          styles.sectionTitle,
          { opacity: sectionTitleOpacity }
        ]}>
          Assistance
        </Animated.Text>
        
        <Animated.View style={[
          styles.buttonsGrid,
          {
            opacity: buttonsOpacity,
            transform: [{ translateY: buttonsTranslateY }]
          }
        ]}>
          {/* Police Button */}
          <Link href="/police" asChild>
            <TouchableOpacity style={styles.emergencyButton}>
              <IconSymbol name="shield" size={32} color="#FF0000" style={styles.buttonIcon} />
              <ThemedText style={styles.buttonText}>Police</ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Fire Button */}
          <Link href="/fire" asChild>
            <TouchableOpacity style={styles.emergencyButton}>
              <IconSymbol name="flame" size={32} color="#FF6600" style={styles.buttonIcon} />
              <ThemedText style={styles.buttonText}>Fire</ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Medical Button */}
          <Link href="/medical" asChild>
            <TouchableOpacity style={styles.emergencyButton}>
              <IconSymbol name="cross.case" size={32} color="#0066FF" style={styles.buttonIcon} />
              <ThemedText style={styles.buttonText}>Medical</ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Rescue Button */}
          <Link href="/rescue" asChild>
            <TouchableOpacity style={styles.emergencyButton}>
              <IconSymbol name="figure.walk" size={32} color="#006600" style={styles.buttonIcon} />
              <ThemedText style={styles.buttonText}>Rescue</ThemedText>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </ThemedView>

      {/* Call 911 Button */}
      <Animated.View style={[
        styles.categoriesContainer,
        {
          opacity: call911Opacity,
          transform: [{ translateY: call911TranslateY }]
        }
      ]}>
        <TouchableOpacity style={styles.categoriesButton} onPress={handleCall911}>
          <IconSymbol name="phone.fill" size={24} color="#FF0000" style={styles.categoriesIcon} />
          <ThemedText style={styles.categoriesText}>Call 911</ThemedText>
        </TouchableOpacity>
      </Animated.View>

      {/* Test Buttons */}
      <ThemedView style={styles.testContainer}>
        <TouchableOpacity style={styles.testButton} onPress={handleTestNotification}>
          <IconSymbol name="bell" size={20} color="#FF6600" style={styles.testIcon} />
          <ThemedText style={styles.testText}>Test Notifications</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.testButton} onPress={handleClearData}>
          <IconSymbol name="trash" size={20} color="#FF0000" style={styles.testIcon} />
          <ThemedText style={styles.testText}>Clear App Data</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ThemedView>
  );
}
          {/* Container styles */}
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
    paddingTop: 30,
    paddingBottom: 20,
  },
  headerIcon: {
    padding: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    paddingLeft: 125,
  },
  logo: {
    width: 72,
    height: 55,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  assistanceContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000000',
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  emergencyButton: {
    backgroundColor: '#FFE4E6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '47%',
    minHeight: 120,
    justifyContent: 'center',
  },
  buttonIcon: {
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  categoriesButton: {
    backgroundColor: '#ED1C24',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesIcon: {
    marginRight: 10,
  },
  categoriesText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#ffffff',
  },
  locationInfo: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#0066CC',
    textAlign: 'center',
    fontWeight: '500',
  },
  testContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  testButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  testIcon: {
    marginRight: 8,
  },
  testText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
});
