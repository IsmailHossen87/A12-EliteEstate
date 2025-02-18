import React from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = UseAxiosSecure()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';

  const navigate = useNavigate();
  const handlelogin = () => {
    googleLogin().then((res) => {
      const user =res.user;
      const userInfo = {
        email: res?.user?.email,
        name: res?.user?.displayName,
        firebaseUid:user.uid,
        role:'user'
      };
      axiosSecure.post("/user", userInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your signUp has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log("social login")
      });
       navigate(from, { replace: true } || '/');
    });
  };
  return (
    <div>
      <div className="flex justify-center p-5">
        <button onClick={handlelogin} className="btn">
          <FcGoogle className="text-3xl"></FcGoogle>
          Continue with google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
