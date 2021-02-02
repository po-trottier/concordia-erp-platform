import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RouteGuard } from '../../router/RouteGuards';

const initialState =
  {
    user: {
      id: '',
      name: '',
      authType: RouteGuard.ANY,
      isLoggedIn: false,
      username: '',
      password: '',
      isRemembered: false,
    }
    // TODO Add other parts of the store's initial state
  };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload } : PayloadAction<{ id : string, name : string, username : string, password : string, isRemembered : boolean }>) => {
      state.user.id = payload.id;
      state.user.name = payload.name;
      state.user.authType = RouteGuard.SYSTEM_ADMINISTRATOR;
      state.user.isLoggedIn = true;
      state.user.username = payload.username;
      state.user.password = payload.password;
      state.user.isRemembered = payload.isRemembered;
    },
    logout: (state, { payload } : PayloadAction<{ username : string, password : string, isRemembered : boolean }>) => {
      state.user.id = '';
      state.user.name = '';
      state.user.authType = RouteGuard.ANY;
      state.user.isLoggedIn = false;
      state.user.username = payload.username;
      state.user.password = payload.password;
      state.user.isRemembered = payload.isRemembered;
    }
  }
});

export const {
  login: loginAction,
  logout: logoutAction
} = userSlice.actions;