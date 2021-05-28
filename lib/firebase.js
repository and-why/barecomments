import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: 'fastfeedback-c9328.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID
  });
}

export function firestore() {
  return firebase.firestore();
}

export default firebase;
