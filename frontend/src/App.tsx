import { BrowserRouter, Routes ,Route } from "react-router-dom"
import Home from "./pages/home/Home"
import { Breeds } from "./pages/breed/Breeds"
import ListOfBreeds from "./pages/breed/ListOfBreeds"
import Header from "./components/header/Header"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Footer from "./components/footer/Footer"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getLoginStatus } from "./redux/features/auth/authSlice"



function App() {
  axios.defaults.withCredentials = true
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoginStatus())
  },[dispatch])
 
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element= {<Home/>} />
          <Route path="/login" element= {<Login/>} />
          <Route path="/register" element= {<Register/>} />
          <Route path="/breeds" element= {<Breeds/>} />
          <Route path="/breedlist" element= {<ListOfBreeds/>} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
