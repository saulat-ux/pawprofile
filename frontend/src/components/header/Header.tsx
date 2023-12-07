import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/dogg.png";

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
            <li className="text-black hover:text-gray-800 transition duration-300 hover:underline focus:underline">
              <NavLink to={"breedlist"}>My Breeds</NavLink>
            </li>
            <li className="text-black hover:text-gray-800 transition duration-300 hover:underline focus:underline">
              <NavLink to={"login"}>Login</NavLink>
            </li>
            <li className="text-black hover:text-gray-800 transition duration-300 hover:underline focus:underline">
              <NavLink to={"register"}>Register</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
