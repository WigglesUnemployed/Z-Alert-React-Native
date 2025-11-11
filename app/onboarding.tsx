import { IconSymbol } from '@/components/ui/icon-symbol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface UserProfile {
  age: string;
  sex: string;
  municipality: string;
  barangay: string;
}

const MUNICIPALITIES = [
  'Botolan',
  'Cabangan', 
  'Candelaria',
  'Castillejos',
  'Iba',
  'Masinloc',
  'Olongapo',
  'Palauig',
  'San Antonio',
  'San Felipe',
  'San Marcelino',
  'San Narciso',
  'Santa Cruz',
  'Subic',
];

const BARANGAYS = {
  'Botolan': [
    'Bancal',
    'Bangan',
    'Batonlapoc',
    'Belbel',
    'Beneg',
    'Binuclutan',
    'Burgos',
    'Cabatuan',
    'Capayawan',
    'Carael',
    'Danacbunga',
    'Maguisguis',
    'Malomboy',
    'Mambog',
    'Moraza',
    'Nacolcol',
    'Owaog-Nibloc',
    'Paco',
    'Palis',
    'Panan',
    'Parel',
    'Paudpod',
    'Poonbato',
    'Porac',
    'San Isidro',
    'San Juan',
    'San Miguel',
    'Santiago',
    'Tampo',
    'Taugtog',
    'Villar',
  ],
  'Cabangan': [
    'Anonang',
    'Apo-Apo',
    'Arew',
    'Banuambayo',
    'Cadmang-Reserva',
    'Camiling',
    'Casabaan',
    'Del Carmen',
    'Dolores',
    'Felmida-Diaz',
    'Laoag',
    'Lomboy',
    'Longos',
    'Mabanglit',
    'New San Juan',
    'San Antonio',
    'San Isidro',
    'San Juan',
    'San Rafael',
    'Santa Rita',
    'Santo Niño',
    'Tondo',
  ],
  'Candelaria': [
    'Babancal',
    'Binabalian',
    'Catol',
    'Dampay',
    'Lauis',
    'Libertador',
    'Malabon',
    'Malimanga',
    'Pamibian',
    'Panayonan',
    'Pinagrealan',
    'Poblacion',
    'Sinabacan',
    'Taposo',
    'Uacon',
    'Yamot',
  ],
  'Castillejos': [
    'Balaybay',
    'Buenavista',
    'Del Pilar',
    'Looc',
    'Magsaysay',
    'Nagbayan',
    'Nagbunga',
    'San Agustin',
    'San Jose',
    'San Juan',
    'San Nicolas',
    'San Pablo',
    'San Roque',
    'Santa Maria',
  ],
  'Iba': [
    'Amungan',
    'Bangantalinga',
    'Dirita-Baloguen',
    'Lipay-Dingin-Panibuatan',
    'Palanginan',
    'San Agustin',
    'Santa Barbara',
    'Santo Rosario',
    'Zone 1 Poblacion',
    'Zone 2 Poblacion',
    'Zone 3 Poblacion',
    'Zone 4 Poblacion',
    'Zone 5 Poblacion',
    'Zone 6 Poblacion',
  ],
  'Masinloc': [
    'Baloganon',
    'Bamban',
    'Bani',
    'Collat',
    'Inhobol',
    'North Poblacion',
    'San Lorenzo',
    'San Salvador',
    'Santa Rita',
    'Santo Rosario',
    'South Poblacion',
    'Taltal',
    'Tapuac',
  ],
  'Olongapo': [
    'Asinan',
    'Banicain',
    'Barreto',
    'East Bajac-Bajac',
    'Gordon Heights',
    'Kalaklan',
    'New Cabalan',
    'New Ilalim',
    'New Kababae',
    'Old Cabalan',
    'Pag-asa',
    'Santa Rita',
    'West Bajac-Bajac',
  ],
  'Palauig': [
    'Alwa',
    'Bato',
    'Bulawen',
    'Cauyan',
    'East Poblacion',
    'Garreta',
    'Libaba',
    'Liozon',
    'Lipay',
    'Locloc',
    'Macarang',
    'Magalawa',
    'Pangolingan',
    'Salaza',
    'San Juan',
    'Santo Niño',
    'Santo Tomas',
    'Tition',
    'West Poblacion',
  ],
  'San Antonio': [
    'Angeles',
    'Antipolo',
    'Burgos',
    'East Dirita',
    'Luna',
    'Pundaquit',
    'Rizal',
    'San Esteban',
    'San Gregorio',
    'San Juan',
    'San Miguel',
    'San Nicolas',
    'Santiago',
    'West Dirita',
  ],
  'San Felipe': [
    'Amagna',
    'Apostol',
    'Balincaguing',
    'Farañal',
    'Feria',
    'Maloma',
    'Manglicmot',
    'Rosete',
    'San Rafael',
    'Santo Niño',
    'Sindol',
  ],
  'San Marcelino': [
    'Aglao',
    'Buhawen',
    'Burgos',
    'Central',
    'Consuelo Norte',
    'Consuelo Sur',
    'La Paz',
    'Laoag',
    'Linasin',
    'Linusungan',
    'Lucero',
    'Nagbunga',
    'Rabanes',
    'Rizal',
    'San Guillermo',
    'San Isidro',
    'San Rafael',
    'Santa Fe',
  ],
  'San Narciso': [
    'Alusiis',
    'Beddeng',
    'Candelaria',
    'Dallipawen',
    'Grullo',
    'La Paz',
    'Libertad',
    'Namatacan',
    'Natividad',
    'Omaya',
    'Paite',
    'Patrocinio',
    'San Jose',
    'San Juan',
    'San Pascual',
    'San Rafael',
    'Siminublan',
  ],
  'Santa Cruz': [
    'Babuyan',
    'Bangcol',
    'Bayto',
    'Biay',
    'Bolitoc',
    'Bulawon',
    'Canaynayan',
    'Gama',
    'Guinabon',
    'Guisguis',
    'Lipay',
    'Lomboy',
    'Lucapon North',
    'Lucapon South',
    'Malabago',
    'Naulo',
    'Pagatpat',
    'Pamonoran',
    'Poblacion North',
    'Poblacion South',
    'Sabang',
    'San Fernando',
    'Tabalong',
    'Tubotubo North',
    'Tubotubo South',
  ],
  'Subic': [
    'Aningway Sacatihan',
    'Asinan Poblacion',
    'Asinan Proper',
    'Baraca-Camachile',
    'Batiawan',
    'Calapacuan',
    'Calapandayan',
    'Cawag',
    'Ilwas',
    'Mangan-Vaca',
    'Matain',
    'Naugsol',
    'Pamatawan',
    'San Isidro',
    'Santo Tomas',
    'Wawandue',
  ],
};

const SEX_OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say'];

export default function OnboardingScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    sex: '',
    municipality: '',
    barangay: '',
  });
  const [showMunicipalityDropdown, setShowMunicipalityDropdown] = useState(false);
  const [showSexDropdown, setShowSexDropdown] = useState(false);
  const [showBarangayDropdown, setShowBarangayDropdown] = useState(false);
  const [availableBarangays, setAvailableBarangays] = useState<string[]>([]);

  // Animation values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(30)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(20)).current;
  const buttonMarginTop = useRef(new Animated.Value(20)).current;

  // Start animations on mount
  useEffect(() => {
    // Staggered animation sequence
    Animated.sequence([
      // Logo animation - scale up and fade in with bounce
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Title and subtitle fade in together
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Form fade in and slide up
      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(formTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Button fade in and slide up with slight delay
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.spring(buttonTranslateY, {
          toValue: 0,
          friction: 5,
          tension: 40,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  }, []);

  // Animate button margin when dropdowns open/close
  useEffect(() => {
    const isAnyDropdownOpen = showSexDropdown || showMunicipalityDropdown || showBarangayDropdown;
    Animated.timing(buttonMarginTop, {
      toValue: isAnyDropdownOpen ? 280 : 20,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showSexDropdown, showMunicipalityDropdown, showBarangayDropdown, buttonMarginTop]);

  const handleMunicipalitySelect = (municipality: string) => {
    setProfile({ ...profile, municipality, barangay: '' });
    setAvailableBarangays(BARANGAYS[municipality as keyof typeof BARANGAYS] || []);
    setShowMunicipalityDropdown(false);
    // Reset barangay dropdown state when municipality changes
    setShowBarangayDropdown(false);
  };

  const handleBarangaySelect = (barangay: string) => {
    setProfile({ ...profile, barangay });
    setShowBarangayDropdown(false);
  };

  const handleSexSelect = (sex: string) => {
    setProfile({ ...profile, sex });
    setShowSexDropdown(false);
  };

  const handleProceed = async () => {
    // Validate form
    if (!profile.age || !profile.sex || !profile.municipality || !profile.barangay) {
      Alert.alert('Incomplete Information', 'Please fill in all fields to continue.');
      return;
    }

    if (isNaN(Number(profile.age)) || Number(profile.age) < 1 || Number(profile.age) > 120) {
      Alert.alert('Invalid Age', 'Please enter a valid age between 1 and 120.');
      return;
    }

    try {
      // Save user profile to AsyncStorage
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      
      // Navigate to tutorial
      router.replace('/tutorial');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top padding for bounce effect */}
        <View style={styles.topPadding} />

        {/* Header */}
        <View style={styles.header}>
          <Animated.View style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }]
          }}>
            <Image 
              source={require('@/assets/images/z-alertlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
            Welcome to Z-alert
          </Animated.Text>
          <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
            Let's get your profile set up.
          </Animated.Text>
        </View>

        {/* Form */}
        <Animated.View style={[styles.form, {
          opacity: formOpacity,
          transform: [{ translateY: formTranslateY }]
        }]}>
        {/* Age Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your age"
            value={profile.age}
            onChangeText={(text) => setProfile({ ...profile, age: text })}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>

        {/* Sex Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sex</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowSexDropdown(!showSexDropdown)}
          >
            <Text style={[styles.dropdownText, !profile.sex && styles.placeholder]}>
              {profile.sex || 'Select your sex'}
            </Text>
            <IconSymbol 
              name={showSexDropdown ? "chevron.up" : "chevron.down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
           {showSexDropdown && (
             <View style={styles.dropdownList}>
               <ScrollView 
                 style={styles.dropdownScrollView}
                 showsVerticalScrollIndicator={true}
                 nestedScrollEnabled={true}
               >
                 {SEX_OPTIONS.map((option) => (
                   <TouchableOpacity
                     key={option}
                     style={styles.dropdownItem}
                     onPress={() => handleSexSelect(option)}
                     activeOpacity={0.6}
                   >
                     <Text style={styles.dropdownItemText}>{option}</Text>
                   </TouchableOpacity>
                 ))}
               </ScrollView>
             </View>
           )}
        </View>

        {/* Municipality Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Municipality</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowMunicipalityDropdown(!showMunicipalityDropdown)}
            activeOpacity={0.7}
          >
            <Text style={[styles.dropdownText, !profile.municipality && styles.placeholder]}>
              {profile.municipality || 'Select your municipality'}
            </Text>
            <IconSymbol 
              name={showMunicipalityDropdown ? "chevron.up" : "chevron.down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
           {showMunicipalityDropdown && (
             <View style={styles.dropdownList}>
               <ScrollView 
                 style={styles.dropdownScrollView}
                 showsVerticalScrollIndicator={true}
                 nestedScrollEnabled={true}
                 keyboardShouldPersistTaps="handled"
               >
                 {MUNICIPALITIES.map((municipality) => (
                   <TouchableOpacity
                     key={municipality}
                     style={styles.dropdownItem}
                     onPress={() => handleMunicipalitySelect(municipality)}
                     activeOpacity={0.6}
                   >
                     <Text style={styles.dropdownItemText}>{municipality}</Text>
                   </TouchableOpacity>
                 ))}
               </ScrollView>
             </View>
           )}
        </View>

        {/* Barangay Dropdown */}
        <View style={[styles.inputContainer, styles.barangayInputContainer]}>
          <Text style={styles.label}>Barangay</Text>
          <TouchableOpacity
            style={[styles.dropdown, (!profile.municipality || availableBarangays.length === 0) && styles.disabledDropdown]}
            onPress={() => {
              if (profile.municipality && availableBarangays.length > 0) {
                setShowBarangayDropdown(!showBarangayDropdown);
                // Close municipality dropdown if open
                if (showMunicipalityDropdown) {
                  setShowMunicipalityDropdown(false);
                }
              } else if (!profile.municipality) {
                Alert.alert('Select Municipality First', 'Please select a municipality before selecting a barangay.');
              } else if (availableBarangays.length === 0) {
                Alert.alert('No Barangays', 'No barangays available for the selected municipality.');
              }
            }}
            activeOpacity={(profile.municipality && availableBarangays.length > 0) ? 0.7 : 1}
          >
            <Text style={[styles.dropdownText, !profile.barangay && styles.placeholder, (!profile.municipality || availableBarangays.length === 0) && styles.disabledText]}>
              {profile.barangay || 'Select your barangay'}
            </Text>
            <IconSymbol 
              name={showBarangayDropdown ? "chevron.up" : "chevron.down"} 
              size={20} 
              color={(profile.municipality && availableBarangays.length > 0) ? "#666" : "#CCCCCC"} 
            />
          </TouchableOpacity>
           {showBarangayDropdown && availableBarangays.length > 0 && (
             <View style={styles.barangayDropdownList}>
               <ScrollView 
                 style={styles.dropdownScrollView}
                 showsVerticalScrollIndicator={true}
                 nestedScrollEnabled={true}
                 keyboardShouldPersistTaps="handled"
               >
                 {availableBarangays.map((barangay) => (
                   <TouchableOpacity
                     key={barangay}
                     style={styles.dropdownItem}
                     onPress={() => handleBarangaySelect(barangay)}
                     activeOpacity={0.6}
                   >
                     <Text style={styles.dropdownItemText}>{barangay}</Text>
                   </TouchableOpacity>
                 ))}
               </ScrollView>
             </View>
           )}
        </View>
        </Animated.View>

        {/* Proceed Button */}
        <Animated.View style={{
          opacity: buttonOpacity,
          transform: [{ translateY: buttonTranslateY }],
          marginTop: buttonMarginTop,
        }}>
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
            <Text style={styles.proceedButtonText}>Proceed</Text>
            <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom padding for bounce effect */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  topPadding: {
    height: 50,
  },
  bottomPadding: {
    height: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#0000',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginHorizontal: -20,
    marginTop: -20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 12,
    position: 'relative',
  },
  barangayInputContainer: {
    marginTop: 4,
    zIndex: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  disabledDropdown: {
    backgroundColor: '#F5F5F5',
    borderColor: '#CCCCCC',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
  },
  placeholder: {
    color: '#999999',
  },
  disabledText: {
    color: '#CCCCCC',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownScrollView: {
    maxHeight: 200,
  },
  barangayDropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 160,
    zIndex: 2000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    minHeight: 44,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000000',
  },
  dropdownItemPressed: {
    backgroundColor: 'rgba(245, 75, 42, 0.1)',
  },
  proceedButton: {
    backgroundColor: '#F54B2A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});
