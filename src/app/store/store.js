import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import settingReducer from "./slices/settingSlice";
import usersReducer from "./slices/usersSlice";
import notesReducer from "./slices/notesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingReducer,
    users: usersReducer,
    notes: notesReducer,
  },
});

export default store;
