import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'navigation',
  initialState: {
    collapsed: false,
  },
  reducers: {
    toggle: state => {
      state.collapsed = !state.collapsed;
    }
  }
});

export const { toggle } = counterSlice.actions;

export default counterSlice.reducer;
