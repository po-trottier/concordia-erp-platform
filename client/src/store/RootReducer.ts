import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';

import { loginSlice } from './slices/UserSlice';
import { uploadSlice } from './slices/UploadSlice';
import { userEditSlice } from './slices/UserEditSlice';
import { userListSlice } from './slices/UserListSlice';
import { productListSlice } from './slices/ProductListSlice';
import { partListSlice } from './slices/PartListSlice';
import { materialListSlice } from './slices/MaterialListSlice';
import { customerListSlice } from './slices/CustomerListSlice';
import { eventListSlice } from './slices/EventListSlice';
import { listenerListSlice } from './slices/ListenerListSlice';
import { materialQuantitiesSlice } from './slices/MaterialQuantitiesSlice';
import { locationSlice } from './slices/LocationSlice';
import { chartSlice } from './slices/ChartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'location'],
  // whitelist contains the name of reducers that we want to persist
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY || 'MewjZa95PDxjg4Ez',
      onError: (error) => {
        console.error(error);
      },
    }),
  ],
};

const rootReducer = combineReducers({
  login: loginSlice.reducer,
  upload: uploadSlice.reducer,
  edit: userEditSlice.reducer,
  userList: userListSlice.reducer,
  productList: productListSlice.reducer,
  partList: partListSlice.reducer,
  materialList: materialListSlice.reducer,
  customerList: customerListSlice.reducer,
  eventList: eventListSlice.reducer,
  listenerList: listenerListSlice.reducer,
  materialQuantities: materialQuantitiesSlice.reducer,
  location: locationSlice.reducer,
  chart: chartSlice.reducer,
});

export default persistReducer(persistConfig, rootReducer);
