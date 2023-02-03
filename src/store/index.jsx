import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice';
import newsSlice from "./slices/news.slice";
import favoriteSlice from './slices/favorite.slice';
import cartSlice from './slices/cart.slice';


export default configureStore({
  reducer:
{  
  isLoading: isLoadingSlice,
  news: newsSlice,
  favorites: favoriteSlice,
  cart: cartSlice,
}
	}
)