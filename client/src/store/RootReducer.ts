import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';

import { userSlice } from './slices/UserSlice';
import { uploadSlice } from './slices/UploadSlice';
import { userEditSlice } from './slices/UserEditSlice';
import { userListSlice } from './slices/UserListSlice';
import { productListSlice } from './slices/ProductListSlice';
import { partListSlice } from './slices/PartListSlice';
import { materialListSlice } from './slices/MaterialListSlice';

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
  edit: userEditSlice.reducer,
  userList: userListSlice.reducer,
  productList: productListSlice.reducer,
  partList: partListSlice.reducer,
  materialList: materialListSlice.reducer,
});

export default persistReducer(persistConfig, rootReducer);