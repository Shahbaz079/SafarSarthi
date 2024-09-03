import { Link,useParams } from "react-router-dom";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Header from "../Components/Header";
import { useState } from "react";
import Product from "./products/Product";
import SmallProduct from "./products/SmallProduct";
import { HoverEffect } from "../Components/ui/card hover/card-hover-effect";
import Footer from "../Components/Footer";

const Home = () => {
const {keyword}=useParams();

// const {data,isLoading, isError}=useGetProductsQuery({keyword});
const {data,isLoading,isError}=useGetTopProductsQuery();

  
  return (
    <>
   
    {!keyword ?<Header/>:null
}


     {isLoading?(<Loader/>):isError?(
        <Message variant="danger">
          {isError?.data?.message||isError.error}
        </Message>
      ):(
        <>
  <div className="flex flex-col my-[2rem] justify-start items-center">
              
        <Link to='/shop' className="bg-pink-600 font-bold rounded-full py-2 px-10 mt-[1rem] w-[80vw] text-center lg:ml-[6rem] md:mx-[3rem] sm:ml-[5rem] ">
        Most Liked Trips
        </Link>
            <HoverEffect items={data} lgcol={3} mdcol={2}/>
                      {/*  <div className="grid grid-cols-2">
            {data.map((product)=>(
              <div key={product._id}>
                <HoverEffect items={product}/>
              </div>
            ))}
          </div>  */} 
          <Footer/>
        </div>
        
        </>
      )}
    </>
    )
  
}

export default Home
