import { useGetAllOrdersQuery ,usePayOrderMutation,useDeliverOrderMutation} from "../../redux/api/orderApiSlice"

import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const BookingList = () => {

const {data:allOrders,isLoading,isError}=useGetAllOrdersQuery();
const [verifyPay,{isLoading:loadingPay}]=usePayOrderMutation();

const paymentHandler=async(id)=>{

try {
const res=await verifyPay({orderId:id}).unwrap();
toast.success("Payment Verified")
//console.log(res)
console.log(id)
} catch (error) {
  toast.error("payment verification failed, Try later")
}
}

const tripHandler=()=>{

}


  return (
    <div className="container mx-[5rem] w-[80vw] ">
      <h1>All Orders</h1>
      {
       isLoading?(<Loader/>): isError?(<Message variant="danger">{isError?.data?.error||isError.error}</Message>):(
        <div className="ml-6 w-[80vw]">
   
        {/* */}
           {allOrders?.map((order)=>(
            <div key={order._id} className="flex flex-col w-[80vw] border px-4 py-2 rounded-lg mx-[4rem] my-[2rem]">
             
            <div className="w-full flex flex-row">
               
               <div className="w-[50%]" >
                <Link to={`/product/${order.orderItem.product}`}>{order.orderItem.name}</Link>
                <h1>User: {order.user.username}</h1>
                <h1>Contact: {order.shippingAddress.contact}</h1>
                <h1>Payment Method: {order.paymentMethod}</h1>
                <h1>Total Price:{order.totalPrice}</h1>
                <h1>Paid At: {order.createdAt}</h1>
                 
               </div>


               <div className="w-[50%] ">
                <img src={order.payImg} alt="" className="w-full rounded-lg object-cover" />
                </div>
               </div>
              <button onClick={()=>paymentHandler(order._id)} className=" rounded-lg px-8 py-2 hover:bg-pink-500 bg-zinc-800" >{order.isPaid?"Payment Verified✅":"Verify Payment"}</button>


              <button 
              className="rounded-lg px-8 py-2 hover:bg-pink-500"
              onClick={()=>tripHandler(order._id)}>{order.isDelivered?"Trip Started":"Trip Yet to Start"}</button>
              
                <div className="w-full bg-green-300"></div>
            </div>
           ))}
        
            </div> 
       )
      }
    </div>
  )
}

export default BookingList
