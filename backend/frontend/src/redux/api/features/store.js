             import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../apiSlice";
import authReducer from './auth/authSlice'
import favouritesReducer from "./favourites/favouriteSlice"
import { getFavouritesFromLocalStorage } from "../../../Utils/localStorage";
import bookingSliceReducer from "./cart/cartSlice";
import shopSliceReducer from "./shop/shopSlice";
const initialfavourites=getFavouritesFromLocalStorage() || [];

const store=configureStore({
  reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authReducer,
    favourites:favouritesReducer,
    bookings:bookingSliceReducer,
    shop:shopSliceReducer

  },

  preloadedState:{
    favourites:initialfavourites
  },

middleware:(getDefaultMiddleware)=>
getDefaultMiddleware().concat(apiSlice.middleware),
devTools:true,

});

setupListeners(store.dispatch);
export default store;