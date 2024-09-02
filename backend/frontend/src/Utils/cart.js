export const addDecimals=(num)=>{
  return (Math.round(num*100)/100).toFixed(2);
};

export const updateCart=(state)=>{
  state.itemsPrice=addDecimals(
    state.bookedItems.reduce(
      (acc,item)=>acc+item.price,0)
    );



state.taxPrice=addDecimals(Number((0.15*state.itemsPrice).toFixed(2)));

state.totalPrice = (
  Number(state.itemsPrice) +
  
  Number(state.taxPrice)
).toFixed(2);


localStorage.setItem('bookings',JSON.stringify(state))
return state;
}