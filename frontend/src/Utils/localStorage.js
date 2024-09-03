// Add a product to a Loacal Storage
export const addFavouritesToLocalStorage=(product)=>{
  const favourites=getFavouritesFromLocalStorage();
  if(!favourites.some((p)=>p._id==product._id)){
    favourites.push(product);
    localStorage.setItem("favourites",JSON.stringify(favourites));
  }
}

// Remove Favourites from a Local Storage

export const removeFavouritesFromLocalStorage=(productId)=>{
  const favourites=getFavouritesFromLocalStorage();
  const updateFavourites=favourites.filter(
   (product)=>product._id!=productId 
  );
  localStorage.setItem("favourites",JSON.stringify(updateFavourites));
}
//retrive favourites from a local storage

export const getFavouritesFromLocalStorage=()=>{
  const favouritesJSON=localStorage.getItem("favourites");
  return favouritesJSON?JSON.parse(favouritesJSON):[];
}