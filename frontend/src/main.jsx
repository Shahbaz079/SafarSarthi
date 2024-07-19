import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import {Route,RouterProvider,createRoutesFromElements} from "react-router";
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/api/features/store.js';

//PrivatRoute
import PrivateRoute from './Components/PrivateRoute.jsx';

//auth
import Login from './pages/auth/Login.jsx';
import Registration from './pages/auth/Registration.jsx';
import Profile from './pages/user/Profile.jsx';
import AdminRoutes from './pages/admin/AdminRoutes.jsx';
import UserList from './pages/admin/UserList.jsx';
import CategoryList from './pages/admin/CategoryList.jsx';
import ProductList from './pages/admin/ProductList.jsx';
import UpdateProduct from './pages/admin/UpdateProduct.jsx';
import AllProducts from './pages/admin/AllProducts.jsx';
import Home from './pages/Home.jsx';
import Favourites from './pages/products/Favourites.jsx';
import ProductDetail from './pages/products/ProductDetail.jsx';
//import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';
//import Shipping from './pages/Orders/Shipping.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';
import MyBookings from "./pages/MyBookings.jsx"

import Booking from './pages/Orders/Booking.jsx';
import BookingList from './pages/admin/BookingList.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

<Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Registration/>}/>

      <Route path='/' index={true} element={<Home/>}/>
      <Route path='/favourites' element={<Favourites/>}/>
      <Route path='/product/:id' element={<ProductDetail/>}/>
      <Route path='/mybookings' element={<MyBookings/>}/>
      <Route path='/shop' element={<Shop/>}/>

    <Route path='' element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
     {/*   <Route path='/shipping' element={<Shipping/>}/> */}
    <Route path='/placeorder' element={<PlaceOrder/>}/>
      <Route path='/booking' element={<Booking/>}/>
     

    </Route>

     {/*Admin Route*/ }

     <Route path='/admin' element={<AdminRoutes/>}>
       <Route path='userlist' element={<UserList/>} />
       <Route path='categorylist' element={<CategoryList/>}/>
       <Route path='productlist' element={<ProductList/>}/>
       <Route path='productlist/:pagenumber' element={<ProductList/>}/>
       <Route path='allproductslist' element={<AllProducts/>}/>
       <Route path='bookinglist' element={<BookingList/>}/>
        <Route path='product/update/:_id' element={<UpdateProduct/>}/>
        <Route path='dashboard' element={<AdminDashboard/>}/>
       
     </Route >
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    
<RouterProvider router={router} />

  </Provider>
)
