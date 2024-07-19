import { useState } from "react"
import { useParams , Link , useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {toast} from "react-toastify"
import { useGetProductDetailsQuery , useCreateReviewsMutation} from "../../redux/api/productApiSlice"
import Loader from "../../Components/Loader"
import Message from "../../Components/Message"
import { FaBox,FaCheck,FaClock,FaOptinMonster,FaShoppingCart ,FaStar ,FaStore } from "react-icons/fa"
import HeartIcon from "./HeartIcon"
import { PRODUCT_URL } from "../../redux/api/features/constants"
import moment from "moment"
import Ratings from "./Ratings"
import ProductTabs from "./ProductTabs"
import { addToBookings } from "../../redux/api/features/cart/cartSlice"

const ProductDetail = () => {
const {id:productId}=useParams();
const navigate=useNavigate();
const dispatch=useDispatch();

const [people,setpeople]=useState(1);
const [rating,setRating]=useState(0);
const [comment,setComment]=useState("");

const {data:product ,isLoading ,refetch,error}=useGetProductDetailsQuery(productId);

const {userInfo}=useSelector(state=>state.auth);

const [createReview,{isLoading:loadingProductReview}]=useCreateReviewsMutation();
const submitHandler=async(e)=>{
e.preventDefault();

try {
  await createReview({
    productId,
    rating,
    comment,
  }).unwrap();
  refetch();
  toast.success("Review Added");
} catch (error) {
  toast.error(error?.data?.message || error.message)
}
}

const bookingHandler=()=>{
dispatch(addToBookings({...product}));
navigate("/login?redirect=/booking")
}

  return (
    <>
      <div>
        <Link to='/' className="text-white font-semibold hover:underline ml-[10rem]">
        Go Back
        </Link>
      </div>

      {
        isLoading?(<Loader/>):error?(<Message variant='danger'>{error?.data?.message || error.message}</Message>):(
          <>
          <div className="flex flex-wrap relative items-between mt-[2rem] lg:ml-[10rem] mx-[1rem]">
            <div >
              <img src={product.image} alt={product.name}
              className="w-full xl:w-[35rem] lg:w-[30rem] md:w-[25rem] sm:w-[15rem] mr-[2rem] rounded-lg"
              />
            <HeartIcon product={product}/>
            </div>
            <div className="flex flex-col justify-start">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-[25rem] lg:w-[25rem] md:w-[20rem] text-[#B0B0B0]">{product.discription}</p>
              <p className="text-5xl my-4 font-bold"> $ {product.price}</p>
              <div className="flex items-center justify-between w-[28rem] ">
                <div className="one w-[50%]">
                { /* <h1 className="flex items-center mb-6">
                <FaStore className="mr-2 text-white"/> Brand:{" "}{product.brand}

                </h1>
                */
}
                <h1 className="flex items-center mb-6">
                <FaClock className="mr-2 text-white"/> Added:{" "}{moment(product.createdAt).fromNow()}

                </h1>

                <h1 className="flex items-center mb-6">
                <FaStar className="mr-2 text-white"/> Reviews:{" "}{product.numReviews}

                </h1>
                </div>
                <div className="two ml-6">
                  <h1 className="flex items-center mb-6">
                <FaStar className="mr-2 text-white"/> Rating:{" "}{rating}

                </h1>

                <h1 className="flex items-center mb-6">
                <FaShoppingCart className="mr-2 text-white"/> Max-Passengers:{" "}{product.passengers}

                </h1>
{ /*
                <h1 className="flex items-center mb-6 w-[8rem]">
                <FaBox className="mr-2 text-white"/> In Stock:{" "}{product.countInStock}

                </h1>  */}
                </div>

              </div>

              <div className="flex justify-between flex-wrap">
                 <Ratings value={product.rating} 
                 text={ `${product.numReviews} reviews`}
                 /> 

                 {product.countInStock>0 && (
                  <div className="p-2 w-[6rem] rounded-lg text-white bg-slate-800">
                    <select value={qty} onChange={(e)=>setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map((x)=>(
                        <option key={x+1} value={x+1}>
                          {x+1}
                        </option>
                      ))}
                    </select>
                  </div>
                 )}
              </div>

              <div className="btn-container">
                <button 
                onClick={bookingHandler}
               
                className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0 "
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
             <ProductTabs 
             loadingProductReview={loadingProductReview}
             userInfo={userInfo}
             submitHandler={submitHandler}
             rating={rating}
             setRating={setRating}
             comment={comment}
             setComment={setComment}
             product={product}
             /> 
            </div>
          </div>
          </>
        )
      }
    </>
  )
}

export default ProductDetail
             