import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function PoliceScreen() {
  const policeStations = [
    {
      location: 'Subic',
      stations: [
        { name: 'Station 1', phone: '123-2424-222' },
        { name: 'Station 2', phone: '113-24-122' },
      ]
    },
    {
      location: 'Castillejos',
      stations: [
        { name: 'Station 1', phone: '231-233-111' },
        { name: 'Station 2', phone: '113-22-122' },
      ]
    },
    {
      location: 'San Marcelino',
      stations: [
        { name: 'Station 1', phone: '0955-242-123' },
        { name: 'Station 2', phone: '113-24-122' },
      ]
    },
    {
      location: 'San Antonio',
      stations: [
        { name: 'Station 1', phone: '113-24-122' },
        { name: 'Station 2', phone: '113-24-122' },
      ]
    },
  ];

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </TouchableOpacity>
        
        <ThemedText type="title" style={styles.headerTitle}>
          Police Assistance
        </ThemedText>
        
        <TouchableOpacity style={styles.searchButton}>
          <IconSymbol name="magnifyingglass" size={24} color="#000" />
        </TouchableOpacity>
      </ThemedView>

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
    backgroundColor: '#E5E5E5',
  },
  backButton: {
    padding: 5,
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
    backgroundColor: '#D5D5D5',
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
});
