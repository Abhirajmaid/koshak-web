"use client";

import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK8Rt_ywAyrGTrTJ1-CyXxYUbFeaj7qIQ",
  authDomain: "koshak-3f519.firebaseapp.com",
  projectId: "koshak-3f519",
  storageBucket: "koshak-3f519.firebasestorage.app",
  messagingSenderId: "527183051767",
  appId: "1:527183051767:web:6248cd8ef22eaf385a0cf2",
  measurementId: "G-P71XY1G1BV",
};

let app: FirebaseApp | undefined;
let firestore: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let auth: Auth | undefined;

export const getFirebaseApp = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    if (typeof window !== "undefined") {
      try {
        getAnalytics(app);
      } catch (error) {
        console.warn("Firebase analytics not available:", error);
      }
    }
  }

  return app;
};

export const getFirestoreDb = () => {
  if (!firestore) {
    const firebaseApp = getFirebaseApp();
    firestore = getFirestore(firebaseApp);
  }

  return firestore;
};

export const getFirebaseStorage = () => {
  if (!storage) {
    const firebaseApp = getFirebaseApp();
    storage = getStorage(firebaseApp);
  }

  return storage;
};

export const getFirebaseAuth = () => {
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    auth = getAuth(firebaseApp);
  }

  return auth;
};

