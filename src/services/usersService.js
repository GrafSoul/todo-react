// usersService.js
import { database } from "./firebase";
import { ref, get } from "firebase/database";

export const getUsers = async () => {
  const usersRef = ref(database, "users");
  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};
