import {useState,useEffect} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/api/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../Components/Loader'
import {LoginDemo} from "../../Components/ui/signupForm/LoginDemo.tsx"

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [login,{isLoading}]=useLoginMutation();

  const {userInfo}=useSelector(state=>state.auth)

  const {search}=useLocation();
  const sp=new URLSearchParams(search);
  const redirect=sp.get('redirect')|| '/';

  useEffect(()=>{
    if (userInfo){
      navigate(redirect);
    }},[navigate,redirect,userInfo]
  )

const submitHandler=async (e)=>{
  e.preventDefault()

  try {
    const res=await login({email,password}).unwrap()
    console.log(res)
    dispatch(setCredentials({...res}))
  } catch (error) {
    toast.error(error?.data?.message||error.message)
  }
}

  return ( 
<> <LoginDemo/>
  {/*}
  <section className='pl-[10rem] flex flex-wrap'>
    <div className="mr-[2rem] mt-[5rem] w-[30%]">
      <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

      <form onSubmit={submitHandler} className='container w-[100%]'>
        <div className="my-[2rem]">
            <label htmlFor='email' className='block text-sm font-medium text-black'>Email Address</label>
            <input type='email' id='email' className='mt-1 p-2 border  rounded w-full ' 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            ></input>
        </div>

        <div className="my-[2rem]">
            <label htmlFor='password' className='block text-sm font-medium text-black'>Password</label>
            <input type='password' id='password' className='mt-1 p-2 border rounded w-full' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            ></input>
        </div>

        <button disabled={isLoading} type='submit' className='bg-pink-500 text-white py-2 px-4 rounded cursor-pointer my-[1rem]'>
          {isLoading?"Signing In......":"Sign In" }
        </button>

        {isLoading&&<Loader/>}

      </form>
    <div className="mt-4">
      <p className="text-black">
        New Customer?{" "}
        <Link to={redirect?`/register?redirect=${redirect}`:'/register'}
        className='text-pink-500 hover:underline'
        >
          Register
        </Link>
      </p>
    </div>

    </div>
    <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className=" h-[20%] w-[65%] xl:block md:hidden sm:hidden rounded-lg"
        />
    </section>    
    */}
  </>)
}

export default Login
