import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, login, resetPassword, logout } from "@services/authService";
import { resetSettingsState } from "./settingSlice";

import {
  AUTH_REGISTER_USER,
  AUTH_LOGIN_USER,
  AUTH_RESET_PASSWORD,
  AUTH_LOGOUT_USER,
} from "@store/types/actionTypes";

import { Statuses } from "../statuses/statuses";

const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const registerUser = createAsyncThunk(
  AUTH_REGISTER_USER,
  async ({ email, password, displayName }, thunkAPI) => {
    try {
      const user = await register(email, password, displayName);
      saveUserToLocalStorage(user);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  AUTH_LOGIN_USER,
  async ({ email, password }, thunkAPI) => {
    try {
      const user = await login(email, password);
      saveUserToLocalStorage(user);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  AUTH_RESET_PASSWORD,
  async ({ email }, thunkAPI) => {
    try {
      await resetPassword(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  AUTH_LOGOUT_USER,
  async (_, thunkAPI) => {
    try {
      await logout();
      removeUserFromLocalStorage();
      thunkAPI.dispatch(resetUserState());
      thunkAPI.dispatch(resetSettingsState());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    status: Statuses.IDLE,
    error: null,
  },
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.status = Statuses.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload;
      })
      .addCase(resetUserPassword.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.status = Statuses.SUCCEEDED;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = Statuses.SUCCEEDED;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload;
      });
  },
});

export const { resetUserState } = authSlice.actions;

export default authSlice.reducer;
