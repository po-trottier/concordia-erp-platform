import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // local storage 
import { encryptTransform } from 'redux-persist-transform-encrypt';
import {userSlice} from './slices/UserSlice';

const persistConfig = {
    key: 'root',
    storage, //type of storage
    whitelist: ['user'],
    //whitelist contains the name of reducers that we want to persist
    transforms: [
        encryptTransform({
            secretKey: 'key',
            onError:  (error) => {
                console.log(error);
            },
        }),
    ],
}

const rootReducer = combineReducers({
    user: userSlice.reducer,
    // TODO Add other reducers from the other slices of the store
})

export default persistReducer(persistConfig, rootReducer);