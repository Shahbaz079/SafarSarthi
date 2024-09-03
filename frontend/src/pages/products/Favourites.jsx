import {useSelector} from "react-redux"
import { selectFavouriteProduct } from "../../redux/api/features/favourites/favouriteSlice"
import Product from "./Product" 

const Favourites = () => {
  const favourites=useSelector(selectFavouriteProduct);
  console.log(favourites)
  return (
    <div className="lg:ml-[10rem]  md:mx-[6rem] sm:mx-[2rem] ">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        WishList💖
      </h1>
      <div className="flex flex-wrap justify-normal items-center">
        {favourites.map((product)=>(
          <Product key={product._id} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default Favourites
