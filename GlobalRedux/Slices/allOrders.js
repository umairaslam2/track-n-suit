import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoader:false,
  allOders:[],
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getAllOdersStart: (state,action) => {
        state.isLoader= true
    },
    getAllOdersSuccess: (state,action) => {
        state.isLoader= false
        state.allOders = action.payload
    },
    // deleteOrder: (state,action) => {
    //   state.isLoader = true
    //   state.allOders.items = state.allOders?.items?.filter((elem)=>elem.productId._id !== action.payload)
    //   state.isLoader = false

    // },
    // updateOrders: (state,action) => {
    //   const { productId, quantity } = action.payload;
    //   state.allCartItem.items = state.allCartItem?.items?.map((item) =>
    //     item.productId._id === productId
    //       ? { ...item, quantity: quantity }
    //       : item
    //   );
    // },
    clearAllOrders: (state) => {
      state.allOders = [];
    },

  },
})

export const {getAllOdersStart, getAllOdersSuccess,  clearAllOrders} = orderSlice.actions

export default orderSlice.reducer