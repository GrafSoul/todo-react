// usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "@services/usersService";
import { USERS_GET_DATA } from "../types/actionTypes";
import { Statuses } from "../statuses/statuses";

export const getAllUsers = createAsyncThunk(USERS_GET_DATA, async () => {
  const users = await getUsers();
  return users;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: {},
    status: Statuses.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
