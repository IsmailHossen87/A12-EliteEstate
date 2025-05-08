import { Slide } from "react-awesome-reveal";
import { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import SocialLogin from '../Context/AuthProvider/SocialLogin';
import registerImage from "../assets/Register.jpg" 
import useAuth from "../Hooks/useAuth"; 
import "../index.css"

const Login = () => {
    const { user, signIn ,resetPassword} = useAuth();
    const [disabled, setDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        try {
            const result = await signIn(email, password);
            Swal.fire({
                title: 'Login Successful!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate(from, { replace: true } || '/');
        } catch (error) {
            Swal.fire({
                title: 'Login Failed',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    const handleValidateCaptcha = (e) => {
        const userCaptchaValue = e.target.value;
        setDisabled(!validateCaptcha(userCaptchaValue));
      };


      const handleForgotPassword = async () => {
        const email = emailRef.current.value;
      
        if (!email) {
          toast.error("Please enter your email first.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            toastClassName: "bg-slate-800 text-white rounded-xl shadow-lg p-4",
            bodyClassName: "text-base font-medium",
            progressClassName: "bg-red-500 h-1",
          });
          return;
        }
        try {
          await resetPassword(email);
          toast.success("Password reset email sent! Check your inbox.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            toastClassName: "custom-toast p-4", // Apply the custom class for gradient border
            bodyClassName: "text-base font-medium",
            progressClassName: "bg-green-500 h-1",
          });
        } catch (error) {
          toast.error(error.message || "Something went wrong!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark", // Dark theme for errors
            toastClassName: "custom-toast p-4",
            bodyClassName: "text-base font-medium",
            progressClassName: "bg-red-500 h-1",
          });
        }
      }; 

    return (
        <div style={{backgroundImage:`url(${registerImage})`}} className="md:py-20 py-10 flex bg-no-repeat bg-cover bg-center items-center justify-center   px-4">
        <div className="md:flex md:justify-center shadow-lg bg-Darkblue rounded-2xl border-white/20 md:items-center">
          {/* Left Side - Form Section with White Background */}
          <div className="w-full max-w-lg bg-white px-8 py-6 rounded-l-2xl md:rounded-l-2xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Sign In
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <Slide direction="up" triggerOnce>
                <input 
                ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2  focus:ring-blue-800 focus:outline-none placeholder-gray-500"
                  required
                />
              </Slide>
      
              <Slide direction="up" triggerOnce>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2  focus:ring-blue-800 focus:outline-none placeholder-gray-500"
                    required
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
      
              <Slide direction="down" triggerOnce>
                <div>
                  <LoadCanvasTemplate />
                  <input
                    type="text"
                    name="captcha"
                    placeholder="Type the captcha above"
                    onBlur={handleValidateCaptcha}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2  focus:ring-blue-800 focus:outline-none placeholder-gray-500"
                    required
                  />
                </div>
              </Slide>
      
              <div
                onClick={handleForgotPassword}
                className="flex items-center justify-between mb-2"
              >
                <a href="#" className="text-gray-600 underline hover:text-teal-600">
                  Forgot Password?
                </a>
              </div>
      
              <button
                type="submit"
                disabled={disabled}
                className="w-full proCardButton"
              >
                Log In
              </button>
            </form>
      
            <p className="text-center mt-4 text-gray-700">
              New here?{" "}
              <Link to="/register" className="text-teal-600 hover:underline">
                Create an account
              </Link>
            </p>
      
            <div className="divider my-4 text-gray-400">OR</div>
      
            <SocialLogin />
          </div>
      
          {/* Right Side - Info Panel with TealGreen Background */}
          <div className="w-3/4 md:w-[450px] md:mt-4 mx-auto    md:mr-4 px-4 text-white space-y-4 text-center py-6">
            <h3 className="md:text-3xl text-2xl font-bold">Hello, Friends</h3>
            <p className="text-white/80">
              Enter your personal details and start your journey with us
            </p>
            <div className="w-3/4 mx-auto">
              <button type="button" className="w-full mb-4 proCardButton">
                <NavLink to="/register">Sign Up</NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;
