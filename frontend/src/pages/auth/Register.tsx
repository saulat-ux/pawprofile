import  { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


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
    if(!email || !password){
     return toast.error("all fields are required")
    }
    if(password.length < 6){
     return toast.error("password must be greater than 6 characters")
    }
    if(password !== cPassword){
     return toast.error("Passwords do not match")
    }

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
          <label  className=" text-black">Name</label>
          <input type="text" className='w-full rounded-md border-none py-2 px-3 focus:outline-none'
                        placeholder='Name'
                        required
                        value={name}
                        name='name'

                        onChange={handleInputChange}
                    />
         
        </div>
        <div>
          <label  className=" text-black">Email</label>
          <input type="text" className='w-full rounded-md border-none py-2 px-3 focus:outline-none'
                        placeholder='Email'
                        required
                        value={email}
                        name='email'

                        onChange={handleInputChange}
                    />
        </div>
        <div>
          <label className=" text-black">Password</label>
          <input type="password" className='w-full rounded-md border-none py-2 px-3 focus:outline-none'
                    placeholder='password'
                    required
                    value={password}
                    name='password'

                    onChange={handleInputChange} />
        </div>
        <div>
          <label  className=" text-black">Confirm Password</label>
          <input type="password" className='w-full rounded-md border-none py-2 px-3 focus:outline-none'
                        placeholder='Confirm Password'
                        required
                        value={cPassword}
                        name='cPassword'

                        onChange={handleInputChange}
                    />
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