import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alertcartStatus: false , 
};
const AlertCartSlice = createSlice({
    name: 'alertcart',
    initialState,
    reducers: {
        openAlert: (state) => {
            state.alertcartStatus = true;
          },
          closeAlert: (state) => {
            state.alertcartStatus = false;
          },
          toggleAlert: (state) => {
            state.alertcartStatus = !state.alertcartStatus; // Toggle between true & false
          },
    },
  });

  
  export const { openAlert, closeAlert, toggleAlert } = AlertCartSlice.actions;
  export default AlertCartSlice.reducer;
  