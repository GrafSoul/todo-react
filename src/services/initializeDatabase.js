/* eslint-disable no-undef */
// initializeDatabase.js

import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_APP_API_KEY,
  authDomain: process.env.VITE_APP_AUTH_DOMAIN,
  projectId: process.env.VITE_APP_PROJECT_ID,
  storageBucket: process.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_APP_MESSEGING_SENDER_ID,
  appId: process.env.VITE_APP_APP_ID,
  databaseURL: process.env.VITE_APP_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const initializeDatabase = async () => {
  const initialData = {
    monday: { id: 1, title: "monday", label: "Пн", notes: [] },
    tuesday: { id: 2, title: "tuesday", label: "Вт", notes: [] },
    wednesday: { id: 3, title: "wednesday", label: "Ср", notes: [] },
    thursday: { id: 4, title: "thursday", label: "Чт", notes: [] },
    friday: { id: 5, title: "friday", label: "Пт", notes: [] },
    saturday: { id: 6, title: "saturday", label: "Суб", notes: [] },
    sunday: { id: 7, title: "sunday", label: "Вос", notes: [] },
  };
  const dbRef = ref(database, "notes/");
  await update(dbRef, initialData);
  console.log("Database initialized with initial structure");
  process.exit(0);
};

initializeDatabase();
