import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import SocialLogin from '../Context/AuthProvider/SocialLogin';
import useAuth from '../Hooks/useAuth';
import loginAnimation from "../assets/lotte/loginAnimation.json";
import Lottie from "lottie-react";

const Login = () => {
    const { user, signIn } = useAuth();
    const [disabled, setDisabled] = useState(true);
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


    return (
        <div className="hero min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="md:w-2/4 mx-auto">
                    <Lottie
                        className="md:w-96 w-60 mx-auto"
                        animationData={loginAnimation}
                    />
                </div>
                <div className="card lg:w-1/2 max-w-lg shadow-xl bg-white rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Welcome Back</h2>
                    <form onSubmit={handleLogin} className="space-y-2">
                        <div className="form-control">
                            <label className="label  font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-indigo-200 rounded-md"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label  font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-indigo-200 rounded-md"
                                required
                            />
                            <div className="mt-2 text-right">
                                <Link to="/forgot-password" className="text-sm text-indigo-500 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                        <div className="form-control">
                            <LoadCanvasTemplate />
                            <input
                                type="text"
                                name="captcha"
                                placeholder="Type the captcha above"
                                onBlur={handleValidateCaptcha}
                                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-indigo-200 rounded-md mt-2"
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                disabled={disabled}
                                className={`btn w-full rounded-md text-white ${
                                    disabled ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'
                                }`}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        New here?{' '}
                        <Link to="/register" className="text-indigo-500 hover:underline">
                            Create an account
                        </Link>
                    </p>
                    <div className="divider my-6 text-gray-500">OR</div>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;
