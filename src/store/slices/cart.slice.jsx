
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setcart: (state, action) => {
      return action.payload;
    }
  }
});



export const {setcart} = cartSlice.actions;

export default cartSlice.reducer;
