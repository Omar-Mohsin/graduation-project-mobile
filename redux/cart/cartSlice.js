import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    cartItems: [],
}
const cartSlice = createSlice({

    name: 'cart',
    initialState,

    reducers: {

        addToCart: {
            reducer(state , action) {
                const newItem = action.payload;
                state.cartItems.push(newItem);
            }
        }, removeFromCart: {
            reducer(state , action) {
                const itemIdToRemove = action.payload;
                const itemIndexToRemove = state.cartItems.findIndex(item => item.id === itemIdToRemove);

                if (itemIndexToRemove !== -1) {
                    state.cartItems.splice(itemIndexToRemove, 1);
                };

            }
        } , 
            clearCart :  { 
                reducer(state , action) {
                    state.cartItems = [] ;
                }
            }
    }
})


export const { addToCart, removeFromCart  , clearCart} = cartSlice.actions;
export default cartSlice.reducer;

export const SelectAllCart = (state) => {
    return state.cart.cartItems;
}
