/* eslint-disable no-useless-catch */

import { auth, database } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";

import { ref, set, get, child } from "firebase/database";

const initialData = [
  { id: 1, title: "monday", label: "Пн", notes: [] },
  { id: 2, title: "tuesday", label: "Вт", notes: [] },
  { id: 3, title: "wednesday", label: "Ср", notes: [] },
  { id: 4, title: "thursday", label: "Чт", notes: [] },
  { id: 5, title: "friday", label: "Пт", notes: [] },
  { id: 6, title: "saturday", label: "Суб", notes: [] },
  { id: 7, title: "sunday", label: "Вос", notes: [] },
];

export const register = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "users"));
    const isAdmin = !snapshot.exists();

    const role = isAdmin ? "admin" : "user";

    await set(ref(database, `users/${user.uid}`), {
      id: user.uid,
      displayName,
      email,
      role,
    });

    await set(ref(database, `users/${user.uid}/notes`), initialData);

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: role,
    };
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const dbRef = ref(database);
    const userSnapshot = await get(child(dbRef, `users/${user.uid}`));
    const userData = userSnapshot.val();

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: userData.role,
    };
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
