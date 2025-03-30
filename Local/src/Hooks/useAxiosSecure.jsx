import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://eliteestate-rho.vercel.app",
  // baseURL: "http://localhost:5000",

});

const UseAxiosSecure = () => {
  const {logOut,loading}= useAuth()
  const navigate = useNavigate()
  axiosSecure.interceptors.request.use(function(config){
    
    const token = localStorage.getItem('token')
    if(token){
      config.headers.authorization=`Bearer ${token}`
    }
    return config
  },function(error){
    return Promise.reject(error)
  })
  // step 2
  axiosSecure.interceptors.response.use(function(response){
    return response
  },async(error)=>{
    const status = error.response?.status
    if(status === 401 || status === 403){
      await logOut()
      navigate('/login')
    }
    return Promise.reject(error)
  })
    return axiosSecure;
};

export default UseAxiosSecure;


