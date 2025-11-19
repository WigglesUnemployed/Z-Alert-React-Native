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
        { name: 'Subic Police Station (Baraca Camachile)', phone: '(047) 232-2600' },
        { name: 'Subic Municipal Police Station', phone: '0998-598-5503' },
      ]
    },

    {
     location: 'Olongapo',
     services: [
      { name: 'Baypointe', phone: '0939 915 7633' },
      { name: 'ZMMG', phone: ' 0998 9190 965 ' },

     ]
    },
    {
      location: 'Castillejos',
      services: [
        { name: 'RHU Castillejos ', phone: '0938 190 2350' },
  
      ]
    },
    {
      location: 'San Marcelino',
      services: [
        { name: 'ZMMG San Marcelino   ', phone: '0948 0387 573' },
        { name: 'District Hospital San Marcelino ', phone: '(047) 602 2301' },

      ]
    },
    {
      location: 'San Antonio',
      services: [
        { name: 'San Antonio PS', phone: '0998 - 598 - 5507' },
        { name: 'San Antonio Municipal WCPD', phone: '0968 - 390 - 7169 ' },
      ]
    },
    {
      location: 'San Narciso',
      services: [
        { name: 'San Narciso ', phone: '0947 330 2300' },
      ]
    },

    {
      location: 'San Felipe',
      services: [
        { name: 'San Felipe RHU', phone: '0931 793 8035 ' },
      ]
    },

    {
      location: 'Cabangan',
      services: [
        { name: 'Cabangan MPS', phone: '0998 - 598 - 5510' },
      ]
    },

    {
      location: 'Botolan',
      services: [
        { name: 'Botolan Municipal Police Statation', phone: '0998 - 598 - 5512' },
      ]
    },

    {
      location: 'Iba',
      services: [
        { name: 'Iba PRMMH 1', phone: '0943 134 2831' },
        { name: 'Iba PRMMH 2', phone: '0933 860 2431' },
      ]
    },

    {
      location: 'Paluig',
      services: [
        { name: 'Paluig MPS ', phone: '0910 6555 567 ' },
      ]
    },

    {
      location: 'Masinloc',
      services: [
        { name: 'Masinloc MPS', phone: '0947 581 8397 ' },
        { name: 'Masinloc PS', phone: '0908-869-7905' },
      ]
    },

    {
      location: 'Candeleria',
      services: [
        { name: 'Candelaria RHU  ', phone: '0920 274 7143 ' },
      ]
    },

    {
      location: 'Santa Cruz',
      services: [
        { name: 'Santa Cruz RHU', phone: '0906 887 8917 ' },
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
