import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoader:false,
  allProducts:[],
}

export const productSlice = createSlice({
  name: 'allproducts',
  initialState,
  reducers: {
    getProductStart: (state,action) => {
        state.isLoader= true
    },
    getProductSuccess: (state,action) => {
        state.isLoader= false
        state.allProducts = action.payload
    },
    deleteProduct: (state,action) => {
      state.isLoader = true
      state.allProducts = state.allProducts.filter((elem)=>elem.PRODUCT_ID !== action.payload)
      state.isLoader = false

    },
    updateProducts: (state,action) => {
      console.log("action payload",action.payload.PRODUCT_ID)
      const Index = state.allProducts.findIndex(product => product.PRODUCT_ID === action.payload.PRODUCT_ID);
      if(Index !== -1 ){
        state.allProducts[Index] = action.payload;
      }
    }
  },
})

export const {getProductStart, getProductSuccess, deleteProduct, updateProducts} = productSlice.actions

export default productSlice.reducer