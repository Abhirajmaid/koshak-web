"use client";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

export const loginAdmin = async (email: string, password: string): Promise<User> => {
  try {
    const auth = getFirebaseAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Login error:", error);
    
    // Provide user-friendly error messages
    let errorMessage = "Failed to sign in. Please try again.";
    
    if (error.code === "auth/user-not-found") {
      errorMessage = "No account found with this email address.";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Incorrect password. Please try again.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address.";
    } else if (error.code === "auth/user-disabled") {
      errorMessage = "This account has been disabled.";
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Too many failed attempts. Please try again later.";
    } else if (error.code === "auth/network-request-failed") {
      errorMessage = "Network error. Please check your connection.";
    }
    
    throw new Error(errorMessage);
  }
};

export const signOutAdmin = async (): Promise<void> => {
  try {
    const auth = getFirebaseAuth();
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
    throw new Error("Failed to sign out. Please try again.");
  }
};

export const createAdminAccount = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const auth = getFirebaseAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Sign up error:", error);
    
    let errorMessage = "Failed to create account. Please try again.";
    
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "An account with this email already exists.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password should be at least 6 characters.";
    } else if (error.code === "auth/network-request-failed") {
      errorMessage = "Network error. Please check your connection.";
    }
    
    throw new Error(errorMessage);
  }
};

export const getCurrentUser = (): User | null => {
  const auth = getFirebaseAuth();
  return auth.currentUser;
};

export const onAuthStateChange = (
  callback: (user: User | null) => void
): (() => void) => {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
};




