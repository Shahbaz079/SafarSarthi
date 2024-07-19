import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../../Utils/cart";

const initialState=localStorage.getItem("bookings")?JSON.parse(localStorage.getItem('bookings')):
{bookedItems:[],shippingAddress:{},paymentMethod:""};

const bookingSlice=createSlice({
  name:"bookings",
  initialState,
  reducers:{
    addToBookings:(state,action)=>{
      const {user,rating,numReviews,reviews,...item}=action.payload;
      const existItem=state.bookedItems.find((x)=>x._id===item._id);
      if(existItem){
        state.bookedItems=state.bookedItems.map((x)=>x._id===existItem._id?item:x)
      }else{
        state.bookedItems=[...state.bookedItems,item] 
      }
     
      return updateCart(state,item)
    },

    removeFromBookings:(state,action)=>{
      state.bookedItems=state.bookedItems.filter((x)=>x._id!=action.payload);
      return updateCart(state);
    },
    saveShippingAddress:(state,action)=>{
      state.shippingAddress=action.payload;
      localStorage.setItem('bookings',JSON.stringify(state))
    },

    savePaymentMethod:(state,action)=>{
      state.paymentMethod=action.payload;
      localStorage.setItem('bookings',JSON.stringify(state))
    },
    clearbookedItems:(state,action)=>{
      state.bookedItems=[];
      localStorage.setItem('bookings',JSON.stringify(state))
    },
    resetBookings:state =>(state=initialState)

    },

});

export const {addToBookings,removeFromBookings,savePaymentMethod,saveShippingAddress,clearbookedItems,resetBookings}=bookingSlice.actions;

export default bookingSlice.reducer;