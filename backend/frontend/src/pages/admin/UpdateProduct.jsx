import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom"

import { useUpdateProductMutation,useDeleteProductMutation,useGetProductByIdQuery,useUploadImageMutation } from "../../redux/api/productApiSlice"

import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"

import {toast} from "react-toastify"
import AdminMenu from "./AdminMenu"


const UpdateProduct = () => {
  const params=useParams();  
  const {data:productData}=useGetProductByIdQuery(params._id)



  const [image,setImage]=useState(productData?.image||"")
  const [name,setName]=useState(productData?.name||"")
  const [discription,setDiscription]=useState(productData?.discription||"")
  const [price,setPrice]=useState(productData?.price||"")
  const [category,setCategory]=useState(productData?.category||"")
  const [brand,setBrand]=useState(productData?.brand||"")
  const [stock,setStock]=useState(productData?.countInStock||"")
  const [quantity,setQuantity]=useState(productData?.quantity||"")
  
const navigate=useNavigate();

const {data:categories=[]}=useFetchCategoriesQuery();

const [uploadProductImage]=useUploadImageMutation();
const [updateProduct]=useUpdateProductMutation();
const [deleteProduct]=useDeleteProductMutation();

useEffect(
  ()=>{
    if (productData && productData._id){
      setName(productData.name)
      setDiscription(productData.discription);
      setPrice(productData.price);
      setCategory(productData.categories?._id)
      setQuantity(productData.quantity)
      setBrand(productData.brand)
      setImage(productData.image)
    }
  }
  ,[productData]
)


const uploadFileHandler = async (e) => {
  const formData = new FormData();
  formData.append("image", e.target.files[0]);
  try {
    const res = await uploadProductImage(formData).unwrap();
    toast.success("Item added successfully");
    setImage(res.image);
  } catch (err) {
    toast.error(err.message);
};}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("discription", discription);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("brand", brand);
    formData.append("countInStock", stock);


      // Update product using the RTK Query mutation
      const data = await updateProduct({productId:params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product successfully updated`);
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete=async ()=>{
    try {
      let answer=window.confirm("Are you sure to delete this Product?")
      if (!answer) return ;
      if (!params._id) {
        toast.error("Invalid product ID.");
        return;
      }
      
      const {data}=await deleteProduct(params._id).unwrap()
      toast.success(`${data.name} is deleted`)
      navigate('/admin/allproductlist')
    } catch (error) {
      console.log(error)
      toast.error("Deletion failed.Try Again")
    }
  }

  return (
      
    <>
    <div className="container  xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update / Delete Product</div>
    
          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto w-full h-[40vh] w-[40vw] object-cover"
              />
            </div>
          )}  

          <div className="mb-3">
            <label className="text-white  py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold ">
              {image ? image.name : "Upload image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="text-white"
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="two">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div>
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  min="1"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Discription
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
              <button
                onClick={handleSubmit}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
   
  )
}

export default UpdateProduct;
