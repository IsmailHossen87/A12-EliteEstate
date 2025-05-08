import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Slide } from "react-awesome-reveal";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import registerImage from "../assets/regi.jpg"
import SocialLogin from "../Context/AuthProvider/SocialLogin";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";  
import "../index.css"

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (data.password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Password Mismatch",
          text: "Password and Confirm Password do not match",
        });
        return; 
      }
  
      const res = await createUser(data.email, data.password);
      const user = res.user;
      await updateUserProfile(data.name, data.photoURL);

      const userInfo = {
        name: data?.name,
        email: data?.email,
        firebaseUid: user.uid,
        photoURL: data?.photoURL,
        role: "user",
        date: new Date(),
      };

      const response = await axiosPublic.post("/user", userInfo);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your sign-up has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      Swal.fire({
        icon: "error",
        title: "Sign-up Failed",
        text: backendMessage || error.message || "Something went wrong",
      });
    }
  };
 
  return (
    <div style={{ backgroundImage: `url(${registerImage})`, }} className=" md:py-20 py-10 flex items-center justify-center px-4 
             bg-no-repeat bg-cover bg-center">
      <div className="md:flex md:justify-center bg-Darkblue shadow-lg rounded-2xl border-white/20 md:items-center">
        {/* Left Side */}
        <div className="w-3/4 md:w-[450px] px-4 mx-auto md:mt-10 md:ml-4  text-white space-y-4 text-center py-6">
          <h3 className="md:text-3xl text-2xl font-bold">Welcome Back!</h3>
          <p className="text-white/80">
            To keep connected with us, please login with your personal info
          </p>
          <div className="w-3/4 mx-auto md:mt-20">
            <button type="submit" className="w-full proCardButton">
              <NavLink to="/login">Sign In</NavLink>
            </button>
          </div>
        </div>

        {/* Right Side (White Background) */}
        <div className="w-full max-w-lg bg-white  shadow-2xs px-8 py-6  rounded-r-2xl ">
          <h2 className="text-2xl md:text-3xl font-bold text-center my-4 text-gray-800">
            Create an Account
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 relative"
          >
            {/* Name */}
            <Slide direction="left" triggerOnce>
              <div>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
            </Slide>

            {/* PHOTO URL*/}
            <Slide  direction="left" triggerOnce>
            <div className="form-control">
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Enter your photo URL"
                  className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500"
                />
                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
              </div>
            </Slide>

            {/* Email */}
            <Slide direction="left" triggerOnce>
              <div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
            </Slide>

            {/* Password */}
            <Slide direction="right" triggerOnce>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <span className="text-red-500 block mt-1">
                    Invalid password format
                  </span>
                )}
              </div>
            </Slide>
            {/* confirmPassword */}
            <Slide direction="left" triggerOnce>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </Slide>

            {/* Submit Button */}
            <button type="submit" className="w-full proCardButton">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-4 text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-600 hover:underline">
              Login
            </Link>
          </p>
          <div className="divider mt-2  text-gray-400">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
