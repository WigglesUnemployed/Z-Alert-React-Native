import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function MedicalScreen() {
  const medicalServices = [
    {
      location: 'Subic',
      services: [
        { name: 'Subic Medical Center', phone: '(047) 232-1234' },
        { name: 'Subic General Hospital', phone: '0999-111-2222' },
        { name: 'Subic Emergency Medical Services', phone: '0999-333-4444' },
      ]
    },
    {
      location: 'Olongapo',
      services: [
        { name: 'James L. Gordon Memorial Hospital', phone: '(047) 222-1234' },
        { name: 'Olongapo City Medical Center', phone: '0999-555-6666' },
        { name: 'Olongapo Emergency Response', phone: '0999-777-8888' },
      ]
    },
    {
      location: 'Castillejos',
      services: [
        { name: 'Castillejos Medical Center', phone: '(047) 602-5678' },
        { name: 'Castillejos Emergency Services', phone: '0999-999-0000' },
      ]
    },
    {
      location: 'San Marcelino',
      services: [
        { name: 'San Marcelino Medical Center', phone: '0947-890-1714' },
        { name: 'San Marcelino Emergency Response', phone: '0947-890-1715' },
      ]
    },
    {
      location: 'San Antonio',
      services: [
        { name: 'San Antonio Medical Center', phone: '0947-330-9198' },
        { name: 'San Antonio Emergency Services', phone: '0947-330-9199' },
      ]
    },
    {
      location: 'San Narciso',
      services: [
        { name: 'San Narciso Medical Center', phone: '0947-330-9200' },
        { name: 'San Narciso Emergency Response', phone: '0947-330-9201' },
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
          <ThemedText style={styles.backButtonText}>←</ThemedText>
        </TouchableOpacity>
        
        <ThemedText type="title" style={styles.headerTitle}>
          Medical Assistance
        </ThemedText>
        
        <TouchableOpacity style={styles.searchButton}>
          <IconSymbol name="magnifyingglass" size={24} color="#000" />
        </TouchableOpacity>
      </ThemedView>

      {/* Service List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {medicalServices.map((location, locationIndex) => (
          <ThemedView key={locationIndex} style={styles.locationSection}>
            {/* Location Header */}
            <ThemedView style={styles.locationHeader}>
              <ThemedText style={styles.locationTitle}>{location.location}</ThemedText>
            </ThemedView>
            
            {/* Services */}
            {location.services.map((service, serviceIndex) => (
              <TouchableOpacity
                key={serviceIndex}
                style={styles.serviceItem}
                onPress={() => handleCall(service.phone)}
              >
                <ThemedView style={styles.serviceInfo}>
                  <ThemedText style={styles.serviceName}>{service.name}</ThemedText>
                  <ThemedText style={styles.servicePhone}>{service.phone}</ThemedText>
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
    backgroundColor: '#E6F3FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  servicePhone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
