import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider/AuthProvier";
import useRole from "../Hooks/useRole";
import '../App.css'
import "../index.css"
import { BsMoon, BsSun } from "react-icons/bs";

function Navbar() {
  const { user, logOut, setUser } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [activeButton, setActiveButton] = useState("/");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [role]= useRole()

  const [darkMode,setDarkMode] = useState(()=>{
    return localStorage.getItem('theme')==='dark'
  })
  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme','dark')
    }else{
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme','light')
    }
  })
  const navbar = [
    { title: "Home", link: "/" },
    { title: "All Properties", link: "/PropertyCard" },
    { title: "Contract Us", link: "/contract" },
    { title: "About", link: "/about" },
    ...(user
      ? [
          {
            title: "DashBoard",
            link:
              role === "admin"
                ? "/dashboard/adminProfile"
                : role === "agent"
                ? "/dashboard/agentProfile"
                : "/dashboard/userProfile",
          },
        ]
      : []),
  ];
  

  const handleLogOut = () => {
     logOut()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfully Logged Out",
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(null);
        setActiveButton("/login");
        navigate("/login");
      })
      .catch((error) => console.error("Logout Error:", error.message));
  };
  // for scroll
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`py-4 bg-lightblue text-white sticky top-0 px-4 z-50 shadow-md transition-all duration-300 ${
        isScrolled ? "opacity-60 backdrop-blur-sm" : "opacity-100"
      }`}
    >
      <div className=" flex justify-between  items-center">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold text-white">
          <span className="text-3xl">🏠</span>
          <Link to={`/`}>
            <span className="text-3xl font-lobster md:ml-2"><span className="font-serif md:text-4xl">L</span>and<span className="text-green-400 font-serif md:text-4xl">S</span>phere</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navbar.map((item, index) => (
            <NavLink
              to={item.link}
              key={index}
              className={({ isActive }) =>
                `py-2 px-4 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-blue-800 text-white shadow-lg"
                    : " hover:bg-Darkblue hover:text-white"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}

          {user ? (
            <div className="relative flex items-center gap-4">
              {/* User Dropdown */}
              <div
                className="relative cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full border-2 border-blue-600"
                />
                {dropdownOpen && ''}
                <FaCaretDown className="absolute right-2 bottom-0 " />
              </div>
              <button
                onClick={handleLogOut}
                className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
              >
                Log Out
              </button>
              {/* <button onClick={()=>  setDarkMode(!darkMode)} className="btn bg-blue-600  text-white">{darkMode ? <BsSun/> : <BsMoon/>  }</button> */}
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `py-2 px-4 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-blue-800 text-white shadow-lg"
                    : " hover:bg-Darkblue hover:text-white"
                }`}
              onClick={() => setActiveButton("/login")}
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl text-green-500"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            className="fixed top-0 left-0 h-full w-4/5 bg-Darkblue  text-white z-50 shadow-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
          >
            <div className="p-6 flex flex-col gap-4">
              {navbar.map((item, index) => (
                <NavLink
                  to={item.link}
                  key={index}
                  className={({ isActive }) =>
                    `py-2 px-4 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-blue-800 text-white shadow-lg"
                        : "hover:bg-Darkblue  hover:text-white"
                    }`
                  }
                  onClick={() => setToggle(false)}
                >
                  {item.title}
                </NavLink>
              ))}

              {user ? (
                <button
                  onClick={() => {
                    handleLogOut();
                    setToggle(false);
                  }}
                  className="block py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                >
                  Log Out
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                    activeButton === "/login"
                      ? "bg-yellow-600 text-white shadow-lg"
                      : "hover:bg-yellow-600 hover:text-white"
                  }`}
                  onClick={() => {
                    setActiveButton("/login");
                    setToggle(false);
                  }}
                >
                  Login
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
