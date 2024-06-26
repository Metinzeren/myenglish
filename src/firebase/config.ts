// firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseAuth from 'firebase/auth';

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const firebaseConfig = {
  apiKey: 'AIzaSyBOqyURyaTZySJrn64Solnh01ZBjUdLDkI',
  authDomain: 'my-teacher-553bb.firebaseapp.com',
  projectId: 'my-teacher-553bb',
  storageBucket: 'my-teacher-553bb.appspot.com',
  messagingSenderId: '53633082621',
  appId: '1:53633082621:web:e878efe13877d5da858a94',
  measurementId: 'G-RML9LCRBGJ',
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage),
});

export { db, auth };
