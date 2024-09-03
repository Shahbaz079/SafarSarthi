
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../../lib/utils";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../redux/api/usersApiSlice";
import { logout } from "../../../redux/api/features/auth/authSlice";
export const FloatingNav = ({
  user,
  navItems,
  className,

}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  user:{isAdmin:boolean,username:string,_id:string}
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });
  const [open,setOpen]=useState(false);

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            to={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        {user?(
             <button onClick={()=>setOpen(!open)} className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
             <span>{user.username}</span>
             <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />

             {open?(<div className="absolute top-[200%] rounded-lg right-0 w-[150%] bg-slate-400">
              <Link to="" 
                onClick={logoutHandler}
               className="block px-4 hover:bg-gray-100">
                  Logout
                </Link>
             </div>)
             :(<></>)}
           </button>
        ):(<>
          <Link to="/login" className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </Link>

        <Link to="/register" className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Register</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </Link>
        </>
        
        )}
     
      </motion.div>
    </AnimatePresence>
  );
};
