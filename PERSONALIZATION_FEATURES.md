# Z-Alert Personalization Features

## Overview
The Z-Alert app now includes comprehensive personalization features that provide location-based emergency services and notifications based on the user's municipality and barangay.

## Key Features

### 1. User Onboarding
- **First-time users**: New users are automatically directed to a profile setup screen
- **Data reset**: Users can clear their app data to return to the onboarding screen
- **Profile collection**: Collects age, sex, municipality, and barangay information

### 2. Location-Based Hotlines
- **Priority display**: Shows location-specific emergency hotlines at the top of each emergency screen
- **Municipality-specific data**: Different hotlines for Subic, Olongapo, Dinalupihan, and other municipalities
- **Barangay-level precision**: More specific hotlines when available for the user's barangay
- **Fallback system**: Default hotlines for locations not in the database

### 3. Smart Notifications
- **Location-based alerts**: Only receive notifications relevant to your municipality/barangay
- **Emergency notifications**: Immediate alerts for police, fire, medical, and rescue emergencies
- **Weather alerts**: Location-specific weather warnings
- **Safety notices**: Local safety information and road conditions
- **Test functionality**: Built-in test notification system for development

### 4. App State Management
- **Persistent storage**: User profile and preferences saved using AsyncStorage
- **Automatic detection**: App detects if user has completed onboarding
- **Data persistence**: Profile remains saved even after app restarts

## Technical Implementation

### Files Added/Modified

#### New Files:
- `app/onboarding.tsx` - User profile setup screen
- `app/index.tsx` - Main app entry point with onboarding flow
- `contexts/UserContext.tsx` - User state management
- `services/NotificationService.ts` - Location-based notification system
- `constants/hotlines.ts` - Location-specific emergency hotlines data

#### Modified Files:
- `app/_layout.tsx` - Added UserProvider and onboarding route
- `app/police.tsx` - Added location-based priority hotlines
- `app/(tabs)/index.tsx` - Added location display and test functions

### Dependencies Added:
- `@react-native-async-storage/async-storage` - Data persistence
- `expo-notifications` - Push notification system

## Usage

### For New Users:
1. App automatically shows onboarding screen
2. Fill in age, sex, municipality, and barangay
3. Tap "Proceed" to save profile and access main app
4. Location-specific hotlines will now be prioritized

### For Existing Users:
1. Location information displays on home screen
2. Emergency screens show priority hotlines for your location
3. Use "Test Notifications" to verify notification system
4. Use "Clear App Data" to reset and return to onboarding

### For Developers:
1. Add new municipalities and barangays in `constants/hotlines.ts`
2. Update notification logic in `services/NotificationService.ts`
3. Modify onboarding form in `app/onboarding.tsx` as needed

## Location Data Structure

The app currently includes hotlines for:
- **Subic**: 10 barangays with specific hotlines
- **Olongapo**: 13 barangays with specific hotlines  
- **Dinalupihan**: 3 barangays with specific hotlines
- **Default**: Fallback hotlines for other locations

## Notification Types

1. **Emergency Alerts**: High priority, immediate delivery
2. **Weather Warnings**: Medium priority, location-specific
3. **Safety Notices**: High priority, local information
4. **General Info**: Low priority, municipality-wide

## Future Enhancements

- Add more municipalities and barangays
- Implement real-time location detection
- Add emergency contact management
- Integrate with official emergency services APIs
- Add multilingual support
- Implement push notification scheduling
