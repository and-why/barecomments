import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: process.env.NEXT_PUBLIC_PROJECT_ID
    }),
    databaseURL: 'fastfeedback-c9328.firebaseapp.com'
  });
}

export default admin.firestore();
