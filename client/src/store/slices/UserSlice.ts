import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../router/Roles';
import { LoginRequest } from '../../interfaces/LoginRequest';
import axios from '../../plugins/Axios';

const initialState =
  {
    user: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      token: '',
      authType: Role.ANY,
      isLoggedIn: false,
      isRemembered: false,
    }
  };

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, { payload } : PayloadAction<LoginRequest>) => {
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.user.firstName = payload.firstName;
      state.user.lastName = payload.lastName;
      state.user.token = payload.token;
      state.user.authType = payload.role;
      state.user.isLoggedIn = true;
      state.user.isRemembered = payload.isRemembered;

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload.token;
    },
    logout: (state) => {
      state.user.username = state.user.isRemembered ? state.user.username : '';
      state.user.email = '';
      state.user.firstName = '';
      state.user.lastName = '';
      state.user.token = '';
      state.user.authType = Role.ANY;
      state.user.isLoggedIn = false;

      axios.defaults.headers.common['Authorization'] = '';
    }
  }
});

export const {
  login: loginAction,
  logout: logoutAction,
} = loginSlice.actions;