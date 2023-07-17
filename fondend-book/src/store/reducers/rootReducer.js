import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import bookReducer from "./bookReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const bookPersistConfig = {
    ...persistCommonConfig,
    key: 'book',
    whitelist: ['copybook', 'bookInfo']
};


export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    book: persistReducer(bookPersistConfig, bookReducer),
    app: appReducer
})