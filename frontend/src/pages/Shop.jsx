import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useGetFilterProductsQuery } from "../redux/api/productApiSlice"
import { setCategories,setProducts,setChecked } from "../redux/api/features/shop/shopSlice"
import Loader from '../Components/Loader';
import {useFetchCategoriesQuery} from '../redux/api/categoryApiSlice'
import ProductCard from "./products/ProductCard";
import "./shop.css"
const Shop = () => {
  const dispatch=useDispatch();
const {categories,products,checked,radio}=useSelector((state)=>state.shop);
const categoriesQuery=useFetchCategoriesQuery();
const [priceFilter,setPriceFilter]=useState('')

const filteredProductsQuery=useGetFilterProductsQuery({
  checked,radio
});

useEffect(()=>{
  if(!categoriesQuery.isLoading){
    dispatch(setCategories(categoriesQuery.data))
  }
},[categories.data,dispatch])

useEffect(()=>{
  if(!checked.length || !radio.length){
    if(!filteredProductsQuery.isLoading){
      // filter products based on the checked categories and price Filter 
      const filteredProducts=filteredProductsQuery.data.filter(
        (product)=>{
          //check if the product price incldes the enteredprice filter
          return (
            product.price.toString().includes(priceFilter) || product.price == parseInt(priceFilter,10)
          );
        }
      );

      dispatch(setProducts(filteredProducts));
    }
  }
},[checked,radio,filteredProductsQuery.data,dispatch,priceFilter])

const handleBrandClick=(brand)=>{
  const productsByBrand=filteredProductsQuery.data?.filter((product)=>product.brand==brand);

  dispatch(setProducts(productsByBrand))
}

const handleCheck=(value,id)=>{
  const updatedChecked=value?[...checked,id]:checked.filter((c)=>c!=id)

  dispatch(setChecked(updatedChecked));
}

// add "all brands" option to unique brand

const uniqueBrands=[
  ...Array.from(
    new Set(
      filteredProductsQuery.data?.map((product)=>product.brand).filter((brand)=>brand!=undefined)
      )
  )
]

const handlePriceChange=e=>{
  // update the price filter state when user type the input field

  setPriceFilter(e.target.value)
}
  return (
    <div className="container mx-2rem lg:ml-[5rem]" id="contain1">
      <div className=" sm:w-[100vw] flex flex-col justify-evenly items-center" >
        <div className="bg-[#151515] p-3  mb-2  flex" id="filter">
          <div className="w-[40%]">
          <h2 className=" text-center py-2 bg-black rounded-full mb-2">
            Filter By Location
          </h2>

          <div className="p-5 w-full ">
            {categories?.map((c)=>(
              <div key={c._id} className="mb-2" >
                <div className="flex items-center mr-4">
                  <input type="checkbox" id="red-checkbox"
                  onChange={(e)=>handleCheck(e.target.checked,c._id)}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                <label htmlFor="pink-checkbox" className="ml-2 text-white text-sm font-medium dark:text-gray-300">
                    {c.name}
                </label>

                </div>
              </div>
            ))}
          </div>
          </div>
{/*
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
            Filter By Brands
          </h2>
          <div className="p-5">
            {uniqueBrands?.map((brand)=>(
              <>
              <div className="flex items-center mr-4 mb-5">
                <input type="radio" id={brand} name="brand" onChange={()=>handleBrandClick(brand)} 
                className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />

                <label htmlFor="pink-radio" className="ml-2 text-sm font-medium text-white dark:text-gray-300">
                  {brand}
                </label>
              </div>
              </>
            ))}
          </div>*/}

         <div className="w-[35%]">
         <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
            Filter By Price
          </h2>

          <div className="p-5 w-full">
            <input type="text" placeholder="Enter Price" value={priceFilter} onChange={handlePriceChange} className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"/>

          </div>
         </div>

            <div className=" pt-0 w-[25%]">
              <button className="w-full px-6 py-2 border rounded-lg my-4"
              onClick={()=>window.location.reload()}
              >
                Reset
              </button>
            </div>

        </div>

        <div className="p-3" id="products">
          <h2 className="h4 text-center mb-2">
            Trip Packages (<span className="text-green-500">{products.length}</span>)
          </h2>
          <div className="lg:mx-[5rem]">
            {products.length==0?(
              <Loader/>
            ):(<div className="flex flex-wrap flex-row ">
             { products?.map((p)=>(
                <div className="mx-[2rem]" key={p._id} >
                  <ProductCard p={p} />
                </div>
              ))}</div>
            )}
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Shop
