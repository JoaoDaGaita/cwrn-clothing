import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCzxdXcpDAGb_ENcSKCZ8gcR5GQb2IYuEQ",
  authDomain: "crwn-db-ae312.firebaseapp.com",
  databaseURL: "https://crwn-db-ae312.firebaseio.com",
  projectId: "crwn-db-ae312",
  storageBucket: "crwn-db-ae312.appspot.com",
  messagingSenderId: "802935573608",
  appId: "1:802935573608:web:06875b553f0f1741b9ffdd",
  measurementId: "G-3SFJC7RFM8",
};

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  console.log(userAuth);

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
