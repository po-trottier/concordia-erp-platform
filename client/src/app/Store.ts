import { createSlice, configureStore, ThunkAction, Action, combineReducers, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '123',
    name: 'John Doe',
    isLoggedIn: true,
    type: ''
  }
  // TODO Add other slices of state to the store
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<{id: string, name: string}>) => {
      state.user.id = payload.id;
      state.user.name = payload.name;
      state.user.isLoggedIn = true;
    },
    logout: (state) => {
      state.user.id = '';
      state.user.name = '';
      state.user.isLoggedIn = false;
    }
  }
})

const reducer = combineReducers({
  user: userSlice.reducer,
  // TODO Add other reducers
})

//TODO Export actions from other reducers

export const {
  login: loginActionCreator,
  logout: logoutActionCreator
} = userSlice.actions;

export const Store = configureStore({ reducer});

export type RootState = ReturnType<typeof Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
