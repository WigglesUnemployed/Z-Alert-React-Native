import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <IconSymbol name="person.circle" size={24} color="#000" />
        </TouchableOpacity>
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
              <ThemedView style={styles.buttonIcon}>
                <IconSymbol name="shield" size={32} color="#FF0000" />
              </ThemedView>
              <ThemedText style={styles.buttonText}>Police</ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Fire Button */}
          <TouchableOpacity style={styles.emergencyButton} onPress={() => alert('Fire department contacted')}>
            <ThemedView style={styles.buttonIcon}>
              <IconSymbol name="flame" size={32} color="#FF6600" />
            </ThemedView>
            <ThemedText style={styles.buttonText}>Fire</ThemedText>
          </TouchableOpacity>

          {/* Medical Button */}
          <TouchableOpacity style={styles.emergencyButton} onPress={() => alert('Medical services contacted')}>
            <ThemedView style={styles.buttonIcon}>
              <IconSymbol name="cross.case" size={32} color="#0066FF" />
            </ThemedView>
            <ThemedText style={styles.buttonText}>Medical</ThemedText>
          </TouchableOpacity>

          {/* Rescue Button */}
          <TouchableOpacity style={styles.emergencyButton} onPress={() => alert('Rescue services contacted')}>
            <ThemedView style={styles.buttonIcon}>
              <IconSymbol name="figure.walk" size={32} color="#006600" />
            </ThemedView>
            <ThemedText style={styles.buttonText}>Rescue</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Categories Button */}
      <ThemedView style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoriesButton} onPress={() => alert('Categories opened')}>
          <ThemedView style={styles.categoriesIcon}>
            <IconSymbol name="folder" size={24} color="#000" />
          </ThemedView>
          <ThemedText style={styles.categoriesText}>Categories</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ThemedView>
  );
}

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
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerIcon: {
    padding: 10,
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
