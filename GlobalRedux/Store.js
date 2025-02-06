"use client"
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from './Slices/UserSlice';
import AllProductReducer from './Slices/allProducts'
import AllCartReducer from './Slices/allCartItems'
import AddCartReducer from './Slices/addToCart'
import AllOrdersReducer from './Slices/allOrders'
import DrawerCartReducer from './Slices/drawerCart'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ["currUser", "cart"], 
};

const rootReducer = combineReducers({
  currUser: UserReducer,
  allproducts: AllProductReducer,
  cartItem: AllCartReducer,
  orders: AllOrdersReducer,
  cart: AddCartReducer,
  drawercart: DrawerCartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Apply persistReducer only to 'user' and 'cart' in rootReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };