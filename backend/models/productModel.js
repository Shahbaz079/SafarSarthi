import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema;

const reviewSchema=mongoose.Schema({
  name:{type:String,required:true},
  rating:{type:Number,required:true},
  comment:{type:String,required:true},
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
  },
  
},
{timestamps:true}
);

const ProductSchema=mongoose.Schema(
  {
    name:{type:String,required:true},
    price:{type:Number,required:true,default:0},
    image:{type:String,required:true},
    reviews:[reviewSchema],
    location:{type:ObjectId,ref:"Location",required:true},
   // brand:{type:String,required:true},
    discription:{type:String,required:true},
    passengers:{type:Number,required:true},
    rating:{type:Number,required:true,default:0},
    numReviews:{type:Number,required:true,default:0},
   // countInStock:{type:Number,required:true,default:0}
  },{timestamps:true}
);

const Product=mongoose.model("Product",ProductSchema);
export default Product;