import { UserProfile } from '@/contexts/UserContext';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export interface LocationAlert {
  id: string;
  title: string;
  message: string;
  municipality: string;
  barangay?: string;
  alertType: 'emergency' | 'warning' | 'info' | 'weather';
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  isActive: boolean;
}

class NotificationService {
  private static instance: NotificationService;
  private userProfile: UserProfile | null = null;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  setUserProfile(profile: UserProfile | null) {
    this.userProfile = profile;
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Notification permission denied');
        return false;
      }

      // Configure notification channel for Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('emergency-alerts', {
          name: 'Emergency Alerts',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF0000',
          sound: 'default',
        });

        await Notifications.setNotificationChannelAsync('location-alerts', {
          name: 'Location-based Alerts',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF6600',
          sound: 'default',
        });
      }

      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  async scheduleLocationBasedAlert(alert: Omit<LocationAlert, 'id' | 'timestamp'>): Promise<string | null> {
    if (!this.userProfile) {
      console.log('No user profile set for location-based notifications');
      return null;
    }

    // Check if alert is relevant to user's location
    if (alert.municipality !== this.userProfile.municipality) {
      console.log('Alert not relevant to user location');
      return null;
    }

    // If barangay is specified, check if it matches user's barangay
    if (alert.barangay && alert.barangay !== this.userProfile.barangay) {
      console.log('Alert not relevant to user barangay');
      return null;
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: alert.title,
          body: alert.message,
          data: {
            alertType: alert.alertType,
            municipality: alert.municipality,
            barangay: alert.barangay,
            priority: alert.priority,
          },
          sound: 'default',
          priority: alert.priority === 'high' ? Notifications.AndroidNotificationPriority.MAX : 
                   alert.priority === 'medium' ? Notifications.AndroidNotificationPriority.HIGH : 
                   Notifications.AndroidNotificationPriority.DEFAULT,
        },
        trigger: null, // Show immediately
      });

      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return null;
    }
  }

  async scheduleEmergencyAlert(
    title: string,
    message: string,
    alertType: 'police' | 'fire' | 'medical' | 'rescue'
  ): Promise<string | null> {
    if (!this.userProfile) {
      console.log('No user profile set for emergency notifications');
      return null;
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `🚨 ${title}`,
          body: message,
          data: {
            alertType: 'emergency',
            emergencyType: alertType,
            municipality: this.userProfile.municipality,
            barangay: this.userProfile.barangay,
            priority: 'high',
          },
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.MAX,
        },
        trigger: null, // Show immediately
      });

      return notificationId;
    } catch (error) {
      console.error('Error scheduling emergency notification:', error);
      return null;
    }
  }

  async scheduleWeatherAlert(
    title: string,
    message: string,
    municipality: string,
    barangay?: string
  ): Promise<string | null> {
    if (!this.userProfile) {
      console.log('No user profile set for weather notifications');
      return null;
    }

    // Only send weather alerts for user's location
    if (municipality !== this.userProfile.municipality) {
      return null;
    }

    if (barangay && barangay !== this.userProfile.barangay) {
      return null;
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `🌤️ ${title}`,
          body: message,
          data: {
            alertType: 'weather',
            municipality,
            barangay,
            priority: 'medium',
          },
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: null, // Show immediately
      });

      return notificationId;
    } catch (error) {
      console.error('Error scheduling weather notification:', error);
      return null;
    }
  }

  async scheduleSafetyAlert(
    title: string,
    message: string,
    municipality: string,
    barangay?: string
  ): Promise<string | null> {
    if (!this.userProfile) {
      console.log('No user profile set for safety notifications');
      return null;
    }

    // Only send safety alerts for user's location
    if (municipality !== this.userProfile.municipality) {
      return null;
    }

    if (barangay && barangay !== this.userProfile.barangay) {
      return null;
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `⚠️ ${title}`,
          body: message,
          data: {
            alertType: 'warning',
            municipality,
            barangay,
            priority: 'high',
          },
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: null, // Show immediately
      });

      return notificationId;
    } catch (error) {
      console.error('Error scheduling safety notification:', error);
      return null;
    }
  }

  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling all notifications:', error);
    }
  }

  // Simulate receiving location-based alerts (for testing)
  async simulateLocationAlert(): Promise<void> {
    if (!this.userProfile) return;

    const alerts: Omit<LocationAlert, 'id' | 'timestamp'>[] = [
      {
        title: 'Emergency Alert',
        message: `Emergency situation reported in ${this.userProfile.municipality}. Please stay safe and follow official instructions.`,
        municipality: this.userProfile.municipality,
        barangay: this.userProfile.barangay,
        alertType: 'emergency',
        priority: 'high',
        isActive: true,
      },
      {
        title: 'Weather Warning',
        message: `Heavy rainfall expected in ${this.userProfile.municipality}. Please take necessary precautions.`,
        municipality: this.userProfile.municipality,
        alertType: 'weather',
        priority: 'medium',
        isActive: true,
      },
      {
        title: 'Safety Notice',
        message: `Road construction in ${this.userProfile.barangay}, ${this.userProfile.municipality}. Expect traffic delays.`,
        municipality: this.userProfile.municipality,
        barangay: this.userProfile.barangay,
        alertType: 'warning',
        priority: 'low',
        isActive: true,
      },
    ];

    for (const alert of alerts) {
      await this.scheduleLocationBasedAlert(alert);
    }
  }
}

export default NotificationService;
