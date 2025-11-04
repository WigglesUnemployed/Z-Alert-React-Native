import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Linking, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface ServiceItem {
  name: string;
  phone: string;
}

interface LocationServices {
  location: string;
  police?: ServiceItem[];
  fire?: ServiceItem[];
  medical?: ServiceItem[];
  rescue?: ServiceItem[];
}

// Combined data from all service files
const allServicesData: LocationServices[] = [
  // Subic
  {
    location: 'Subic',
    police: [
      { name: 'Subic Police Station (Baraca Camachile)', phone: '(047) 232-2600' },
      { name: 'Subic Municipal Police Station', phone: '0998-598-5503' },
    ],
    fire: [
      { name: 'Subic Police Station (Baraca Camachile)', phone: '(047) 232-2600' },
      { name: 'Subic Municipal Police Station', phone: '0998-598-5503' },
    ],
    medical: [
      { name: 'Subic Medical Center', phone: '(047) 232-1234' },
      { name: 'Subic General Hospital', phone: '0999-111-2222' },
      { name: 'Subic Emergency Medical Services', phone: '0999-333-4444' },
    ],
    rescue: [
      { name: 'Subic Rescue Unit', phone: '(047) 232-1234' },
      { name: 'Subic Emergency Response Team', phone: '0999-111-2222' },
      { name: 'Subic Disaster Response', phone: '0999-333-4444' },
    ],
  },
  // Olongapo
  {
    location: 'Olongapo',
    police: [
      { name: 'OCPO (Barretto, Camp LT. Gen. Cabal)', phone: '0998-598-5546' },
      { name: 'Olongapo Station 1 (City Hall, Rizal Avenue)', phone: '0998-598-5547' },
      { name: 'Olongapo Station 2 (Poster St., New Kababae)', phone: '0998-598-5549' },
      { name: 'Olongapo Station 3 (Magsaysay Drive)', phone: '0998-598-5561' },
      { name: 'Olongapo Station 4 (Rizal St, New Cabalan)', phone: '0998-598-5563' },
      { name: 'Olongapo Station 5 (Sta. Rita, Olongapo City)', phone: '0998-598-5567' },
      { name: 'Olongapo Station 6 (Iloilo St, Barretto,)', phone: '0998-598-5569' },
    ],
    fire: [
      { name: 'OCPO (Barretto, Camp LT. Gen. Cabal)', phone: '0998-598-5546' },
      { name: 'Olongapo Station 1 (City Hall, Rizal Avenue)', phone: '0998-598-5547' },
      { name: 'Olongapo Station 2 (Poster St., New Kababae)', phone: '0998-598-5549' },
      { name: 'Olongapo Station 3 (Magsaysay Drive)', phone: '0998-598-5561' },
      { name: 'Olongapo Station 4 (Rizal St, New Cabalan)', phone: '0998-598-5563' },
      { name: 'Olongapo Station 5 (Sta. Rita, Olongapo City)', phone: '0998-598-5567' },
      { name: 'Olongapo Station 6 (Iloilo St, Barretto,)', phone: '0998-598-5569' },
    ],
    medical: [
      { name: 'James L. Gordon Memorial Hospital', phone: '(047) 222-1234' },
      { name: 'Olongapo City Medical Center', phone: '0999-555-6666' },
      { name: 'Olongapo Emergency Response', phone: '0999-777-8888' },
    ],
    rescue: [
      { name: 'Olongapo City Rescue Unit', phone: '(047) 222-1234' },
      { name: 'Olongapo Emergency Response', phone: '0999-555-6666' },
      { name: 'Olongapo Disaster Management', phone: '0999-777-8888' },
    ],
  },
  // Castillejos
  {
    location: 'Castillejos',
    police: [
      { name: 'Castillejos Municipal Police Station', phone: '0998-598-5504' },
      { name: 'Castillejos Police Force', phone: '(047) 602-2394' },
    ],
    fire: [
      { name: 'Castillejos Municipal Police Station', phone: '0998-598-5504' },
      { name: 'Castillejos Police Force', phone: '(047) 602-2394' },
    ],
    medical: [
      { name: 'Castillejos Medical Center', phone: '(047) 602-5678' },
      { name: 'Castillejos Emergency Services', phone: '0999-999-0000' },
    ],
    rescue: [
      { name: 'Castillejos Rescue Unit', phone: '(047) 602-5678' },
      { name: 'Castillejos Emergency Response', phone: '0999-999-0000' },
    ],
  },
  // San Marcelino
  {
    location: 'San Marcelino',
    police: [
      { name: 'San Marcelino Municipal Police Station', phone: '0947-890-1713' },
    ],
    fire: [
      { name: 'San Marcelino Municipal Police Station', phone: '0947-890-1713' },
    ],
    medical: [
      { name: 'San Marcelino Medical Center', phone: '0947-890-1714' },
      { name: 'San Marcelino Emergency Response', phone: '0947-890-1715' },
    ],
    rescue: [
      { name: 'San Marcelino Rescue Unit', phone: '0947-890-1714' },
      { name: 'San Marcelino Emergency Response', phone: '0947-890-1715' },
    ],
  },
  // San Antonio
  {
    location: 'San Antonio',
    police: [
      { name: 'San Antonio PS', phone: '0998 - 598 - 5507' },
      { name: 'San Antonio Municipal WCPD', phone: '0968 - 390 - 7169 ' },
    ],
    fire: [
      { name: 'San Antonio PS', phone: '0998 - 598 - 5507' },
      { name: 'San Antonio Municipal WCPD', phone: '0968 - 390 - 7169 ' },
    ],
    medical: [
      { name: 'San Antonio Medical Center', phone: '0947-330-9198' },
      { name: 'San Antonio Emergency Services', phone: '0947-330-9199' },
    ],
    rescue: [
      { name: 'San Antonio Rescue Unit', phone: '0947-330-9198' },
      { name: 'San Antonio Emergency Response', phone: '0947-330-9199' },
    ],
  },
  // San Narciso
  {
    location: 'San Narciso',
    police: [
      { name: 'San Narciso MPS', phone: '0998 - 598 - 5508' },
    ],
    fire: [
      { name: 'San Narciso MPS', phone: '0998 - 598 - 5508' },
    ],
    medical: [
      { name: 'San Narciso Medical Center', phone: '0947-330-9200' },
      { name: 'San Narciso Emergency Response', phone: '0947-330-9201' },
    ],
    rescue: [
      { name: 'San Narciso Rescue Unit', phone: '0947-330-9200' },
      { name: 'San Narciso Emergency Response', phone: '0947-330-9201' },
    ],
  },
  // San Felipe
  {
    location: 'San Felipe',
    police: [
      { name: 'San Felipe MPS', phone: '0998 - 598 - 5509' },
    ],
    fire: [
      { name: 'San Felipe MPS', phone: '0998 - 598 - 5509' },
    ],
  },
  // Cabangan
  {
    location: 'Cabangan',
    police: [
      { name: 'Cabangan MPS', phone: '0998 - 598 - 5510' },
    ],
    fire: [
      { name: 'Cabangan MPS', phone: '0998 - 598 - 5510' },
    ],
  },
  // Botolan
  {
    location: 'Botolan',
    police: [
      { name: 'Botolam Municipal Police Statation', phone: '0998 - 598 - 5512' },
    ],
    fire: [
      { name: 'Botolam Municipal Police Statation', phone: '0998 - 598 - 5512' },
    ],
  },
  // Iba
  {
    location: 'Iba',
    police: [
      { name: 'Iba MPS', phone: '0998 - 598 - 5513' },
    ],
    fire: [
      { name: 'Iba MPS', phone: '0998 - 598 - 5513' },
    ],
  },
  // Paluig
  {
    location: 'Paluig',
    police: [
      { name: 'Paluig MPS ', phone: '0998 - 598 - 5514' },
    ],
    fire: [
      { name: 'Paluig MPS ', phone: '0998 - 598 - 5514' },
    ],
  },
  // Masinloc
  {
    location: 'Masinloc',
    police: [
      { name: 'Masinloc MPS', phone: '0998 - 598 - 5516' },
      { name: 'Masinloc PS', phone: '0908-869-7905' },
    ],
    fire: [
      { name: 'Masinloc MPS', phone: '0998 - 598 - 5516' },
      { name: 'Masinloc PS', phone: '0908-869-7905' },
    ],
  },
  // Candeleria
  {
    location: 'Candeleria',
    police: [
      { name: 'Candelaria Police Station', phone: '0998 - 598 - 5517' },
    ],
    fire: [
      { name: 'Candelaria Police Station', phone: '0998 - 598 - 5517' },
    ],
  },
  // Santa Cruz
  {
    location: 'Santa Cruz',
    police: [
      { name: 'Santa Cruz MPS', phone: '0998 - 598 - 5517 ' },
    ],
    fire: [
      { name: 'Santa Cruz MPS', phone: '0998 - 598 - 5517 ' },
    ],
  },
];

const serviceTypes = [
  { key: 'police' as const, label: 'Police', icon: 'shield', iconColor: '#FF0000', bgColor: '#FFE4E6' },
  { key: 'fire' as const, label: 'Fire', icon: 'flame', iconColor: '#FF6600', bgColor: '#FFE4CC' },
  { key: 'medical' as const, label: 'Medical', icon: 'cross.case', iconColor: '#0066FF', bgColor: '#E6F3FF' },
  { key: 'rescue' as const, label: 'Rescue', icon: 'figure.walk', iconColor: '#006600', bgColor: '#E6FFE6' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber.replace(/\s+/g, '').replace(/-/g, '')}`);
  };

  // Filter locations based on search query
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    return allServicesData.filter((locationData) =>
      locationData.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <ThemedView style={styles.container}>
      {/* Search Bar */}
      <ThemedView style={styles.searchContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IconSymbol name="chevron.left" size={24} color="#FF0000" />
        </TouchableOpacity>
        <ThemedView style={styles.searchBox}>
          <IconSymbol name="magnifyingglass" size={20} color="#FF0000" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for assistance or hotline"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <IconSymbol name="xmark.circle.fill" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </ThemedView>
      </ThemedView>

      {/* Results */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {searchQuery.length === 0 ? (
          <ThemedView style={styles.emptyState}>
            <IconSymbol name="magnifyingglass" size={64} color="#CCC" />
            <ThemedText style={styles.emptyStateTitle}>Search for Municipality</ThemedText>
            <ThemedText style={styles.emptyStateText}>
              Enter a municipality name to find all available assistance services
            </ThemedText>
          </ThemedView>
        ) : filteredLocations.length > 0 ? (
          filteredLocations.map((locationData, locationIndex) => (
            <ThemedView key={locationIndex} style={styles.locationCard}>
              {/* Location Header */}
              <ThemedView style={styles.locationHeader}>
                <IconSymbol name="mappin.circle.fill" size={24} color="#FF0000" />
                <ThemedText style={styles.locationTitle}>{locationData.location}</ThemedText>
              </ThemedView>

              {/* Services by Type */}
              {serviceTypes.map((serviceType) => {
                const services = locationData[serviceType.key];
                if (!services || services.length === 0) return null;

                return (
                  <ThemedView key={serviceType.key} style={styles.serviceTypeSection}>
                    <ThemedView style={[styles.serviceTypeHeader, { backgroundColor: serviceType.bgColor }]}>
                      <IconSymbol 
                        name={serviceType.icon as any} 
                        size={20} 
                        color={serviceType.iconColor} 
                      />
                      <ThemedText style={styles.serviceTypeLabel}>{serviceType.label} Assistance</ThemedText>
                    </ThemedView>

                    {services.map((service, serviceIndex) => (
                      <TouchableOpacity
                        key={serviceIndex}
                        style={styles.serviceItem}
                        onPress={() => handleCall(service.phone)}
                        activeOpacity={0.7}
                      >
                        <ThemedView style={styles.serviceInfo}>
                          <ThemedText style={styles.serviceName}>{service.name}</ThemedText>
                          <ThemedText style={styles.servicePhone}>{service.phone}</ThemedText>
                        </ThemedView>
                        <IconSymbol name="phone.fill" size={20} color={serviceType.iconColor} />
                      </TouchableOpacity>
                    ))}
                  </ThemedView>
                );
              })}
            </ThemedView>
          ))
        ) : (
          <ThemedView style={styles.noResults}>
            <IconSymbol name="mappin.slash" size={48} color="#CCC" />
            <ThemedText style={styles.noResultsText}>
              No services found for "{searchQuery}"
            </ThemedText>
            <ThemedText style={styles.noResultsSubtext}>
              Try searching for: Subic, Olongapo, Castillejos, or other municipalities
            </ThemedText>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 2,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 10,
    marginRight: 12,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E6',
    borderRadius: 13,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 1,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 12,
  },
  serviceTypeSection: {
    marginTop: 0,
  },
  serviceTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  serviceTypeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#FFFFFF',
  },
  serviceInfo: {
    flex: 1,
    marginRight: 12,
  },
  serviceName: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  servicePhone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#CCC',
    textAlign: 'center',
  },
});
