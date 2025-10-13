import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Link } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/z-alertlogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText style={styles.logoText}>Alert</ThemedText>
        </ThemedView>
        <TouchableOpacity style={styles.headerIcon}>
          <IconSymbol name="magnifyingglass" size={24} color="#000" />
        </TouchableOpacity>
      </ThemedView>

      {/* Main Question */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.mainTitle}>
          What is your emergency?
        </ThemedText>
      </ThemedView>

      {/* Assistance Section */}
      <ThemedView style={styles.assistanceContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Assistance
        </ThemedText>
        
        <ThemedView style={styles.buttonsGrid}>
          {/* Police Button */}
          <Link href="/police" asChild>
            <TouchableOpacity style={styles.emergencyButton}>
              <IconSymbol name="shield" size={32} color="#FF0000" style={styles.buttonIcon} />
              <ThemedText style={styles.buttonText}>Police</ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Fire Button */}
          <Link href="/fire" asChild>
            <TouchableOpacity style={styles.emergencyButton}>
              <IconSymbol name="flame" size={32} color="#FF6600" style={styles.buttonIcon} />
              <ThemedText style={styles.buttonText}>Fire</ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Medical Button */}
          <Link href="/medical" asChild>
            <TouchableOpacity style={styles.emergencyButton}>
              <IconSymbol name="cross.case" size={32} color="#0066FF" style={styles.buttonIcon} />
              <ThemedText style={styles.buttonText}>Medical</ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Rescue Button */}
          <Link href="/rescue" asChild>
            <TouchableOpacity style={styles.emergencyButton}>
              <IconSymbol name="figure.walk" size={32} color="#006600" style={styles.buttonIcon} />
              <ThemedText style={styles.buttonText}>Rescue</ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>
      </ThemedView>

      {/* Categories Button */}
      <ThemedView style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoriesButton} onPress={() => alert('Categories opened')}>
          <IconSymbol name="folder" size={24} color="#000" style={styles.categoriesIcon} />
          <ThemedText style={styles.categoriesText}>Categories</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ThemedView>
  );
}
          {/* Container styles */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  headerIcon: {
    padding: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    paddingLeft: 115,
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 5,
    marginLeft: -5 ,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  assistanceContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000000',
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  emergencyButton: {
    backgroundColor: '#FFE4E6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '47%',
    minHeight: 120,
    justifyContent: 'center',
  },
  buttonIcon: {
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  categoriesButton: {
    backgroundColor: '#FFE4E6',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesIcon: {
    marginRight: 10,
  },
  categoriesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});
