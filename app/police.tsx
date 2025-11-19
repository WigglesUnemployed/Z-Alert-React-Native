import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { getHotlinesForLocation } from '@/constants/hotlines';
import { useUser } from '@/contexts/UserContext';
import NotificationService from '@/services/NotificationService';
import { router } from 'expo-router';
import { Alert, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function PoliceScreen() {
  const { userProfile } = useUser();
  
  // Get location-based hotlines
  const locationHotlines = userProfile ? getHotlinesForLocation(userProfile.municipality, userProfile.barangay) : null;

  const policeStations = [
    {
      location: 'Subic',
      stations: [
        { name: 'Subic Police Station (Baraca Camachile)', phone: '(047) 232-2600' },
        { name: 'Subic Municipal Police Station', phone: '0998-598-5503' },
      ]
    },

    {
     location: 'Olongapo',
     stations: [
      { name: 'OCPO (Barretto, Camp LT. Gen. Cabal)', phone: '0998-598-5546' },
      { name: 'Olongapo Station 1 (City Hall, Rizal Avenue)', phone: '0998-598-5547' },
      { name: 'Olongapo Station 2 (Poster St., New Kababae)', phone: '0998-598-5549' },
      { name: 'Olongapo Station 3 (Magsaysay Drive)', phone: '0998-598-5561' },
      { name: 'Olongapo Station 4 (Rizal St, New Cabalan)', phone: '0998-598-5563' },
      { name: 'Olongapo Station 5 (Sta. Rita, Olongapo City)', phone: '0998-598-5567' },
      { name: 'Olongapo Station 6 (Iloilo St, Barretto,)', phone: '0998-598-5569' },
     ]
    },
    {
      location: 'Castillejos',
      stations: [
        { name: 'Castillejos Municipal Police Station', phone: '0998-598-5504' },
        { name: 'Castillejos Police Force', phone: '(047) 602-2394' },
      ]
    },
    {
      location: 'San Marcelino',
      stations: [
        { name: 'San Marcelino Municipal Police Station', phone: '0947-890-1713' },

      ]
    },
    {
      location: 'San Antonio',
      stations: [
        { name: 'San Antonio PS', phone: '0998 - 598 - 5507' },
        { name: 'San Antonio Municipal WCPD', phone: '0968 - 390 - 7169 ' },
      ]
    },
    {
      location: 'San Narciso',
      stations: [
        { name: 'San Narciso MPS', phone: '0998 - 598 - 5508' },
      ]
    },

    {
      location: 'San Felipe',
      stations: [
        { name: 'San Felipe MPS', phone: '0998 - 598 - 5509' },
      ]
    },

    {
      location: 'Cabangan',
      stations: [
        { name: 'Cabangan MPS', phone: '0998 - 598 - 5510' },
      ]
    },

    {
      location: 'Botolan',
      stations: [
        { name: 'Botolan Municipal Police Statation', phone: '0998 - 598 - 5512' },
      ]
    },

    {
      location: 'Iba',
      stations: [
        { name: 'Iba MPS', phone: '0998 - 598 - 5513' },
      ]
    },

    {
      location: 'Paluig',
      stations: [
        { name: 'Paluig MPS ', phone: '0998 - 598 - 5514' },
      ]
    },

    {
      location: 'Masinloc',
      stations: [
        { name: 'Masinloc MPS', phone: '0998 - 598 - 5516' },
        { name: 'Masinloc PS', phone: '0908-869-7905' },
      ]
    },

    {
      location: 'Candeleria',
      stations: [
        { name: 'Candelaria Police Station', phone: '0998 - 598 - 5517' },
      ]
    },

    {
      location: 'Santa Cruz',
      stations: [
        { name: 'Santa Cruz MPS', phone: '0998 - 598 - 5517 ' },
      ]
    },
  ];

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmergencyCall = async () => {
    if (!locationHotlines) {
      Alert.alert('Error', 'Location information not available. Please complete your profile setup.');
      return;
    }

    const notificationService = NotificationService.getInstance();
    await notificationService.scheduleEmergencyAlert(
      'Police Emergency',
      `Emergency police assistance requested in ${userProfile?.municipality}, ${userProfile?.barangay}`,
      'police'
    );

    Linking.openURL(`tel:${locationHotlines.police.emergency}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ThemedText style={styles.backButtonText}>←</ThemedText>
        </TouchableOpacity>
        
        <ThemedText type="title" style={styles.headerTitle}>
          Police Assistance
        </ThemedText>
        
        <TouchableOpacity style={styles.searchButton}>
          <IconSymbol name="magnifyingglass" size={24} color="#000" />
        </TouchableOpacity>
      </ThemedView>

      {/* Emergency Call Button */}
      {locationHotlines && (
        <ThemedView style={styles.emergencySection}>
          <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
            <IconSymbol name="phone.fill" size={24} color="#FFFFFF" />
            <ThemedText style={styles.emergencyButtonText}>
              Emergency Call - {locationHotlines.police.emergency}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

      {/* Location-based Priority Section */}
      {locationHotlines && (
        <ThemedView style={styles.prioritySection}>
          <ThemedView style={styles.priorityHeader}>
            <ThemedText style={styles.priorityTitle}>
              Your Location Priority ({userProfile?.municipality}, {userProfile?.barangay})
            </ThemedText>
          </ThemedView>
          
          <TouchableOpacity
            style={styles.priorityItem}
            onPress={() => handleCall(locationHotlines.police.primary)}
          >
            <ThemedView style={styles.priorityInfo}>
              <ThemedText style={styles.priorityName}>Primary Police Hotline</ThemedText>
              <ThemedText style={styles.priorityPhone}>{locationHotlines.police.primary}</ThemedText>
            </ThemedView>
            <IconSymbol name="chevron.right" size={20} color="#999" />
          </TouchableOpacity>

          {locationHotlines.police.secondary && (
            <TouchableOpacity
              style={styles.priorityItem}
              onPress={() => handleCall(locationHotlines.police.secondary!)}
            >
              <ThemedView style={styles.priorityInfo}>
                <ThemedText style={styles.priorityName}>Secondary Police Hotline</ThemedText>
                <ThemedText style={styles.priorityPhone}>{locationHotlines.police.secondary}</ThemedText>
              </ThemedView>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </ThemedView>
      )}

      {/* Station List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {policeStations.map((location, locationIndex) => (
          <ThemedView key={locationIndex} style={styles.locationSection}>
            {/* Location Header */}
            <ThemedView style={styles.locationHeader}>
              <ThemedText style={styles.locationTitle}>{location.location}</ThemedText>
            </ThemedView>
            
            {/* Stations */}
            {location.stations.map((station, stationIndex) => (
              <TouchableOpacity
                key={stationIndex}
                style={styles.stationItem}
                onPress={() => handleCall(station.phone)}
              >
                <ThemedView style={styles.stationInfo}>
                  <ThemedText style={styles.stationName}>{station.name}</ThemedText>
                  <ThemedText style={styles.stationPhone}>{station.phone}</ThemedText>
                </ThemedView>
                <IconSymbol name="chevron.right" size={20} color="#999" />
              </TouchableOpacity>
            ))}
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -2,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 24,
    textAlignVertical: 'center',
    marginTop: -1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  locationSection: {
    marginBottom: 20,
  },
  locationHeader: {
    backgroundColor: '#FFD5D5',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  stationPhone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  emergencySection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  emergencyButton: {
    backgroundColor: '#FF0000',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  prioritySection: {
    marginBottom: 20,
  },
  priorityHeader: {
    backgroundColor: '#FFD5D5',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  priorityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  priorityInfo: {
    flex: 1,
  },
  priorityName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  priorityPhone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});
