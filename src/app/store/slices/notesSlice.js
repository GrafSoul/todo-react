import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  clearNotes,
  clearNotesForDay,
  toggleNoteChecked,
  clearAllNotes,
} from "@services/notesService";

import {
  NOTES_ADD_NOTE,
  NOTES_UPDATE_NOTE,
  NOTES_DELETE_NOTE,
  NOTES_CHECKED_NOTE,
  NOTES_CLEAR_NOTES,
  NOTES_CLEAR_NOTES_FOR_DAY,
  NOTES_SET_NOTES,
  NOTES_CLEAR_ALL_NOTES,
} from "@store/types/actionTypes";

import { Statuses } from "@store/statuses/statuses";
export const fetchNotes = createAsyncThunk(NOTES_SET_NOTES, async () => {
  const notes = await getNotes();
  return notes;
});

export const addNoteAction = createAsyncThunk(
  NOTES_ADD_NOTE,
  async ({ day, note }) => {
    const newNote = await addNote(day, note);
    return { day, note: newNote };
  }
);

export const updateNoteAction = createAsyncThunk(
  NOTES_UPDATE_NOTE,
  async ({ day, noteId, note }) => {
    await updateNote(day, noteId, note);
    return { day, noteId, note };
  }
);

export const deleteNoteAction = createAsyncThunk(
  NOTES_DELETE_NOTE,
  async ({ day, noteId }) => {
    await deleteNote(day, noteId);
    return { day, noteId };
  }
);

export const clearNotesAction = createAsyncThunk(
  NOTES_CLEAR_NOTES,
  async ({ dayIndex }) => {
    await clearNotes(dayIndex);
    return { dayIndex };
  }
);

export const clearNotesForDayAction = createAsyncThunk(
  NOTES_CLEAR_NOTES_FOR_DAY,
  async ({ dayIndex }) => {
    await clearNotesForDay(dayIndex);
    return { dayIndex };
  }
);

export const clearAllNotesAction = createAsyncThunk(
  NOTES_CLEAR_ALL_NOTES,
  async () => {
    await clearAllNotes();
    return {};
  }
);

export const toggleNoteCheckedAction = createAsyncThunk(
  NOTES_CHECKED_NOTE,
  async ({ dayIndex, noteId, checked }) => {
    await toggleNoteChecked(dayIndex, noteId, checked);
    return { dayIndex, noteId, checked };
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    data: {},
    status: Statuses.IDLE,
    error: null,
    filter: "all",
    searchQuery: "",
  },
  reducers: {
    setNotes: (state, action) => {
      state.data = action.payload;
      state.status = Statuses.SUCCEEDED;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.error.message;
      })
      .addCase(addNoteAction.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        const { day, note } = action.payload;
        if (!state.data[day]) {
          state.data[day] = { notes: [] };
        }
        if (!state.data[day].notes) {
          state.data[day].notes = [];
        }
        state.data[day].notes.push(note);
      })
      .addCase(updateNoteAction.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        const { day, noteId, note } = action.payload;
        const dayNotes = state.data[day].notes;
        const index = dayNotes.findIndex((n) => n.id === noteId);
        if (index !== -1) {
          dayNotes[index] = note;
        }
      })
      .addCase(deleteNoteAction.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        const { day, noteId } = action.payload;
        state.data[day].notes = state.data[day].notes.filter(
          (note) => note.id !== noteId
        );
      })
      .addCase(clearNotesAction.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        const { dayIndex } = action.payload;
        state.data[dayIndex].notes = [];
      })
      .addCase(clearNotesForDayAction.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        const { dayIndex } = action.payload;
        state.data[dayIndex].notes = [];
      })
      .addCase(clearAllNotesAction.fulfilled, (state) => {
        state.status = Statuses.SUCCEEDED;
        const dayKeys = ["0", "1", "2", "3", "4", "5", "6"];
        dayKeys.forEach((dayKey) => {
          if (state.data[dayKey]) {
            state.data[dayKey].notes = [];
          }
        });
      })
      .addCase(toggleNoteCheckedAction.fulfilled, (state, action) => {
        const { dayIndex, noteId, checked } = action.payload;
        const dayNotes = state.data[dayIndex].notes;
        const note = dayNotes.find((note) => note.id === noteId);
        if (note) {
          note.checked = checked;
        }
      });
  },
});

export const { setNotes, setFilter, setSearchQuery } = notesSlice.actions;
export default notesSlice.reducer;
