import { get, ref, set, push, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "@services/firebase";

const auth = getAuth();
let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
  }
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    if (currentUser) {
      resolve(currentUser);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          reject("No user is signed in.");
        }
      });
    }
  });
};

export const getNotes = async () => {
  const user = await getCurrentUser();
  const notesRef = ref(database, `users/${user.uid}/notes`);
  const snapshot = await get(notesRef);
  const data = snapshot.val();

  if (!data) return {};

  const formattedData = {};
  Object.keys(data).forEach((dayKey) => {
    formattedData[dayKey] = {
      ...data[dayKey],
      notes: data[dayKey].notes
        ? Object.keys(data[dayKey].notes).map((key) => ({
            ...data[dayKey].notes[key],
            id: key,
          }))
        : [],
    };
  });
  return formattedData;
};

export const addNote = async (dayIndex, note) => {
  const user = await getCurrentUser();
  const notesRef = ref(database, `users/${user.uid}/notes/${dayIndex}/notes`);
  const newNoteRef = push(notesRef);
  await set(newNoteRef, { ...note, id: newNoteRef.key });
  return { ...note, id: newNoteRef.key };
};

export const updateNote = async (dayIndex, noteId, note) => {
  const user = await getCurrentUser();
  const noteRef = ref(
    database,
    `users/${user.uid}/notes/${dayIndex}/notes/${noteId}`
  );
  await set(noteRef, note);
};

export const deleteNote = async (dayIndex, noteId) => {
  const user = await getCurrentUser();
  const noteRef = ref(
    database,
    `users/${user.uid}/notes/${dayIndex}/notes/${noteId}`
  );
  await remove(noteRef);
};

export const clearNotes = async (dayIndex) => {
  const user = await getCurrentUser();
  const notesRef = ref(database, `users/${user.uid}/notes/${dayIndex}/notes`);
  await remove(notesRef);
};

export const clearNotesForDay = async (dayIndex) => {
  const user = await getCurrentUser();
  const notesRef = ref(database, `users/${user.uid}/notes/${dayIndex}/notes`);
  await remove(notesRef);
};

export const clearAllNotes = async () => {
  const user = await getCurrentUser();
  const notesRef = ref(database, `users/${user.uid}/notes`);
  const snapshot = await get(notesRef);
  const data = snapshot.val();

  if (data) {
    const dayKeys = ["0", "1", "2", "3", "4", "5", "6"];
    const promises = dayKeys.map((dayKey) =>
      remove(ref(database, `users/${user.uid}/notes/${dayKey}/notes`))
    );
    await Promise.all(promises);
  }
};

export const toggleNoteChecked = async (dayIndex, noteId, checked) => {
  const user = await getCurrentUser();
  const noteRef = ref(
    database,
    `users/${user.uid}/notes/${dayIndex}/notes/${noteId}/checked`
  );
  await set(noteRef, checked);
};
