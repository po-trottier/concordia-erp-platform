import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PartEntry } from '../../interfaces/PartEntry';

const initialState : { list : PartEntry[], updated: boolean } =
  {
    list: [],
    updated: false,
  };

export const partListSlice = createSlice({
  name: 'partList',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<PartEntry[]>) => {
      state.list = payload;
      state.updated = true;
    },
    updateEntry: (state, { payload } : PayloadAction<{ id : string, newPart : PartEntry }>) => {
      const i = state.list.findIndex(f => f.id === payload.id);
      if (i >= 0) {
        state.list[i] = payload.newPart;
      }
      state.updated = false;
    },
    addEntry: (state, { payload } : PayloadAction<PartEntry>) => {
      state.list.push(payload);
      state.updated = false;
    },
    removeEntry: (state, { payload } : PayloadAction<string>) => {
      const i = state.list.findIndex(f => f.id === payload);
      if (i >= 0) {
        state.list.splice(i, 1);
      }
      state.updated = false;
    },
  }
});

export const {
  setList: setPartList,
  updateEntry: updatePartEntry,
  addEntry: addPartEntry,
  removeEntry: removePartEntry,
} = partListSlice.actions;