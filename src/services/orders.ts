'use client';

import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";

export type PaymentMethod = "card" | "upi" | "cod";

export interface OrderEntry {
  id: string;
  createdAt: string; // ISO
  paid: boolean;
  paymentMethod: PaymentMethod;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

const COLLECTION_NAME = "orders";

const ordersConverter: FirestoreDataConverter<OrderEntry> = {
  toFirestore: (data) => JSON.parse(JSON.stringify(data)),
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as OrderEntry,
};

const getOrdersCollection = () =>
  collection(getFirestoreDb(), COLLECTION_NAME).withConverter(ordersConverter);

export const addOrder = async (order: Omit<OrderEntry, "id">) => {
  const id = crypto.randomUUID();
  await setDoc(doc(getOrdersCollection(), id), { ...order, id });
  return id;
};

export const subscribeToOrders = (
  onChange: (orders: OrderEntry[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe => {
  try {
    return onSnapshot(
      getOrdersCollection(),
      (snapshot) => {
        const orders = snapshot.docs.map((d) => d.data());
        onChange(orders);
      },
      (error) => onError?.(error as Error),
    );
  } catch (e) {
    onError?.(e as Error);
    return () => {};
  }
};

export const setOrderPaid = async (orderId: string, paid: boolean) => {
  await updateDoc(doc(getOrdersCollection(), orderId), { paid });
};


