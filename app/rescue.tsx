import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function RescueScreen() {
  
  const rescueServices = [
   
    {
      location: 'Zambales',
      services: [
        { name: 'Zambales PDRRMO', phone: '0920 627 3253'},
      ]
    },
   
    {
      location: 'Subic',
      services: [
        { name: 'Subic MDRRMO 1', phone: '0910 704 8306' },
        { name: 'Subic MDRRMO 2', phone: '0981 460 4746' },
        { name: 'Subic MDRRMO 3', phone: '0966 710 7968' },
      ]
    },

    {
     location: 'Olongapo',
     services: [
      { name: 'Olongapo MDRRMO', phone: ' 0998 593 7446' },
     ]
    },
    {
      location: 'Castillejos',
      services: [
        { name: 'Castillejos Rescue', phone: '0961 452 2567 ' },

      ]
    },
    {
      location: 'San Marcelino',
      services: [
        { name: 'San Marcelino Rescue', phone: '0908  888 3776' },

      ]
    },
    {
      location: 'San Antonio',
      services: [
        { name: 'San Antonio Rescue', phone: '09286 711 0367' },
      
      ]
    },
    {
      location: 'San Narciso',
      services: [
        { name: 'San Narciso Rescue', phone: '0950 856 2297' },
      ]
    },

    {
      location: 'San Felipe',
      services: [
        { name: 'San Felipe Rescue', phone: '0929 1838 441' },
      ]
    },

    {
      location: 'Cabangan',
      services: [
        { name: 'Cabangan Rescue', phone: '0909 053 5962' },
      ]
    },

    {
      location: 'Botolan',
      services: [
        { name: 'Botolan Rescue', phone: '0960 366 3737' },
      ]
    },

    {
      location: 'Iba',
      services: [
        { name: 'Iba Rescue', phone: '0998 4522 0023' },
      ]
    },

    {
      location: 'Paluig',
      services: [
        { name: 'Paluig Resuce ', phone: '0950 847 0545' },
      ]
    },

    {
      location: 'Masinloc',
      services: [
        { name: 'Masinloc Rescue', phone: '0921 405 9748' },
      ]
    },

    {
      location: 'Candeleria',
      services: [
        { name: 'Candelaria Rescue', phone: '0907 557 1570' },
      ]
    },

    {
      location: 'Santa Cruz',
      services: [
        { name: 'Santa Cruz Rescue', phone: '0967 490 8860' },
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
          Rescue Assistance
        </ThemedText>
        
        <TouchableOpacity style={styles.searchButton}>
          <IconSymbol name="magnifyingglass" size={24} color="#000" />
        </TouchableOpacity>
      </ThemedView>

      {/* Service List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {rescueServices.map((location, locationIndex) => (
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
    backgroundColor: '#E6FFE6',
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
