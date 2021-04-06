import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaterialEntry } from '../../interfaces/MaterialEntry';

const initialState : { files : any[], updated : boolean } =
  {
    files: [],
    updated: false,
  };

export const dropboxSlice = createSlice({
  name: 'dropboxFiles',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<any[]>) => {
      state.files = payload;
      state.updated = false;
    },
    addEntry: (state, { payload } : PayloadAction<MaterialEntry>) => {
      state.files.push(payload);
      state.updated = true;
    },
    removeEntry: (state, { payload } : PayloadAction<string>) => {
      const i = state.files.findIndex(f => f.id === payload);
      if (i >= 0) {
        state.files.splice(i, 1);
      }
      state.updated = true;
    },
  }
});

export const {
  setList: setFiles,
  addEntry: addFile,
  removeEntry: removeFile,
} = dropboxSlice.actions;