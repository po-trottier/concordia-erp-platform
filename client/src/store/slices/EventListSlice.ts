import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventEntry {
  id: string,
  name: string,
}

const initialState : { list : EventEntry[] } =
  {
    list: [],
  };

export const eventListSlice = createSlice({
  name: 'eventList',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<EventEntry[]>) => {
      state.list = payload;
    },
    updateEntry: (state, { payload } : PayloadAction<{ id : string, newEvent : EventEntry }>) => {
      const i = state.list.findIndex(f => f.id === payload.id);
      if (i >= 0) {
        state.list[i] = payload.newEvent;
      }
    },
    addEntry: (state, { payload } : PayloadAction<EventEntry>) => {
      state.list.push(payload);
    },
    removeEntry: (state, { payload } : PayloadAction<string>) => {
      const i = state.list.findIndex(f => f.id === payload);
      if (i >= 0) {
        state.list.splice(i, 1);
      }
    },
  }
});

export const {
  setList: setEventList,
  updateEntry: updateEventEntry,
  addEntry: addEventEntry,
  removeEntry: removeEventEntry,
} = eventListSlice.actions;