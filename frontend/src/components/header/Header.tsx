import { Link, NavLink,useNavigate  } from "react-router-dom";
import logoImg from "../../assets/dogg.png";
import { useDispatch } from 'react-redux';
import { RESET_AUTH, logout } from '../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/HiddenLink';



const logo = (
  <div className="text-3xl pt-5">
    <Link to="/">
      <h2>
        PawProfile<span className="text-yellow-100">Pro</span>.
      </h2>
    </Link>
  </div>
);

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logoutUser = async() => {
    await dispatch(logout())
    await dispatch(RESET_AUTH())
    navigate("/login")
 
  
   }

  return (
    <header>
      <div className="bg-yellow-400 font-abc">
        <nav className="container mx-auto flex flex-wrap justify-between items-center px-4 md:px-0 py-4">
          <div className="flex gap-2 items-center">
            <img src={logoImg} alt="" width={70} />
            {logo}
          </div>

          <ul className="flex flex-col md:flex-row gap-6 md:gap-12 md:text-2xl">
            <li className="text-black hover:text-gray-800 hover:underline focus:underline">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="text-black hover:text-gray-800 transition duration-300 hover:underline focus:underline">
              <NavLink to={"breeds"}>Breeds</NavLink>
            </li>
            <ShowOnLogin>
            <li className="text-black hover:text-gray-800 transition duration-300 hover:underline focus:underline">
              <NavLink to={"breedlist"}>My Breeds</NavLink>
            </li>
            </ShowOnLogin>
            <ShowOnLogout>
            <li className="text-black hover:text-gray-800 transition duration-300 hover:underline focus:underline">
              <NavLink to={"login"}>Login</NavLink>
            </li>
            </ShowOnLogout>
            <ShowOnLogout>
            <li className="text-black hover:text-gray-800 transition duration-300 hover:underline focus:underline">
              <NavLink to={"register"}>Register</NavLink>
            </li>
            </ShowOnLogout>
            <ShowOnLogin>
            <li className="text-black hover:text-gray-800 transition duration-300 hover:underline focus:underline" onClick={logoutUser}>
              <NavLink to={"logout"}>Logout</NavLink>
            </li>
            </ShowOnLogin>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
