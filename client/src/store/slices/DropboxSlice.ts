import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileEntry } from '../../interfaces/FileEntry';

const initialState : { files : FileEntry[], updated : boolean} =
  {
    files: [],
    updated: false
  };

export const dropboxSlice = createSlice({
  name: 'dropboxFiles',
  initialState,
  reducers: {
    addFile: (state, { payload } : PayloadAction<FileEntry>) => {
      const i = state.files.findIndex((file : FileEntry) => file.id === payload.id);
      if (i < 0) {
        state.files.push(payload);
      }
      state.updated = true;
    },
    removeFile: (state, { payload } : PayloadAction<string>) => {
      const i = state.files.findIndex((file : FileEntry) => file.id === payload);
      if (i >= 0) {
        state.files.splice(i, 1);
      }
      state.updated = true;
    },
  }
});

export const {
  addFile,
  removeFile
} = dropboxSlice.actions;