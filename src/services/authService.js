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
