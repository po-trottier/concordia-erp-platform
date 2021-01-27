import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RouteGuard } from '../../router/RouteGuards'

const initialState =
{
  user: {
    id: '',
    name: '',
    authType: RouteGuard.ANY,
    isLoggedIn: false,
  }
  // TODO Add other parts of the store's initial state
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, {payload}: PayloadAction<{id: string, name: string}>) => {
        state.user.id = payload.id;
        state.user.name = payload.name;
        state.user.authType = RouteGuard.SYSTEM_ADMINISTRATOR;
        state.user.isLoggedIn = true;
        },
        logout: (state) => {
        state.user.id = '';
        state.user.name = '';
        state.user.authType = RouteGuard.ANY;
        state.user.isLoggedIn = false;
        }
    }
})

export const {
    login: loginActionCreator,
    logout: logoutActionCreator
} = userSlice.actions;