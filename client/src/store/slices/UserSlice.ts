import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../router/Roles';
import { LoginRequest } from '../../interfaces/LoginRequest';
import axios from '../../plugins/Axios';

const initialState =
  {
    user: {
      username: '',
      email: '',
      name: '',
      authType: Role.ANY,
      isLoggedIn: false,
      isRemembered: false,
    }
  };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload } : PayloadAction<LoginRequest>) => {
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.user.name = payload.name;
      state.user.authType = payload.role;
      state.user.isLoggedIn = true;
      state.user.isRemembered = payload.isRemembered;

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload.token;
    },
    logout: (state) => {
      state.user.username = state.user.isRemembered ? state.user.username : '';
      state.user.email = '';
      state.user.name = '';
      state.user.authType = Role.ANY;
      state.user.isLoggedIn = false;

      axios.defaults.headers.common['Authorization'] = '';
    }
  }
});

export const {
  login: loginAction,
  logout: logoutAction,
} = userSlice.actions;