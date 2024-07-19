import express from "express";
import formidable from 'express-formidable'

import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

//controllers

import { addProduct,updateProduct,deleteProduct ,fetchProduct,fetchProductById,fetchAllProducts,addReview ,fetchTopProducts,fetchNewProducts,filterProducts} from "../controllers/productController.js";

const router=express.Router();



router.route('/').get(fetchProduct)
.post(authenticate,authorizeAdmin, formidable(),addProduct);

router.route('/allproducts').get(fetchAllProducts);

router.route('/:id')
.put(authenticate,authorizeAdmin,formidable(),updateProduct)
.delete(authenticate,authorizeAdmin,deleteProduct)
.get(fetchProductById);

router.route('/:id/reviews')
    .post(authenticate,addReview);

   router.route('/top/product').get(fetchTopProducts);
   router.get('/new/product',fetchNewProducts); 

router.route('/filtered-products').post(filterProducts)

export default router;