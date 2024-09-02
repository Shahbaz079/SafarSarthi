
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { savePaymentMethod, saveShippingAddress } from "../../redux/api/features/cart/cartSlice"
//import { useGetProductByIdQuery } from "../../redux/api/productApiSlice";
import { useNavigate } from "react-router-dom"

const Booking = () => {
const navigate=useNavigate();
  
 const bookings=useSelector(state=>state.bookings);

 const {shippingAddress}=bookings;
 const {paymentMethod}=bookings;

 
 const [address,setAddress]=useState(shippingAddress.address || "");

 const [city,setCity]=useState(shippingAddress.city||" ");

 const [contact,setContact]=useState(shippingAddress.contact || null);

 const [country,setCountry]=useState(shippingAddress.country || " ");

 const [payment,setPayment]=useState(paymentMethod  || "")
 
 const dispatch=useDispatch();

  
 const submitHandler=(e)=>{
  e.preventDefault();

  dispatch(saveShippingAddress({address,city,contact,country}))
  dispatch(savePaymentMethod({payment}));
  navigate('/placeorder')
 }


  return (
    <div className="lg:ml-[5rem] w-[70vw] mx-[1.5rem]">

<form onSubmit={submitHandler} 
className="w-[80%]">
          <h1 className="text-2xl font-semibold mb-4">Personal Details</h1>
          <div className="mb-4">
            <label className="block text-white mb-2">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">City</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Phone No.</label>
            <input
              type="Number"
              className="w-full p-2 border rounded"
              placeholder="Enter Your Phone Number"
              value={contact}
              required
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Country</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4 w-[50%]">
            <label className="block text-gray-400">Select Payment Method</label>
            <select value={payment} onChange={(e)=>setPayment(e.target.value)}>
                <option value="">Select</option>
                <option value="googlePay">GooglePay</option>
                <option value="phonepe">PhonePe</option>
            </select>
          </div>

          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full 
            text-lg w-full"
            type="submit"
          >
            Continue
          </button>
        </form>
    </div>
  )
}

export default Booking
