import { createSlice } from "@reduxjs/toolkit";
import {setIsLoading} from './isLoading.slice'
import axios from 'axios'
import getConfig from "../../utils/getConfig";


 

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    setfavorites: (state, action) => {
      return action.payload;
    }
  }
});

export const  getFavoritesThunk=()=> (dispatch) => {

  dispatch(setIsLoading(true))
  axios
  .get(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, getConfig())
  .then((resp) =>dispatch(setfavorites(resp.data)))
  .catch((error)=>console.error(error))
  .finally(()=>dispatch(setIsLoading(false)))
}

export const  createFavoritesThunk=(news)=>(dispatch)=>{
  dispatch(setIsLoading(true))

    axios
    .post(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`,news,getConfig())
   .then((resp)=> dispatch(getFavoritesThunk(resp.data))/*dispatch()*/)
   .catch((error)=>console.error(error))
   .finally(()=>dispatch(setIsLoading(false)))

}

export const {setfavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;
