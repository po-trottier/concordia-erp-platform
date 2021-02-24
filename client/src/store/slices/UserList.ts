import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntry } from '../../interfaces/UserEntry';

const initialState : { list : UserEntry[] } =
  {
    list: []
  };

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<UserEntry[]>) => {
      state.list = payload;
    },
    updateEntry: (state, { payload } : PayloadAction<{ username: string, newUser: UserEntry }>) => {
      for(let i = 0; i < state.list.length; i++) {
        if (state.list[i].username === payload.username)
          state.list[i] = payload.newUser;
      }
    },
    addEntry: (state, { payload } : PayloadAction<UserEntry>) => {
      state.list.push(payload);
    },
    removeEntry: (state, { payload } : PayloadAction<string>) => {
      let i = 0;
      for(i; i < state.list.length; i++) {
        if (state.list[i].username === payload)
          break;
      }
      if (i < state.list.length)
        state.list.splice(i, 1);
    },
  }
});

export const {
  setList: setUserList,
  updateEntry: updateUserEntry,
  addEntry: addUserEntry,
  removeEntry: removeUserEntry,
} = userListSlice.actions;