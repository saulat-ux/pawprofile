import  { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { RESET_AUTH, login } from '../../redux/features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("")
    const {isLoading, isLoggedIn , isSuccess} = useSelector((state) => state.auth)
   const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault()
  
   const userData = {
    email,
    password,
   }
   

   await dispatch(login(userData))

}
useEffect(() => {
    if(isSuccess && isLoggedIn) {
        navigate("/")

    }
    dispatch(RESET_AUTH())
},[isSuccess, isLoggedIn, dispatch, navigate])

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="bg-yellow-400 p-8 rounded-lg shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
      <form className="space-y-4" onSubmit={loginUser}>
        <div>
          <label htmlFor="email" className="block text-black">Email</label>
          <input onChange={(e) => setEmail(e.target.value) } type="email" value={email} className="w-full rounded-md border-none py-2 px-3 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="password" className="block text-black">Password</label>
          <input onChange={(e) => setPassword(e.target.value) } type="password" value={password} className="w-full rounded-md border-none py-2 px-3 focus:outline-none" />
        </div>
        <button type="submit" className="w-full bg-black text-yellow-400 py-2 rounded-md hover:bg-yellow-500 transition duration-300">
          Log In
        </button>
      </form>
    </div>
  </div>
  )
}

export default Login