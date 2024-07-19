import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Utility Function

function calcPrices(orderItems) {
  const itemsPrice = orderItems.price;


  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  const totalPrice = (
    itemsPrice +
    
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
   
    taxPrice,
    totalPrice,
  };
}

const createOrder=async(req,res)=>{

  try {
    const {orderItem,shippingAddress,paymentMethod,payImg}=req.body;

    if (!orderItem) {
      res.status(400);
      throw new Error("No order items");
    }

    const matchingProduct=await Product.findById(orderItem._id)
    if(!matchingProduct){
      res.status(404);
      throw new Error(`Package not found`);
    }else{
      
  const { itemsPrice, taxPrice, totalPrice } =
  calcPrices(matchingProduct);

  const dbOrderItem={
    ...matchingProduct,
    product:matchingProduct._id,
    _id:undefined,
    
  }


const order = new Order({
  orderItem: dbOrderItem,
  
  user: req.User._id,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  taxPrice,
 payImg,
  totalPrice,
});

const createdOrder = await order.save();
res.status(201).json(createdOrder);
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 {/* try {
    const {orderItems,shippingAddress,paymnetMethod}=req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    const itemsFromDB=await Product.find({_id:{$in:orderItems.map((x)=>x._id)},
  });

  const dbOrderItems=orderItems.map((itemFromClient)=>{
    const matchingItemFromDB=itemsFromDB.find((itemfromDb)=>itemfromDb._id==itemFromClient._id);

    if (!matchingItemFromDB) {
      res.status(404);
      throw new Error(`Product not found: ${itemFromClient._id}`);
    }

    return {
      ...itemFromClient,
      product: itemFromClient._id,
      price: matchingItemFromDB.price,
      _id: undefined,
    };


  });

  const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
  calcPrices(dbOrderItems);

const order = new Order({
  orderItems: dbOrderItems,
  user: req.user._id,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
});

const createdOrder = await order.save();
res.status(201).json(createdOrder);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}        */}
}
 const getAllOrders=async(req,res)=>{
  try {
    const orders=await Order.find({}).populate("user","id username");
    res.json(orders);
  } catch (error) {
    res.status(500).json({error:error.message}); }
  }



 const getUserOrders=async(req,res)=>{
 try {
  const userOrder=await Order.find({user:req.User._id})
  res.json(userOrder)
 } catch (error) {
  res.status(500).json({error:error.message});
 }
 }

 const countTotalOrders=async(req,res)=>{
try {
  const totalOrders=await Order.countDocuments();
 
  res.json(totalOrders);

} catch (error) {
  res.status(500).json({error:error.message});
}
 }

 const calculateTotalSales=async(req,res)=>{
  try {
    const orders=await Order.find({isPaid:true});
    const totalSales=orders.reduce((sum,order)=>sum+order.totalPrice,0)
    res.json({totalSales});
  } catch (error) {
    res.status(500).json({error:error.message});
  }
 }

 const calculateTotalSalesByDate=async(req,res)=>{
  try {
    const sales=await Order.aggregate([
      {
        $match:{
          isPaid:true,
        },
      },
      {
        $group:{
          _id:{
            $dateToString:{format:'%Y-%m-%d',date:'$paidAt'}
          },
          totalSales:{$sum:"$totalPrice"}
        }
      }
    ]);

    res.json(sales);


  } catch (error) {
    res.status(500).json({error:error.message});
  }
 }

 const findOrderById=async(req,res)=>{
  try {
    const orderById=await Order.find({_id:req.params.id}).populate("user","username email")
if(orderById){
  res.json(orderById);

}else{
  res.status(404);
  throw new Error("Order not Found")
}    
  } catch (error) {
    res.status(500).json({error:error.message});
    
  }
 }

 const markOrderAsPaid=async(req,res)=>{
  try {
    
    const order=await Order.findById(req.params.id);
    if(order){
      order.isPaid=true;
      order.paidAt=Date.now();
      order.paymentResult={
        id:req.body.id,
        
        
      }
      const updateOrder=await order.save();
      res.status(200).json(updateOrder)
    }else{
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
    
  }

 }

 const markOrderAsDelivered=async(req,res)=>{
  try {
  const  order=await Order.findById(req.params.id);
  if(order){
    order.isDelivered=true;
    order.deliveredAt=Date.now();

    const updatedOrder=await order.save();
    res.json(updatedOrder);
  } else{
    res.status(404)
    throw new Error("Order Not Found");
  }
  } catch (error) {
    res.status(500).json({error:error.message});
    
  }
 }
 export {createOrder,getAllOrders,getUserOrders,countTotalOrders,calculateTotalSales,calculateTotalSalesByDate, findOrderById,markOrderAsPaid,markOrderAsDelivered}