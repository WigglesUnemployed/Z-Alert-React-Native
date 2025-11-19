// Lightweight Firebase initializer for Expo (web JS SDK, modular v9+)
// Usage:
// 1. Create a Firebase Web app in the Firebase console and copy the config object.
// 2. Call `initFirebase(firebaseConfig)` once at app startup (e.g. in app/_layout.tsx).
// 3. Import `auth` and `db` from this module anywhere in your app.

import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { doc, getFirestore, setDoc, type Firestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

/**
 * Initialize Firebase with a Firebase Web SDK config.
 * Safe to call multiple times; this returns the existing app if already initialized.
 * @param config Firebase config (from Firebase console -> web app)
 */
export function initFirebase(config: FirebaseOptions) {
  if (!getApps().length) {
    firebaseApp = initializeApp(config);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
  } else {
    firebaseApp = getApps()[0];
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
  }

  return { app: firebaseApp, auth, db } as const;
}

/**
 * Save user data as a new field in the specified document
 * @param docId The document ID (e.g., 'vTMoPRr4fPMUrpjoRPNs')
 * @param userId The user ID (will be used as field name)
 * @param userData The user data object (age, sex, municipality, barangay)
 */
export async function saveUserDataToDocument(
  docId: string,
  userId: number,
  userData: { age: number; sex: string; municipality: string; barangay: string }
): Promise<string> {
  if (!db) {
    console.warn('⚠ Firestore database not initialized');
    throw new Error('Firestore not initialized');
  }

  try {
    const docRef = doc(db, 'users_data', docId);
    
    // Create a field name using the userId
    const fieldName = `user_${userId}`;
    
    // Update the document with the new user data field
    await setDoc(docRef, {
      [fieldName]: {
        ...userData,
        userId: userId,
        createdAt: new Date(),
      },
    }, { merge: true });
    
    console.log('✓ Data saved to document', docId, 'with field:', fieldName);
    return docId;
  } catch (error) {
    console.error('✗ Error saving user data:', error);
    throw error;
  }
}

/**
 * Get the next incrementing user ID
 * @returns The next user ID (number)
 */
export async function getNextUserId(): Promise<number> {
  // For now, return a simple incremented value
  // In production, you might want to query an existing document for the latest ID
  const timestamp = Date.now();
  return Math.floor(timestamp / 1000);
}

export { auth, db, firebaseApp };

