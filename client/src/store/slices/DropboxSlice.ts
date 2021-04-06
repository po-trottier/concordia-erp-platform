import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaterialEntry } from '../../interfaces/MaterialEntry';

const initialState : { files : any[] } =
  {
    files: [],
  };

export const dropboxSlice = createSlice({
  name: 'dropboxFiles',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<any[]>) => {
      state.files = payload;
    }
  }
});

export const {
  setList: setFiles,
} = dropboxSlice.actions;