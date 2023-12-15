import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const Products_URL = 'http://10.0.2.2:8000/items/api/data/'; // fix the syntax error here

const initialState = {
  productsList: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axios.get(Products_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
})

const productsSlice = createSlice({

  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading'
        state.error = null;

      }).addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productsList = action.payload;
      }).addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
})
export const { reducer: productsReducer } = productsSlice;


export const SelectAllProducts = (state) => {
  return state.products.productsList;
}
export default productsSlice.reducer;