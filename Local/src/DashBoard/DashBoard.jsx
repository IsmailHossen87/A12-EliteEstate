
import { useEffect, useState } from "react";
import { FaBars, FaBuilding, FaClipboardList, FaHeart, FaHome, FaStar, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import UseReviews from "../Hooks/Users/UseReviews";
import UseWishList from "../Hooks/Users/UseWishList";
import "../index.css"


const DashBoard = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const [reviews] = UseReviews(user?.email);
  const [wishlist] = UseWishList();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const renderNavLinks = () => {
    if (role === "admin") {
      return (
        <>
          <div className="space-y-3 mt-2">
          <NavLink to="/dashboard/adminProfile" className={getLinkClasses}><FaUser /> Admin Profile</NavLink>
          <NavLink to="/dashboard/adminManage" className={getLinkClasses}><FaClipboardList /> Manage Properties</NavLink>
          <NavLink to="/dashboard/manageRole" className={getLinkClasses}><FaUser /> Manage Role</NavLink>
          <NavLink to="/dashboard/adminReview" className={getLinkClasses}><FaStar /> Manage Reviews</NavLink>
          <NavLink to="/dashboard/advertiseProperty" className={getLinkClasses}><FaStar /> Advertise Property</NavLink>
          </div>
        </>
      );
    } else if (role === "agent") {
      return (
        <>
         <div className="space-y-3 mt-2">
         <NavLink to="/dashboard/agentProfile" className={getLinkClasses}><FaUser /> Agent Profile</NavLink>
         <NavLink to="/dashboard/addProperty" className={getLinkClasses}><FaBuilding /> Add Property</NavLink>
          <NavLink to="/dashboard/agentAdded" className={getLinkClasses}><FaClipboardList /> My Added</NavLink>
          <NavLink to="/dashboard/agentSold" className={getLinkClasses}><FaHome /> My Sold</NavLink>
          <NavLink to="/dashboard/agentRequested" className={getLinkClasses}><FaClipboardList /> Requested</NavLink>
         </div>
        </>
      );
    } else {
      return (
        <>
        <div className="space-y-3 mt-2">
        <NavLink to="/dashboard/userProfile" className={getLinkClasses}><FaUser /> User Profile</NavLink>
          <NavLink to="/dashboard/WishList" className={getLinkClasses}><FaHeart /> WishList ({wishlist.length})</NavLink>
          <NavLink to="/dashboard/propertyBought" className={getLinkClasses}><FaHome /> Property Bought</NavLink>
          <NavLink to="/dashboard/reviews" className={getLinkClasses}><FaStar /> My Reviews ({reviews.length})</NavLink>
        </div>
        </>
      );
    }
  };

  const getLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 font-semibold transition py-2 px-4 rounded-md ${
      isActive ? " bg-[#0052FF] text-white shadow-md" : "bg-blue-800 hover:bg hover:text-black text-white"
    }`;

  return (
    <div className="md:flex flex-wrap">
      {/* Sidebar */}
      <div className="w-full lg:w-3/12 bg-lightblue py-4 flex flex-col lg:block lg:min-h-screen">
        {/* Hamburger Menu for Tablets */}
        <div className="block  lg:hidden px-4">
          <button
            className="text-white text-xl flex items-center gap-2"
            onClick={toggleDropdown}
          >
            <FaBars />
          </button>
        </div>

        {/* Dropdown Menu */}
        <div className={`lg:block ${isDropdownOpen ? "block" : "hidden"} px-4`}>
          {renderNavLinks()}
          <div className="divider text-white">----OR----</div>
          <div className="space-y-3 mt-2">
          <NavLink to="/" className={getLinkClasses}><FaHome /> Home</NavLink>
          <NavLink to="/PropertyCard" className={getLinkClasses}><FaBuilding /> All Properties</NavLink>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:flex-1 p-6 bg-[#141d51]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
