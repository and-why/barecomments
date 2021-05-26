// already set up firebase so import that
import firebase from './firebase';

// create a firestore instance from our firebase instance to access firestore
const firestore = firebase.firestore();

// set up function to create a new a user
// takes in an id and their data
export function createUser(uid, data) {
  // call firestore - a collection is a typical table in firestore
  // set the user on the document
  // doc uid creates an id based on the document uid
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  const site = firestore.collection('sites').doc();
  site.set(data);
  return site;
}

export function createFeedback(data) {
  return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).delete();
}
