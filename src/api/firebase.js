import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export function signUpWithEmail(email, password) {
  createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    console.log(`${error.code} : ${error.massage}`);
  });
}

export function signInWithEmail(email, password) {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    console.log(`${error.code} : ${error.massage}`);
  });
}

export function signInWithGoogle() {
  signInWithPopup(auth, provider).catch((error) => {
    console.log(`${error.code} : ${error.massage}`);
  });
}

export function signOutForUser() {
  if (window.confirm("Are you sure you want to Logout?")) {
    signOut(auth)
      .then(() => {
        alert("Sign-out successful");
      })
      .catch((error) => {
        console.log(`${error.code} : ${error.massage}`);
      });
  }
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const setUser = await callback(user);
  });
}

export async function addAgieet(agieet, userId) {
  return addDoc(collection(db, "agieets"), {
    text: agieet,
    createdAt: Date.now(),
    creatorId: userId,
  });
}

export async function deleteAgieet(userId) {
  return deleteDoc(doc(db, "agieets", userId));
}

export async function updateAgieet(userId, newAgieet) {
  return updateDoc(doc(db, "agieets", userId), {
    text: newAgieet,
  });
}

export async function get() {
  const docSnap = await getDocs(collection(db, "agieets"));
  let res = [];
  docSnap.forEach((doc) => {
    res.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  console.log("res >>>>>>>>>", res);
  return res;
}

export function getAgieetData() {
  // const q = query(collection(db, "agieets"), orderBy("createdAt", "desc"));

  const q = collection(db, "agieets");
  onSnapshot(q, (snapshot) => {
    const agieetArray = [];
    snapshot.forEach((doc) => {
      agieetArray.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log("agieetArray >>>>>>>>>", agieetArray);
    return agieetArray;
  });
}
