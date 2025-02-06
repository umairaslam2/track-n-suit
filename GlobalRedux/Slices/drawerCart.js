import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartStatus: false , 
};
const drawerCartSlice = createSlice({
    name: 'drawercart',
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.cartStatus = true;
          },
          closeDrawer: (state) => {
            state.cartStatus = false;
          },
          toggleDrawer: (state) => {
            state.cartStatus = !state.cartStatus; // Toggle between true & false
          },
    },
  });

  
  export const { openDrawer, closeDrawer, toggleDrawer } = drawerCartSlice.actions;
  export default drawerCartSlice.reducer;
  