import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Firebase Admin using Service Account from Environment Variables
// We parse the JSON securely
let serviceAccount;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }
} catch (error) {
  console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT. Make sure it is a valid JSON string.");
}

if (serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} else {
    console.warn("FIREBASE_SERVICE_ACCOUNT not found. Firebase Admin is not initialized.");
    // Optional fallback or default initialization if using Google Cloud environments:
    // admin.initializeApp(); 
}

export const db = admin.apps.length ? admin.firestore() : null;
export const auth = admin.apps.length ? admin.auth() : null;
export default admin;
