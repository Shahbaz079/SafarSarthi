import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice=createSlice({
  name:'favourites',
  initialState:[],
  reducers:{
    addToFavourites:(state,action)=>{
      //check if the product is not already favourites
      if(!state.some((product)=>product._id==action.payload._id)){
        state.push(action.payload)
      }
    },

    removeFromFavourites:(state,action)=>{
      //Remove the product with the matching ID
      return state.filter((product)=>product._id!=action.payload._id)
    },

    setFavourites:(state,action)=>{
      //set the favourites from Local Storage
      return action.payload
    }
  }
})
export const { addToFavourites, removeFromFavourites, setFavourites}=favouriteSlice.actions;

export const selectFavouriteProduct=(state)=>state.favourites;
export default favouriteSlice.reducer;