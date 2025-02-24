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
        const products = action.payload.products || [];
        const cartItems = action.payload.cartItems || [];
        
        // Merge quantity into products
        const updatedProducts = products.map((product) => {
            const cartItem = cartItems.find((item) => item.PRODUCT_ID === product.PRODUCT_ID);
            return {
                ...product,
                Cart_Quantity: cartItem ? cartItem.QUANTITY : 0, // Attach quantity
            };
        });
    
        state.allCartItem = updatedProducts;
    },
    // deleteCart: (state,action) => {
     
    //   if (!Array.isArray(state.allCartItem)) {
    //     state.allCartItem = [];
    //   }
    
    //   // Assign the filtered result to the state
    //   state.allCartItem.products = state.allCartItem?.products?.filter(
    //     (elem) => elem.PRODUCT_ID !== action.payload
    //   );
    
    //   console.log("After delete, allCartItem:", state.allCartItem);

    // },
    deleteCart: (state, action) => {
      // console.log("Before delete, allCartItem:", state.allCartItem);
      if (!Array.isArray(state.allCartItem)) {
          state.allCartItem.products = [];
      }
  
      if (!Array.isArray(state.allCartItem)) {
          state.allCartItem = [];
      }
      // Mutate state directly instead of reassigning
      state.allCartItem = state.allCartItem.filter(
          (product) => product.PRODUCT_ID !== action.payload
      );
  
  },
    
    updateCart: (state,action) => {
      const { productId, quantity } = action.payload;
      state.allCartItem = state.allCartItem.map((item) =>
        item.PRODUCT_ID === productId
          ? { ...item, Cart_Quantity: quantity }
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