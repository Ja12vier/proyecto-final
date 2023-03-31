import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const newsSlice = createSlice({
  name: "news",
  initialState:[],
  reducers: {
    setNews: (state, action) => {
      return action.payload;
    }
  }
});

export const getNewsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get("https://api-tecnologia-backend.onrender.com/api/v1/products")
    .then((resp) => dispatch(setNews(resp.data)))
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterCategoriesThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get(`https://api-tecnologia-backend.onrender.com/api/v1/products?categoryId=${id}`)
    .then((resp) => {
      dispatch(setNews(resp.data));
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterByTermThunk = (name) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get(`https://api-tecnologia-backend.onrender.com/api/v1/products?title=${name}`)
    .then((resp) => dispatch(setNews(resp.data)))
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};


export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;
