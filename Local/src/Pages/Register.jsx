import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import SocialLogin from "../Context/AuthProvider/SocialLogin";
import Lottie from "lottie-react";
import registerAnimation from "../assets/lotte/register.json";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((res) => {
      const user = res.user;

      updateUserProfile(data.name, data.photoURL)
      .then(() => {
        const userInfo = { name: data.name, email: data.email,firebaseUid:user.uid , role:'user'};

        axiosSecure.post("/user", userInfo).then((res) => {
          console.log("res",res)
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Your sign-up has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
        
      });
    });
  };
  return (
    <>
      <div className="hero min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className=" md:w-2/4 mx-auto">
          <Lottie
            className="md:w-96 w-60 mx-auto"
            animationData={registerAnimation}
          ></Lottie>
        </div>
          <div className="card flex-shrink-0 w-full max-w-lg shadow-xl bg-white rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  <span>Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className="input input-bordered w-full focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  <span>Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Enter your photo URL"
                  className="input input-bordered w-full focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
              </div>
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="input input-bordered w-full focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors.email && <span className="text-red-600">Email is required</span>}
              </div>
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Enter a strong password"
                  className="input input-bordered w-full focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be at least 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">Password must be less than 20 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must include uppercase, lowercase, number, and special character.
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
            <div className="divider my-4">OR</div>
            <SocialLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
