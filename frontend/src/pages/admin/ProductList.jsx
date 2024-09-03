import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useCreateProductMutation,useUploadImageMutation } from "../../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"
const ProductList = () => {
const [image,setImage]=useState('');
const [name,setName]=useState('');
const [discription,setDiscription]=useState('');
const [price,setPrice]=useState('');
const [location,setLocation]=useState('');
const [passengers,setPassengers]=useState('');
const [brand,setBrand]=useState('');
const [imageUrl,setImageUrl]=useState('');
const [stock,setStock]=useState('');
const navigate=useNavigate();

const [uploadProductImage]=useUploadImageMutation();
const [createProduct]=useCreateProductMutation();
const {data: categories}=useFetchCategoriesQuery();

const handleSubmit=async(e)=>{
  e.preventDefault();

try {
  const productData=new FormData();

  productData.append("image",image)
  productData.append("name",name)
  productData.append("discription",discription)
  productData.append("price",price)
  productData.append("location",location)
  productData.append("passengers",passengers)
 // productData.append("brand",brand)
  productData.append("countInStock",stock)
 

  const {data}=await createProduct(productData);

  if (data.error){
    toast.error("Product creation Failed. try Again")
  }else{
    toast.success(`${data.name} is created`);
    navigate('/');
  }
  


} catch (error) {
  console.error(error);
  toast.error("Product Cannot be created.Try Again")
}}


const uplaodFileHandler=async (e)=>{
  const formData=new FormData();
  formData.append("image",e.target.files[0]);
try {
  const result=await uploadProductImage(formData).unwrap()
  toast.success(result.message)
  setImage(result.image);
  setImageUrl(result.image)
} catch (error) {
  toast.error(error?.data?.message|| error.error)
}
}

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu/>
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Package</div>
          {imageUrl && (
            <div className="text-center">
              <img src={imageUrl} alt="product" className="block mx-auto max-h-[200px]" />
            </div>
          )}
<div className="mb-3">
  <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
    {image?image.name :"Uplaod Image"}

    <input type="file" name="image" accept="image/" 
    onChange={uplaodFileHandler}
    className={!image?"hidden":"text-white"}
    />
  </label>
</div>

<div className="p-3">
  <div className="flex flex-row">
    <div className="one">
      <label htmlFor="name ">
        Name
      </label><br />
      <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
      value={name}
      onChange={(e)=>setName(e.target.value)}/>
    </div>
    <div className="two ml-3">
      <label htmlFor="name block">
        Price
      </label><br />
      <input type="number" className=" p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
      value={price}
      onChange={(e)=>setPrice(e.target.value)}/>
    </div>
     

  </div>

  
</div>

<div className="flex flex-row">
    <div className="one">
      <label htmlFor="name block">
        Passengers
      </label><br />
      <input type="number" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
      value={passengers}
      onChange={(e)=>setPassengers(e.target.value)}/>
    </div>
  { /* <div className="two ml-3">
      <label htmlFor="name block">
        Brand
      </label><br />
      <input type="text" className=" p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
      value={brand}
      onChange={(e)=>setBrand(e.target.value)}/>
    </div>*/}
     

  </div>

  <label htmlFor="" className="my-5">Discription</label>
  <textarea type="text" className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white" value={discription}
  onChange={(e)=>setDiscription(e.target.value)}>
    
    </ textarea>    

    <div className="flex justify-between">
      {/*
      <div >
        <label htmlFor="name block">Count In Stock</label>
        <br />
        <input type="text"
        className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
        value={stock}
        onChange={(e)=>setStock(e.target.value)}
        />
      </div> */}

      <div >
        <label htmlFor="">Location</label><br />
        <select placeholder="Choose Location" className="ml-3 p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
        onChange={(e)=>setLocation(e.target.value)}
        >
          {categories?.map((c)=>(
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>

        <button 
        onClick={handleSubmit}
        className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
        >Submit</button>
        </div>

      </div>
    </div>
  )
}

export default ProductList
