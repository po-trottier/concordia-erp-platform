import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { userSlice } from './slices/UserSlice';
import storage from 'redux-persist/lib/storage';
import { uploadSlice } from './slices/UploadSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  // whitelist contains the name of reducers that we want to persist
  transforms: [
    encryptTransform({
      secretKey: 'A2esCQW4z4N2MT5n',
      onError: (error) => {
        console.log(error);
      },
    }),
  ],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  upload: uploadSlice.reducer,
});

export default persistReducer(persistConfig, rootReducer);