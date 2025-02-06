import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoader:false,
  allCartItem:[],
}

export const cartSlice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    getCartItemStart: (state,action) => {
        state.isLoader= true
    },
    getCartItemSuccess: (state,action) => {
        state.isLoader= false
        state.allCartItem = action.payload
    },
    deleteCart: (state,action) => {
      state.isLoader = true
      state.allCartItem.items = state.allCartItem?.items?.filter((elem)=>elem.productId._id !== action.payload)
      state.isLoader = false

    },
    updateCart: (state,action) => {
      const { productId, quantity } = action.payload;
      state.allCartItem.items = state.allCartItem?.items?.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: quantity }
          : item
      );
    },
    clearCartItems: (state) => {
      state.allCartItem.items = [];
    },

  },
})

export const {getCartItemStart, getCartItemSuccess, deleteCart, updateCart, clearCartItems} = cartSlice.actions

export default cartSlice.reducer