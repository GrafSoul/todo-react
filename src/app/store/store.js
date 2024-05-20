import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import settingReducer from "./slices/settingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingReducer,
  },
});

export default store;
