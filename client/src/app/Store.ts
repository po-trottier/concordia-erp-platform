import { createSlice, configureStore, ThunkAction, Action, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { RouteGuard } from '../router/RouteGuards'

const initialState = {
  user: {
    id: '123',
    name: 'John Doe',
    authType: RouteGuard.SYSTEM_ADMINISTRATOR,
    isLoggedIn: true,
  }
  // TODO Add other parts of the store's initial state
}

const userSlice = createSlice({
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

const reducer = combineReducers({
  user: userSlice.reducer,
  // TODO Add other reducers from the other slices of the store
})

//TODO Export actions from reducers

export const {
  login: loginActionCreator,
  logout: logoutActionCreator
} = userSlice.actions;

export const Store = configureStore({reducer});

export type RootState = ReturnType<typeof Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
