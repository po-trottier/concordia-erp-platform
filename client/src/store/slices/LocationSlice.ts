import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState : { selected : string } =
  {
    selected: 'Default Location',
  };

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<string>) => {
      state.selected = payload;
    },
  }
});

export const {
  setList: setSelectedLocation,
} = locationSlice.actions;
