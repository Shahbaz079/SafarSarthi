import logo from "../../../../logo/logo.png" 
import React from "react";
import { FloatingNav } from "./floating-navbar";
//import { IconHome, IconMessage, IconUser } from "react-icons";
import { AiFillHome ,AiFillMessage} from "react-icons/ai"
import { FaUserCircle ,FaCar} from "react-icons/fa"
import { MdOutlineExplore } from "react-icons/md"
import { FcLikePlaceholder } from "react-icons/fc"

export function FloatingNavDemo({user,logout}) {
  const navItems = [
    {
      name: "SafarSarthi",
      link: "/",
      icon: <img src={logo} className="w-[4rem]" />,
    },
    {
      name: "Home",
      link: "/",
      icon: <AiFillHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "My Bookings",
      link: "/mybookings",
      icon: <FaCar className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Explore",
      link: "/shop",
      icon: (
        <MdOutlineExplore className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Wishlist",
      link: "/favourites",
      icon: (
        <FcLikePlaceholder className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
   
    
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} user={user} />
      <DummyContent />
    </div>
  );
}
const DummyContent = () => {
  return (
    <></>
  );
};
