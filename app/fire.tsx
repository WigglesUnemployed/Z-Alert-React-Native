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
        { name: 'Subic Fire Station (Baraca Camachile)', phone: '0999 366 7858 ' },
        { name: 'Subic Fire Station 1', phone: '0927 698 3563' },
      ]
    },

    {
     location: 'Olongapo',
     departments: [
      { name: 'Olongapo fire search & rescue', phone: '(047) 2223-6876' }, 
      { name: 'Olongapo Fire rescue 1 ' , phone: '09512 77 902' }, 
      { name: 'Olongapo Fire rescue 2 ', phone: '0998 593 7446' }, 
      

     ]
    },
    {
      location: 'Castillejos',
      departments: [
        { name: 'BFP R3 Castillejos Fire Station', phone: '0908 243 2825' },
      ]
    },
    {
      location: 'San Marcelino',
      departments: [
        { name: 'San Marcelino Fire Station', phone: '0951 118 6269' },

      ]
    },
    {
      location: 'San Antonio',
      departments: [
        { name: 'San Antonio PS', phone: '0960 819 3964' },
      ]
    },
    {
      location: 'San Narciso',
      departments: [
        { name: 'San Narciso FS', phone: '0960 819 3964' },
      ]
    },

    {
      location: 'San Felipe',
      departments: [
        { name: 'San Felipe FS', phone: '0960 819 3964' },
      ]
    },

    {
      location: 'Cabangan',
      departments: [
        { name: 'Cabangan FS', phone: '0915 066 8593' },
      ]
    },

    {
      location: 'Botolan',
      departments: [
        { name: 'Botolan FS', phone: '0908 941 2913' },
      ]
    },

    {
      location: 'Iba',
      departments: [
        { name: 'Iba FS', phone: '0999 177 7660' },
      ]
    },

    {
      location: 'Paluig',
      departments: [
        { name: 'Paluig FS ', phone: '0999 177 7660' },
      ]
    },

    {
      location: 'Masinloc',
      departments: [
        { name: 'Masinloc FS', phone: '0961 460 0793' },
      ]
    },

    {
      location: 'Candeleria',
      departments: [
        { name: 'Candelaria FS 1', phone: '0961 460 5472' },
        { name: 'Candelaria FS 2', phone: '0970 109 1468' },
      ]
    },

    {
      location: 'Santa Cruz',
      departments: [
        { name: 'Santa Cruz FS', phone: '0975 788 3240 ' },
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


