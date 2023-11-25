import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productsReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";

const rootReducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
});



export const store = configureStore({
  reducer: rootReducers,
});
