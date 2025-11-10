"use client";

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirebaseStorage } from "@/lib/firebase";

export const uploadImage = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, path);
    
    // Upload file
    await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
};

export const uploadProductImage = async (
  file: File,
  productId: string,
  imageType: "primary" | "hover" | "gallery" | "lifestyle" | "variant"
): Promise<string> => {
  const timestamp = Date.now();
  const fileExtension = file.name.split(".").pop();
  const fileName = `${imageType}-${timestamp}.${fileExtension}`;
  const path = `products/${productId}/${fileName}`;
  
  return uploadImage(file, path);
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    const storage = getFirebaseStorage();
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    // Don't throw - image might not exist or already be deleted
  }
};


