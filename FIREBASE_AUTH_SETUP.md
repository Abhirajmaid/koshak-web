# Firebase Authentication Setup Guide

## Overview

The admin login page now uses Firebase Authentication for secure access. Only authenticated users with valid email and password can access the admin dashboard.

## Step 1: Enable Email/Password Authentication in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **koshak-3f519**
3. Click on "Authentication" in the left sidebar
4. Click on "Get started" (if not already enabled)
5. Click on the "Sign-in method" tab
6. Click on "Email/Password"
7. Enable the first toggle (Email/Password)
8. Click "Save"

## Step 2: Create Admin User Account

You have two options to create an admin account:

### Option A: Create Account via Firebase Console (Recommended for first admin)

1. In Firebase Console, go to "Authentication" → "Users" tab
2. Click "Add user"
3. Enter the admin email (e.g., `admin@koshak.in`)
4. Enter a secure password (at least 6 characters)
5. Click "Add user"
6. The account is now created and can be used to log in

### Option B: Create Account Programmatically (Future Enhancement)

You can add a sign-up feature to the admin login page if needed. For now, use Option A.

## Step 3: Test Login

1. Go to your admin page: `/admin`
2. Enter the email and password you created
3. Click "Enter Dashboard"
4. You should be logged in and see the admin dashboard

## Step 4: Update Firestore Security Rules (Optional but Recommended)

To secure your Firestore data based on authentication, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      // Allow anyone to read products (for public website)
      allow read: if true;
      
      // Only allow authenticated users to write
      allow write: if request.auth != null;
    }
    match /analytics/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 5: Update Storage Security Rules (Optional but Recommended)

To secure your Firebase Storage based on authentication:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{productId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Features

✅ **Secure Authentication**: Only users with valid Firebase accounts can access admin
✅ **Persistent Sessions**: Login persists across page refreshes
✅ **Automatic Logout**: Session expires based on Firebase Auth settings
✅ **Error Handling**: Clear error messages for invalid credentials
✅ **Real-time Auth State**: Automatically detects when user logs in/out

## Troubleshooting

### "No account found with this email address"
- Make sure you've created the user account in Firebase Console
- Check that Email/Password authentication is enabled

### "Incorrect password"
- Verify the password in Firebase Console
- You can reset the password from Firebase Console → Authentication → Users

### "Network error"
- Check your internet connection
- Verify Firebase project configuration

### Session not persisting
- Check browser settings (cookies/localStorage enabled)
- Clear browser cache and try again

## Managing Users

### Add New Admin User
1. Firebase Console → Authentication → Users
2. Click "Add user"
3. Enter email and password
4. User can now log in

### Reset Password
1. Firebase Console → Authentication → Users
2. Find the user
3. Click the three dots menu
4. Select "Reset password"
5. An email will be sent to the user

### Delete User
1. Firebase Console → Authentication → Users
2. Find the user
3. Click the three dots menu
4. Select "Delete user"

## Security Best Practices

1. **Use Strong Passwords**: Minimum 8 characters with mix of letters, numbers, and symbols
2. **Limit Admin Accounts**: Only create accounts for trusted administrators
3. **Enable 2FA** (Future): Consider enabling two-factor authentication for additional security
4. **Monitor Access**: Regularly check Authentication → Users for suspicious activity
5. **Update Rules**: Use authentication-based Firestore and Storage rules in production






