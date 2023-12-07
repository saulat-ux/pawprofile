import  { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, register } from '../../redux/features/auth/authSlice';


const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword:"",
}

const Register = () => {
  const [formData , setFormData] = useState(initialState)
  const { name, email, password, cPassword} = formData;
  const dispatch = useDispatch();
  const {isLoading, isLoggedIn , isSuccess} = useSelector((state) => state.auth)
  const navigate = useNavigate();
 

  const handleInputChange= (e) => {
   const {name, value} = e.target
   setFormData({ ...formData, [name]: value})
  }

   const registerUser = async (e) => {
       e.preventDefault()


      const userData = {
       name,
       email,
       password,
      }

      await dispatch(register(userData))
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
      <form className="space-y-4" onSubmit={registerUser}>
      <div>
          <label htmlFor="email" className="block text-black">Name</label>
          <input  onChange={handleInputChange} type="email" value={name} className="w-full rounded-md border-none py-2 px-3 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="email" className="block text-black">Email</label>
          <input  onChange={handleInputChange} type="email" value={email} className="w-full rounded-md border-none py-2 px-3 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="password" className="block text-black">Password</label>
          <input  onChange={handleInputChange} type="password" value={password} className="w-full rounded-md border-none py-2 px-3 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="password" className="block text-black">Confirm Password</label>
          <input  onChange={handleInputChange} type="password" value={cPassword} className="w-full rounded-md border-none py-2 px-3 focus:outline-none" />
        </div>
        <button type="submit" className="w-full bg-black text-yellow-400 py-2 rounded-md hover:bg-yellow-500 transition duration-300">
          Register
        </button>
      </form>
    </div>
  </div>
  )
}

export default Register