import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState : { files : any[], links : any[] } =
  {
    files: [],
    links: []
  };

export const dropboxSlice = createSlice({
  name: 'dropboxFiles',
  initialState,
  reducers: {
    setFiles: (state, { payload } : PayloadAction<any[]>) => {
      state.files = payload;
    },
    setLinks: (state, { payload } : PayloadAction<any[]>) => {
      state.links = payload;
    },
    addLink: (state, { payload } : PayloadAction<any>) => {
      state.links.push(payload);
    },
  }
});

export const {
  setFiles,
  setLinks,
  addLink
} = dropboxSlice.actions;