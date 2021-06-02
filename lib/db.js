// already set up firebase so import that
import firebase from './firebase';
import getStripe from './stripe';

// create a firestore instance from our firebase instance to access firestore
const firestore = firebase.firestore();
const app = firebase.app();
// set up function to create a new a user
// takes in an id and their data
export function createUser(uid, data) {
  // call firestore - a collection is a typical table in firestore
  // set the user on the document§
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
export function updateFeedback(id, status) {
  return firestore.collection('feedback').doc(id).update(status);
}
export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).update({ status: 'removed' });
}

export async function deleteSite(id) {
  firestore.collection('sites').doc(id).delete();

  const snapshot = await firestore
    .collection('feedback')
    .where('siteId', '==', id)
    .get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export async function updateSite(id, newValues) {
  return firestore.collection('sites').doc(id).update(newValues);
}

// STRIPE:
export const createCheckoutSession = async (uid) => {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: process.env.NEXT_PUBLIC_STRIPE_PRICE,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });
  // Wait for the CheckoutSession to get attached by the extension
  checkoutSessionRef.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data();
    if (error) {
      // Show an error to your customer and
      // inspect your Cloud Function logs in the Firebase console.
      alert(`An error occured: ${error.message}`);
    }
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
};

export const goToBillingPortal = async () => {
  const functionRef = app
    .functions('australia-southeast1')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/account`
  });
  window.location.assign(data.url);
};
