import logo from "../../../logo/logo.png"
import React from 'react';
import { useState } from 'react';
import {AiOutlineHome,AiOutlineShopping,AiOutlineLogin,AiOutlineUserAdd,AiOutlineShoppingCart} from "react-icons/ai";
import FavouritesCount from '../products/FavouritesCount';
import {FaHeart} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import "./Navigation.css"
import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/api/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingNavDemo } from "../../Components/ui/floatingNavbar/FloatingNavDemo";

const Navigation = () => {

const {userInfo}=useSelector(state=>
state.auth
)
const {bookedItems}=useSelector(state=>state.bookings)

  const [dropdownOpen,setDropdownSidebar]=useState(false);

const [showSidebar,setShowSidebar]=useState(false);

const toggleDropdown=()=>{
  setDropdownSidebar(!dropdownOpen)
}

const toggleSidebar=()=>{
  setShowSidebar(!showSidebar)
}

const closeSidebar=()=>{
  setShowSidebar(false);
}

const dispatch=useDispatch()
const navigate=useNavigate()

const [logoutApiCall]=useLogoutMutation();

const logoutHandler=async ()=>{
  try {
    await logoutApiCall().unwrap();
    dispatch(logout());
    navigate("/login");
  } catch (error) {
    console.error(error)
  }
}


return (<>
    <div className="" id="smallNav">
      <FloatingNavDemo user={userInfo} />
    </div>
    <div 
    style={{zIndex:999}}
    className={`nav ${showSidebar?"hidden":"flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[5%] hover:w-[15%] h-[100vh] fixed top-0 bottom-0`}

    id="navigation-container"
    >

      <div className="flex flex-col justify-center " id="nav-1">
       <div >
          <img src={logo} className="w-[6rem] ml-1" />
        </div> 
        <Link
        to="/"
        className='flex items-center transition-transform  transform hover:translate-x-2'

        >
          <AiOutlineHome className='mr-2 mt-[2rem]' size={26} />
          <span className='hidden nav-item-name mt-[3rem] text-white'>HOME</span>{" "}
        </Link>
      
       <Link
        to="/mybookings"
        className='relative flex items-center transition-transform  transform hover:translate-x-2'

        >
          <AiOutlineShoppingCart className='mr-2 mt-[2rem]' size={26} />
          <span className='hidden nav-item-name mt-[3rem]'>My Bookings</span>{""}


          <div className='absolute top-9'>
            {bookedItems.length>0 && (
              <span>
                <span className='px-1 py-0 text-sm text-white bg-pink-500 rounded-full'>
                  {bookedItems.reduce((acc,item)=>acc,0)}
                </span>
              </span>
            )}
          </div>
        </Link> 


      
        <Link
        to="/shop"
        className='flex items-center transition-transform  transform hover:translate-x-2'

        >
          <AiOutlineShopping className='mr-2 mt-[2rem]' size={26} />
          <span className='hidden nav-item-name mt-[3rem]'>Explore</span>{" "}

        </Link>
      
        <Link
        to="/favourites"
        className='flex items-center transition-transform  transform hover:translate-x-2'

        >
          <FaHeart className='mr-2 mt-[2rem] ' size={26} />
          <span className='hidden nav-item-name mt-[3rem]'>Wishlist</span>{" "}
          <FavouritesCount/>
        </Link>
      </div>

      <div className="relative" id="nav-2">
      <button
      onClick={toggleDropdown}
      className='flex items-center text-gray-8000 focus:outline-none'
      >
        {userInfo?<span className='text-white'>{userInfo.username}</span>:<></>}

        {userInfo && (
          <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`h-4 w-4 ml-1 ${
            dropdownOpen?"transform rotate:180":""
          }`}

          fill='none'
          viewBox='0 0 24 24'
          stroke='white'
          >
            <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth="2"
            d={dropdownOpen?"M5 15l7-7 7 7 ":"M19 9l-7 7-7-7"}
            />
          </svg>
        )}
      </button>
      {
        dropdownOpen && userInfo && (
          <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
            userInfo.isAdmin?'bottom-10':'bottom-10'
          }`}>
            {userInfo.isAdmin ? (
              <>
              <li>
                <Link to="/admin/dashboard" 
                className="block px-4 hover:bg-gray-100">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/admin/productlist" 
                className="block px-4 hover:bg-gray-100">
                  Create Package
                </Link>
              </li>
{/*
              <li>
                <Link to="/admin/categorylist" 
                className="block px-4 hover:bg-gray-100">
                  Category
                </Link>
              </li>
*/}
              <li>
                <Link to="/admin/bookinglist" 
                className="block px-4 hover:bg-gray-100">
                 Client Bookings
                </Link>
              </li>

              <li>
                <Link to="/admin/userlist" 
                className="block px-4 hover:bg-gray-100">
                  Users
                </Link>
              </li>

              <li>
                <Link to="/admin/profile" 
                className="block px-4 hover:bg-gray-100">
                  My Profile
                </Link>
              </li>

              <li>
                <Link  
                onClick={logoutHandler}
               className="block px-4 hover:bg-gray-100">
                  Logout
                </Link>
              </li>
              </>
            ):(<>
             <li>
                <Link 
                onClick={logoutHandler}
               className="block px-4 hover:bg-gray-100">
                  Logout
                </Link>
              </li>

              
              <li>
                <Link to="/profile" 
                className="block px-4 hover:bg-gray-100">
                 My Profile
                </Link>
              </li>
            </>)}

          </ul>
        )
      }
      </div>

      {!userInfo && (
        <ul>
          <li> 
            <Link
        to="/login"
        className='flex items-center transition-transform  transform hover:translate-x-2'

        >
          <AiOutlineLogin className='mr-2 mt-[3rem]' size={26} />
          <span className='hidden nav-item-name mt-[3rem]'>Login</span>
        </Link>
        </li>

        <li> 
            <Link
        to="/register"
        className='flex items-center transition-transform  transform hover:translate-x-2'

        >
          <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26} />
          <span className='hidden nav-item-name mt-[3rem]'>Register</span>
        </Link>
        
        </li>
        </ul>
      )}

        

    </div>  </>
  ) 
}

export default Navigation;
