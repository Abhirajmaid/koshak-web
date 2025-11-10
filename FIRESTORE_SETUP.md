# Firestore Setup Instructions

## Important: Firestore Security Rules

For the admin dashboard to save data to Firebase, you need to configure Firestore security rules.

### Step 1: Go to Firebase Console
1. Visit https://console.firebase.google.com/
2. Select your project: **koshak-3f519**

### Step 2: Navigate to Firestore Database
1. Click on "Firestore Database" in the left sidebar
2. Click on the "Rules" tab

### Step 3: Set Security Rules

**For Development/Testing (Temporary - allows all reads/writes):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read, write: if true;
    }
  }
}
```

**For Production (Recommended - more secure):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      // Allow anyone to read products (for public website)
      allow read: if true;
      
      // Only allow authenticated admins to write
      // You'll need to implement Firebase Authentication first
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /analytics/{document=**} {
      // Allow anyone to read analytics (for public display)
      allow read: if true;
      
      // Only allow authenticated admins to write
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### Step 4: Publish Rules
1. Click "Publish" button after updating the rules
2. Wait a few seconds for rules to propagate

## Verify Setup

1. Open your browser's Developer Console (F12)
2. Try to save a product in the admin dashboard
3. Check the console for logs:
   - `upsertProductForm: Saving to Firestore:` - indicates save attempt
   - `upsertProductForm: Successfully saved to Firestore:` - indicates success
   - Any error messages will show what went wrong

## Troubleshooting

### If data still doesn't persist:
1. Check browser console for errors
2. Verify Firestore rules are published
3. Check Firebase Console > Firestore Database > Data tab to see if documents are being created
4. Ensure your Firebase project has Firestore enabled (not just Realtime Database)

### Common Errors:
- **Permission denied**: Security rules are blocking the operation
- **Network error**: Check internet connection
- **Collection doesn't exist**: Firestore will create it automatically on first write

## Firebase Storage Setup

For image uploads to work, you also need to configure Firebase Storage rules.

### Step 1: Navigate to Storage
1. In Firebase Console, click on "Storage" in the left sidebar
2. Click on the "Rules" tab

### Step 2: Set Storage Rules

**For Development/Testing:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{productId}/{allPaths=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

**For Production:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{productId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### Step 3: Publish Storage Rules
1. Click "Publish" button
2. Wait for rules to propagate

## Testing

After setting up rules, test by:
1. Creating a product in admin dashboard
2. Upload an image using the image upload feature
3. Check Firebase Console > Storage to see uploaded images
4. Check Firebase Console > Firestore Database > Data tab
5. You should see a `products` collection with your product document
6. Refresh the website - the product should still be there

