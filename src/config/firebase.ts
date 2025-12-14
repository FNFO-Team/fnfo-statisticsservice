// src/config/firebase.ts
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

/**
 * Inicialización de Firebase Admin SDK
 * Se hace una sola vez por proceso
 */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const firebaseAdmin = admin;
