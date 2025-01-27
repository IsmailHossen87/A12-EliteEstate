import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://server-cyan-one.vercel.app",
  // baseURL: "https://server-cyan-one.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
