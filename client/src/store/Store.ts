import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import reducer from './RootReducer';

export const Store = configureStore({
  reducer,
  middleware: [],
});
export const Persistor = persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
