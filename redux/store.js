import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productsReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,

};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer:persistedReducer,
});
export const persistor = persistStore(store);
