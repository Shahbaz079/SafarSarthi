import path from "path";
import multer from "multer";
import express, { Router } from "express";


const router=express.Router();

const storage=multer.diskStorage({
  destination:(req,res,cb)=>{
    cb(null,"uploads/");  
  },
  filename:(req,file,cb)=>{
    const extname=path.extname(file.originalname);
    cb(null,`${file.fieldname}-${Date.now()}${extname}`)
  },

  });

  const fileFilter=(req,file,cb)=>{
    const filetypes=/jpe?g|png|webp/;
    const mimetypes=/image\/jpe?g|image\/png|image\/webp/;

    const extname=path.extname(file.originalname).toLowerCase()

    const mimetype=file.mimetype

    if(filetypes.test(extname)&&mimetypes.test(mimetype)){
      cb(null,true)
    }else{
      cb(new Error("Image Only"),false)
    }

  };

  const upload =multer({storage,fileFilter})

  const uploadSingleImage=upload.single("image");

router.post('/',(req,res)=>{

  uploadSingleImage(req,res,(err)=>{
    if(err){
      res.status(400).send({message:err.message})
    }else if(req.file){
      res.status(200).send({
        message:"Image Uploaded Successfully",
        image:`/${req.file.path}`
      })
    }else{
      res.status(400).send({message:"no image file provided"})
    }
  })

})

export default router;
