import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import navigationSlice from '../features/navigation/navigationSlice';

export const Store = configureStore({
  reducer: {
    navigation: navigationSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
