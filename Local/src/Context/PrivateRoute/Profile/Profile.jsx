import { Helmet } from "react-helmet-async";
import coverImg from "../../../assets/cover.jpg";
import useAuth from "../../../Hooks/useAuth";
import userImage from '../../../assets/user.png'
import ReusableTitle from "../../../Components/ReusableTitle";


const Profile = ({role}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <span className="loading loading-spinner bg-red-500 loading-lg "></span>
    );
  } else {
    console.log("");
  }
  return (
    <>
      <div className=" justify-center  items-center lg:min-h-screen rounded-lg py-6  px-4  lg:px-8">
        <Helmet>
          <title>Profile</title>
        </Helmet> 
      <ReusableTitle  title='My Profile ' subtitle='View and manage your personal information and account details'/>
        <div className="bg-white shadow-lg rounded-2xl w-full   ">
          <img
            alt="cover photo"
            src={coverImg}
            className="w-full h-40 sm:h-48 md:h-56 rounded-t-lg object-cover"
          />
          <div className="flex flex-col items-center justify-center p-4 -mt-16">

            <a href="#" className="relative block">
              <img
                alt="profile"
                src={user.photoURL || userImage}
                className="mx-auto object-cover rounded-full h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 border-4 border-white"
              />
            </a>

            <p className="mt-2 p-1 px-3 text-xs sm:text-sm md:text-base text-white bg-lime-500 rounded-full">
              {role}
            </p>
            <p className="mt-2 text-lg truncate sm:text-xl font-medium text-gray-800 w-full text-center">
              User ID: {user.uid}
            </p>
            <div className="w-full p-2 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-600">
                <p className="flex flex-col items-center sm:items-start">
                  Name
                  <span className="font-bold text-black text-center sm:text-left">
                    {user.displayName}
                  </span>
                </p>
                <p className="flex flex-col items-center sm:items-start">
                  Email
                  <span className="font-bold text-black text-center sm:text-left">
                    {user.email}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
