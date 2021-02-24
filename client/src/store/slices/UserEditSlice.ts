import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntry } from '../../interfaces/UserEntry';
import { Role } from '../../router/Roles';

const initialState : { selectedUser : UserEntry | undefined } =
  {
    selectedUser: undefined
  };

export const userEditSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setUser: (state, { payload } : PayloadAction<UserEntry>) => {
      state.selectedUser = {
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        role: payload.role,
      };
    },
    setUsername: (state, { payload } : PayloadAction<string>) => {
      if (state.selectedUser) {
        state.selectedUser.username = payload.trim().toLowerCase();
      }
    },
    setFirstName: (state, { payload } : PayloadAction<string>) => {
      if (state.selectedUser) {
        state.selectedUser.firstName = payload.trim();
      }
    },
    setLastName: (state, { payload } : PayloadAction<string>) => {
      if (state.selectedUser) {
        state.selectedUser.lastName = payload.trim();
      }
    },
    setEmail: (state, { payload } : PayloadAction<string>) => {
      if (state.selectedUser) {
        state.selectedUser.email = payload.trim().toLowerCase();
      }
    },
    setRole: (state, { payload } : PayloadAction<Role>) => {
      if (state.selectedUser) {
        state.selectedUser.role = payload;
      }
    },
  }
});

export const {
  setUser: initializeSelectedUser,
  setUsername,
  setFirstName,
  setLastName,
  setEmail,
  setRole,
} = userEditSlice.actions;