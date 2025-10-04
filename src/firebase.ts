// firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

const initializeFirebase = (): { app: FirebaseApp; db: Firestore } => {
  if (app && db) {
    return { app, db };
  }

  // Check if Firebase is already initialized
  if (getApps().length > 0) {
    app = getApp();
  } else {
    // Validate environment variables
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    // Check if all required config values are present
    const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);
    
    if (missingKeys.length > 0) {
      console.error('Missing Firebase environment variables:', missingKeys);
      console.error('Available environment variables:', {
        VITE_FIREBASE_API_KEY: !!import.meta.env.VITE_FIREBASE_API_KEY,
        VITE_FIREBASE_AUTH_DOMAIN: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        VITE_FIREBASE_PROJECT_ID: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
        VITE_FIREBASE_STORAGE_BUCKET: !!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        VITE_FIREBASE_MESSAGING_SENDER_ID: !!import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        VITE_FIREBASE_APP_ID: !!import.meta.env.VITE_FIREBASE_APP_ID,
      });
      throw new Error(`Missing Firebase configuration: ${missingKeys.join(', ')}`);
    }

    console.log('Initializing Firebase with config:', {
      apiKey: firebaseConfig.apiKey ? '***' : 'MISSING',
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
      appId: firebaseConfig.appId
    });

    app = initializeApp(firebaseConfig);
  }

  db = getFirestore(app);
  return { app, db };
};

// Lazy initialization - only initialize when first accessed
export const getFirebaseApp = (): FirebaseApp => {
  const { app } = initializeFirebase();
  return app;
};

export const getFirebaseDB = (): Firestore => {
  const { db } = initializeFirebase();
  return db;
};

// For backward compatibility
export { getFirebaseDB as db };
