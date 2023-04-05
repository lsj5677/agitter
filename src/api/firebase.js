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
  where,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
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
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
const storage = getStorage(app);

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

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (user.displayName === null) {
        const name = user.email.split("@")[0];
        user.displayName = name;
      }
    }
    callback(user);
  });
}

export function getAgieets(callback) {
  const q = query(collection(db, "agieets"), orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    const agieetArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(agieetArray);
  });
}

export async function getAgieet(userId) {
  const q = query(
    collection(db, "agieets"),
    where("creatorId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapShotQuery = await getDocs(q);
  return snapShotQuery.forEach((doc) => {
    // console.log(doc.id, "=>", doc.data());
  });
}

export async function addAgieet(agieet, userId, imageFile) {
  let resPhotoUrl = "";
  const storageRef = ref(storage, `${userId}/${uuid()}`);

  if (imageFile !== "") {
    const resPhoto = await uploadString(storageRef, imageFile, "data_url");
    resPhotoUrl = await getDownloadURL(resPhoto.ref);
  }

  return addDoc(collection(db, "agieets"), {
    text: agieet,
    createdAt: Date.now(),
    creatorId: userId,
    resPhotoUrl,
  });
}

export async function updateAgieet(userId, newAgieet) {
  return updateDoc(doc(db, "agieets", userId), {
    text: newAgieet,
  });
}

export async function deleteAgieet(userId, resPhotoUrl) {
  const delAgieet = await deleteDoc(doc(db, "agieets", userId));
  if (resPhotoUrl) {
    const delImage = await deleteObject(ref(storage, resPhotoUrl));
  }
}
