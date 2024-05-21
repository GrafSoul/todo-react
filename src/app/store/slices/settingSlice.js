import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  updateUserName,
  updateUserEmail,
  updateUserPassword,
} from "@services/settingService";

import {
  SETTINGS_UPDATE_NAME,
  SETTINGS_UPDATE_EMAIL,
  SETTINGS_UPDATE_PASSWORD,
} from "@store/types/actionTypes";

import { Statuses } from "../statuses/statuses";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: Statuses.IDLE,
  error: null,
};

export const updateName = createAsyncThunk(
  SETTINGS_UPDATE_NAME,
  async (newName, thunkAPI) => {
    try {
      const user = await updateUserName(newName);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateEmail = createAsyncThunk(
  SETTINGS_UPDATE_EMAIL,
  async ({ newEmail, password }, thunkAPI) => {
    try {
      const user = await updateUserEmail(newEmail, password);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  SETTINGS_UPDATE_PASSWORD,
  async ({ currentPassword, newPassword }, thunkAPI) => {
    try {
      await updateUserPassword(currentPassword, newPassword);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    resetSettingsState: (state) => {
      state.user = null;
      state.status = Statuses.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateName.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(updateName.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload;
      })
      .addCase(updateEmail.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = Statuses.SUCCEEDED;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload;
      });
  },
});

export const { resetSettingsState } = settingsSlice.actions;

export default settingsSlice.reducer;
