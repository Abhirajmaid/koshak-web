"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  increment,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";

const ANALYTICS_COLLECTION = "analytics";
const WEBSITE_ANALYTICS_DOC = "website";

export interface WebsiteAnalytics {
  totalViews: number;
  clickThroughRate: number;
  conversionRate: number;
  totalClicks: number;
  totalConversions: number;
  lastUpdated: string;
}

const defaultAnalytics: WebsiteAnalytics = {
  totalViews: 0,
  clickThroughRate: 0,
  conversionRate: 0,
  totalClicks: 0,
  totalConversions: 0,
  lastUpdated: new Date().toISOString(),
};

export const getWebsiteAnalytics = async (): Promise<WebsiteAnalytics> => {
  try {
    const db = getFirestoreDb();
    const docRef = doc(db, ANALYTICS_COLLECTION, WEBSITE_ANALYTICS_DOC);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return snapshot.data() as WebsiteAnalytics;
    }

    // Initialize with default values if doesn't exist
    await setDoc(docRef, defaultAnalytics);
    return defaultAnalytics;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return defaultAnalytics;
  }
};

export const subscribeToWebsiteAnalytics = (
  onChange: (analytics: WebsiteAnalytics) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  try {
    const db = getFirestoreDb();
    const docRef = doc(db, ANALYTICS_COLLECTION, WEBSITE_ANALYTICS_DOC);

    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          onChange(snapshot.data() as WebsiteAnalytics);
        } else {
          onChange(defaultAnalytics);
        }
      },
      (error) => {
        console.error("Error subscribing to analytics:", error);
        onError?.(error as Error);
      }
    );
  } catch (error) {
    console.error("Error setting up analytics subscription:", error);
    onError?.(error as Error);
    return () => {};
  }
};

export const incrementView = async (): Promise<void> => {
  try {
    const db = getFirestoreDb();
    const docRef = doc(db, ANALYTICS_COLLECTION, WEBSITE_ANALYTICS_DOC);
    const snapshot = await getDoc(docRef);
    
    if (snapshot.exists()) {
      await setDoc(
        docRef,
        {
          totalViews: increment(1),
          lastUpdated: new Date().toISOString(),
        },
        { merge: true }
      );
    } else {
      await setDoc(docRef, {
        ...defaultAnalytics,
        totalViews: 1,
        lastUpdated: new Date().toISOString(),
      });
    }

    // Recalculate rates
    await updateRates();
  } catch (error) {
    console.error("Error incrementing view:", error);
  }
};

export const incrementClick = async (): Promise<void> => {
  try {
    const db = getFirestoreDb();
    const docRef = doc(db, ANALYTICS_COLLECTION, WEBSITE_ANALYTICS_DOC);
    const snapshot = await getDoc(docRef);
    
    if (snapshot.exists()) {
      await setDoc(
        docRef,
        {
          totalClicks: increment(1),
          lastUpdated: new Date().toISOString(),
        },
        { merge: true }
      );
    } else {
      await setDoc(docRef, {
        ...defaultAnalytics,
        totalClicks: 1,
        lastUpdated: new Date().toISOString(),
      });
    }

    // Recalculate rates
    await updateRates();
  } catch (error) {
    console.error("Error incrementing click:", error);
  }
};

export const incrementConversion = async (): Promise<void> => {
  try {
    const db = getFirestoreDb();
    const docRef = doc(db, ANALYTICS_COLLECTION, WEBSITE_ANALYTICS_DOC);
    const snapshot = await getDoc(docRef);
    
    if (snapshot.exists()) {
      await setDoc(
        docRef,
        {
          totalConversions: increment(1),
          lastUpdated: new Date().toISOString(),
        },
        { merge: true }
      );
    } else {
      await setDoc(docRef, {
        ...defaultAnalytics,
        totalConversions: 1,
        lastUpdated: new Date().toISOString(),
      });
    }

    // Recalculate rates
    await updateRates();
  } catch (error) {
    console.error("Error incrementing conversion:", error);
  }
};

const updateRates = async (): Promise<void> => {
  try {
    const analytics = await getWebsiteAnalytics();
    const clickThroughRate =
      analytics.totalViews > 0
        ? (analytics.totalClicks / analytics.totalViews) * 100
        : 0;
    const conversionRate =
      analytics.totalViews > 0
        ? (analytics.totalConversions / analytics.totalViews) * 100
        : 0;

    const db = getFirestoreDb();
    const docRef = doc(db, ANALYTICS_COLLECTION, WEBSITE_ANALYTICS_DOC);
    
    await setDoc(
      docRef,
      {
        clickThroughRate: Number(clickThroughRate.toFixed(2)),
        conversionRate: Number(conversionRate.toFixed(2)),
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating rates:", error);
  }
};

