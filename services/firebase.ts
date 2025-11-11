// Lightweight Firebase initializer for Expo (web JS SDK, modular v9+)
// Usage:
// 1. Create a Firebase Web app in the Firebase console and copy the config object.
// 2. Call `initFirebase(firebaseConfig)` once at app startup (e.g. in app/_layout.tsx).
// 3. Import `auth` and `db` from this module anywhere in your app.

import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

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

export { auth, db, firebaseApp };

// Note:
// - For an Expo-managed app, the JS Firebase SDK works well for Auth, Firestore, Storage, and basic features.
// - If you need advanced native functionality (native FCM for background notifications, Crashlytics, etc.),
//   consider react-native-firebase which requires a bare workflow and native files (google-services.json / Info.plist).
