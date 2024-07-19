import {User} from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/createToken.js";

const createUser=asyncHandler(async (req,res)=>{



  const {username,email,password}=req.body;
  
    if(!username||!email||!password){
      throw new Error("please fill all the inputs");
    }
    const userExist=await User.findOne({email});
    if(userExist){
      res.status(400).send("User already exists");
    }
    
      const salt=await bcrypt.genSalt(20);
      const hashedPassword=await bcrypt.hash(password,salt); 

    const newUser=new User({
      username,email,password:hashedPassword
    })

    try {
      await newUser.save();

      generateToken(res,newUser._id);

      res.status(201)
      .json({  
        _id:newUser._id,
        username:newUser.username,
        email:newUser.email,
        isAdmin:newUser.isAdmin,
      })

    } catch (error) {
      res.status(400);
      throw new Error("invalid user data")
    }

}

)

const loginUser=asyncHandler(async (req,res)=>{
const {email,password}=req.body;

const existingUser=await User.findOne({email});

if (existingUser){
  const isPasswordValid= await bcrypt.compare(password,existingUser.password)


if (isPasswordValid){
  generateToken(res,existingUser._id)

   res.status(201).json({
    _id:existingUser._id,
    username:existingUser.username,
    isAdmin:existingUser.isAdmin,
   }) 
}else{
  res.status(404);
  throw new Error("Password Incorrect");
};
}else{
  res.status(404);
  throw new Error("User Not Found");
}

})


const logoutCurrentUser=asyncHandler(async(req,res)=>{
res.cookie("jwt","",{
  httpOnly:true,
  expires:new Date(0),

});

res.status(200).json({message:"logged out successfully"});

})

const getAllUsers=asyncHandler(async(req,res)=>{
  const users=await User.find({});
  res.json(users);
})

const getCurrentUserProfile=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.User._id);

  if(user){
    res.json({
      _id:user._id,
      username:user.username,
      email:user.email
    })
  }
  else{
    res.status(404);
    throw new Error("User Not Found")
  }

})
const updateCurrentUserProfle=asyncHandler(async (req,res)=>{
const user=await User.findById(req.User._id);

if (user){
  user.username=req.body.username || user.username
  user.email=req.body.email || user.email

  if(req.body.password){
    const salt=await bcrypt.genSalt(20);
    const hashedPassword=await bcrypt.hash(req.body.password,salt); 

    user.password=hashedPassword;  
  }

  const updatedUser=await user.save()

  res.json({
    _id:updatedUser._id,
    username:updatedUser.username,
    email:updatedUser.email,
    isAdmin:updatedUser.isAdmin
  })
} else{ 
  res.status(404);
  throw new Error("User not Found")
}

})


const deleteUserById=asyncHandler(async(req,res)=>{
  const user= await User.findById(req.params.id);

  if (user){
    if(user.isAdmin){
      res.status(400);
      throw new Error("cannot delete admin User");

    }

    await User.deleteOne({_id:user._id});
    res.json({
      message:"User Removed"
    });
  }else{
    res.status(404);
    throw new Error("User not found");
  }
})

const getUserById=asyncHandler(async(req,res)=>{
  const user= await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
    
  }else{
    res.status(404);
    throw new Error("User Not Found");

  }
})


const updateUserById=asyncHandler(async(req,res)=>{
  const user= await User.findById(req.params.id);

  if (user) {
    user.username=req.body.username||user.username;
    user.email=req.body.email|| user.email;
    user.isAdmin=Boolean(req.body.isAdmin);

    const updatedUser=await user.save();
    
    res.json({
      _id:updatedUser._id,
      email:updatedUser.email,
      username:updatedUser.username,
      isAdmin:updatedUser.isAdmin
    })
  } else {
   res.status(404);
   throw new Error("User Not Found"); 
  }
})
export {createUser,loginUser,logoutCurrentUser,getAllUsers,getCurrentUserProfile,updateCurrentUserProfle,deleteUserById,getUserById,updateUserById}; 
                      