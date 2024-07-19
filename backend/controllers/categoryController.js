import Location from "../models/categoryModel.js"

import asyncHandler from "../middlewares/asyncHandler.js"

const createCategory=asyncHandler(
  async(req,res)=>{
try {
  const {name}=req.body

if (!name){
  return res.json({error:'Name is required'});
}



const existingCategory=await Location.findOne({name});

if(existingCategory){
  return res.json({error:"Already Exists"})
}

const category=await new Location({name}).save();

res.json(category);

} catch (error) {
  console.log(error);
  return res.status(400).json(error);
}
  }
)


const updateCategory=asyncHandler(async(req,res)=>{
  try {
    const {name}=req.body;
    const {categoryId}=req.params;

    const category=await Location.findOne({_id:categoryId});

    if(!category){
      res.status(404).json({error:"Category not found"});

    }

    category.name=name;

   const updatedCategory=await category.save();

   res.json(updatedCategory);


  } catch (error) {
    console.error(error);
    return res.status(500).json({error:"internal server error"})
  }
})

const removeCategory=asyncHandler(async(req,res)=>{
try {
  const {categoryId}=req.params
  const removed=await Location.findByIdAndDelete({_id:categoryId});
  res.json(removed);
} catch (error) {
  console.error(error);
    return res.status(500).json({error:"internal server error"})
}
})

const listCategory=asyncHandler(async(req,res)=>{
  try {
    const all=await Location.find({});
    res.json(all);
  } catch (error) {
    console.error(error)
    return res.status(400).json(error.message);
  }
})

const readCategory=asyncHandler(async(req,res)=>{
  try {
    
    const category=await Location.findOne({_id:req.params.id})

  res.json(category)
  } catch (error) {
    console.error(error)
    res.status(400).json(error.message)
  }
})
export {createCategory,updateCategory,removeCategory,listCategory,readCategory};