import {FaHeart,FaRegHeart} from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import { addToFavourites,removeFromFavourites,setFavourites } from "../../redux/api/features/favourites/favouriteSlice";
import { addFavouritesToLocalStorage,getFavouritesFromLocalStorage,removeFavouritesFromLocalStorage } from "../../Utils/localStorage";
import { useEffect } from "react";

const HeartIcon = ({product}) => {
const dispatch=useDispatch();
const favourites=useSelector(state=>state.favourites) || []

const isFavourite=favourites.some((p)=>p._id==product._id)

useEffect(()=>{
  const favouritesFromLocalStorage=getFavouritesFromLocalStorage();
  dispatch(setFavourites(favouritesFromLocalStorage));
},[])
const toggleFavourites=()=>{
  if(isFavourite){
 dispatch(removeFromFavourites(product));
 // remove the product from local Storage as well
 removeFavouritesFromLocalStorage(product._id)
  }else{
    dispatch(addToFavourites(product))
    //add product to LOcal Storage
    addFavouritesToLocalStorage(product)
}
}
  return (
    <div onClick={toggleFavourites}  className="absolute top-2 right-5 cursor-pointer z-100">
      {isFavourite?(
        <FaHeart className="text-pink-500"/>
      ):(
        <FaRegHeart className="text-white"/>
      )}
    </div>
  )
}

export default HeartIcon
