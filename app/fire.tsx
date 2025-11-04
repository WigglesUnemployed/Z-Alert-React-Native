import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function FireScreen() {
 
  const fireDepartments = [
    {
      location: 'Subic',
      departments: [
        { name: 'Subic Police Station (Baraca Camachile)', phone: '(047) 232-2600' },
        { name: 'Subic Municipal Police Station', phone: '0998-598-5503' },
      ]
    },

    {
     location: 'Olongapo',
     departments: [
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
      departments: [
        { name: 'Castillejos Municipal Police Station', phone: '0998-598-5504' },
        { name: 'Castillejos Police Force', phone: '(047) 602-2394' },
      ]
    },
    {
      location: 'San Marcelino',
      departments: [
        { name: 'San Marcelino Municipal Police Station', phone: '0947-890-1713' },

      ]
    },
    {
      location: 'San Antonio',
      departments: [
        { name: 'San Antonio PS', phone: '0998 - 598 - 5507' },
        { name: 'San Antonio Municipal WCPD', phone: '0968 - 390 - 7169 ' },
      ]
    },
    {
      location: 'San Narciso',
      departments: [
        { name: 'San Narciso MPS', phone: '0998 - 598 - 5508' },
      ]
    },

    {
      location: 'San Felipe',
      departments: [
        { name: 'San Felipe MPS', phone: '0998 - 598 - 5509' },
      ]
    },

    {
      location: 'Cabangan',
      departments: [
        { name: 'Cabangan MPS', phone: '0998 - 598 - 5510' },
      ]
    },

    {
      location: 'Botolan',
      departments: [
        { name: 'Botolam Municipal Police Statation', phone: '0998 - 598 - 5512' },
      ]
    },

    {
      location: 'Iba',
      departments: [
        { name: 'Iba MPS', phone: '0998 - 598 - 5513' },
      ]
    },

    {
      location: 'Paluig',
      departments: [
        { name: 'Paluig MPS ', phone: '0998 - 598 - 5514' },
      ]
    },

    {
      location: 'Masinloc',
      departments: [
        { name: 'Masinloc MPS', phone: '0998 - 598 - 5516' },
        { name: 'Masinloc PS', phone: '0908-869-7905' },
      ]
    },

    {
      location: 'Candeleria',
      departments: [
        { name: 'Candelaria Police Station', phone: '0998 - 598 - 5517' },
      ]
    },

    {
      location: 'Santa Cruz',
      departments: [
        { name: 'Santa Cruz MPS', phone: '0998 - 598 - 5517 ' },
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
          Fire Assistance
        </ThemedText>
        
        <TouchableOpacity style={styles.searchButton}>
          <IconSymbol name="magnifyingglass" size={24} color="#000" />
        </TouchableOpacity>
      </ThemedView>

      {/* Department List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {fireDepartments.map((location, locationIndex) => (
          <ThemedView key={locationIndex} style={styles.locationSection}>
            {/* Location Header */}
            <ThemedView style={styles.locationHeader}>
              <ThemedText style={styles.locationTitle}>{location.location}</ThemedText>
            </ThemedView>
            
            {/* Departments */}
            {location.departments.map((dept, deptIndex) => (
              <TouchableOpacity
                key={deptIndex}
                style={styles.departmentItem}
                onPress={() => handleCall(dept.phone)}
              >
                <ThemedView style={styles.departmentInfo}>
                  <ThemedText style={styles.departmentName}>{dept.name}</ThemedText>
                  <ThemedText style={styles.departmentPhone}>{dept.phone}</ThemedText>
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
    backgroundColor: '#FFE4CC',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  departmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  departmentPhone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});


