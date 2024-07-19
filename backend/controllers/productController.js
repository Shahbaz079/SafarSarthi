import asyncHandler from "../middlewares/asyncHandler.js";

import Product from '../models/productModel.js'

const addProduct=asyncHandler(async(req,res)=>{
 try {
  const {name,price,location,passengers,discription,image}=req.fields;

  //validation
  
  switch (true){
    case !name:
     return res.json({error:"Name is required"})     
     // case !brand:
     //   return res.json({error:"Brand is required"})     
        case !location:
      return res.json({error:"Location is required"})     
      case !price:
      return res.json({error:"Price is required"})     
     // case !passengers:
     // return res.json({error:"Quantity is required"})     
      case !discription:
      return res.json({error:"Discription is required"})     

    
    }
    const product=new Product({...req.fields});
    await product.save();
    res.json(product);


 } catch (error) {
  console.error(error);
  res.status(400).json(error.message)
 }


})


const updateProduct=asyncHandler(async(req,res)=>{
  try {
    
  const {name,price,passengers,discription}=req.fields;

  //validation
  
  switch (true){
    case !name:
      return res.json({error:"Name is required"})     
    //  case !brand:
      //  return res.json({error:"Brand is required"})     
        case !location:
     return res.json({error:"location is required"})     
      case !price:
      return res.json({error:"Price is required"})     
      case !passengers:
      return res.json({error:"Quantity is required"})     
      case !discription:
      return res.json({error:"Discription is required"})     

    
    }

const product=await Product.findByIdAndUpdate(req.params.id,{...req.fields},{new:true})

await product.save();
res.json(product);
  } catch (error) {
    console.error(error)
    res.status(400).json(error.message)
  }
})

const deleteProduct=asyncHandler(async(req,res)=>{
  try {
    const product=await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"Server error"})
  }
});


const fetchProduct=asyncHandler(async(req,res)=>{
  try {
    const pageSize=6
    const keyword=req.query.keyword?{name:{$regex:req.query.keyword,$options:"i"} }:{}

    const count=await Product.countDocuments({...keyword})
    const products=await Product.find({...keyword}).limit(pageSize);

    res.json({
      products,
      page:1,
      pages:Math.ceil(count/pageSize),
      hasMore:false
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({error:"Server error"})
  }
})

const fetchProductById=asyncHandler(async(req,res)=>{
  try {
    const product=await Product.findById(req.params.id)
    if(product){
     return res.json(product);
    }else{
      res.status(404);
      throw new Error("product not found");
    }
  } catch (error) {
    console.error(error)
    res.status(404).json({error:"ha sahi pakra Server Error"})
  }
})

const fetchAllProducts=asyncHandler(async(req,res)=>{
   try {
    const products=await Product.find({}).populate("Location").limit(12).sort({createdAt:-1})
    res.json(products);
   } catch (error) {
    console.error(error)
    req.status(404).json({error:"Ye Wala Server Error"})
   }
})

const addReview=asyncHandler(async(req,res)=>{
  try {
    const {rating,comment}=req.body;
    const product=await Product.findById(req.params.id);

    if(product){
      const alreadyReviewed=product.reviews.find(
        (r)=>r.User==req.User._id
      )
      if (alreadyReviewed){
        res.status(400);
        throw new Error("Product already reviewed");

      }

      const review={
        name:req.User.username,
        rating:Number(rating),
        comment,
        user:req.User._id
      }

      product.reviews.push(review);

      product.numReviews=product.reviews.length;

      product.rating=
          product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length;

          await product.save();

          res.status(201).json({message:"Review Added"})


    }else{
      res.status(404);
      throw new Error("Product Not Found")
    }

  } catch (error) {
    console.error(error)
  }
})


const fetchTopProducts=asyncHandler(async(req,res)=>{
  try {
    const products=await Product.find({}).sort({rating:-1}).limit(4);

    res.json(products); 
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
})

const fetchNewProducts=asyncHandler(async(req,res)=>{
 try {
  const products=await Product.find().sort({_id:-1}).limit(5);
  res.json(products)
 } catch (error) {
  console.error(error);
  res.status(400).json(error.message)
 } 
})

const filterProducts=asyncHandler(async(req,res)=>{
  try {
    const {checked,radio}=req.body
    let args={};
    if(checked.length>0)args.location=checked;
    if(radio.legth)args.price={$gte:radio[0],$lte:radio[1]}

    const products=await Product.find(args)
    res.json(products);
  } catch (error) {
    console.error(error)
    res.status(500).json({error:"Server Error"})
  }
})

export {addProduct,updateProduct,deleteProduct,fetchProduct,fetchProductById,fetchAllProducts,addReview,  fetchTopProducts  ,fetchNewProducts ,filterProducts  }