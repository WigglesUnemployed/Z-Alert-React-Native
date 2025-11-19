import { db, getNextUserId } from '@/services/firebase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FirebaseTestScreen() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const sendTestData = async () => {
      addLog('🔄 Auto-sending test data to Firestore...');

      if (!db) {
        addLog('❌ Firestore not initialized!');
        return;
      }

      try {
        addLog('✅ Firestore instance found');
        
        addLog('📝 Getting next user ID...');
        const userId = await getNextUserId();
        addLog(`✅ Got userId: ${userId}`);

        addLog('💾 Saving test data to user_data collection...');
        const docRef = await addDoc(collection(db, 'user_data'), {
          userId: userId,
          sex: 'Test',
          age: 40,
          municipality: 'Test Municipality',
          barangay: 'Test Barangay',
          createdAt: new Date(),
          testData: true,
        });

        addLog(`✅ Data saved successfully!`);
        addLog(`📄 Document ID: ${docRef.id}`);
        addLog('🎉 Firebase connection is working!');
      } catch (error: any) {
        addLog(`❌ Error: ${error.message}`);
        addLog(`Details: ${error.code}`);
      }
    };

    sendTestData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Firebase Auto Test</Text>
      
      <ScrollView style={styles.logsBox}>
        {logs.length === 0 ? (
          <Text style={styles.emptyLog}>Sending data...</Text>
        ) : (
          logs.map((log, index) => (
            <Text key={index} style={styles.logText}>
              {log}
            </Text>
          ))
        )}
      </ScrollView>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ℹ️ What's happening:</Text>
        <Text style={styles.infoText}>• Automatically sending test data with age: 40</Text>
        <Text style={styles.infoText}>• Check Firebase Console → user_data collection</Text>
        <Text style={styles.infoText}>• Should see a new document appear</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  logsBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  logText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Courier New',
  },
  emptyLog: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#0d47a1',
    marginBottom: 4,
  },
});
