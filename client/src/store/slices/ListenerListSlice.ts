import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventEntry } from '../../interfaces/EventEntry';

const initialState : { list : EventEntry[] } =
  {
    list: [],
  };

export const listenerListSlice = createSlice({
  name: 'listenerList',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<EventEntry[]>) => {
      state.list = payload;
    },
    updateEntry: (state, { payload } : PayloadAction<{ id : string, newListener : EventEntry }>) => {
      const i = state.list.findIndex(f => f._id === payload.id);
      if (i >= 0) {
        state.list[i] = payload.newListener;
      }
    },
    addEntry: (state, { payload } : PayloadAction<EventEntry>) => {
      state.list.push(payload);
    },
    removeEntry: (state, { payload } : PayloadAction<string>) => {
      const i = state.list.findIndex(f => f._id === payload);
      if (i >= 0) {
        state.list.splice(i, 1);
      }
    },
  }
});

export const {
  setList: setListenerList,
  updateEntry: updateListenerEntry,
  addEntry: addListenerEntry,
  removeEntry: removeListenerEntry,
} = listenerListSlice.actions;