import axios from "axios";
import useStore from "@/store";

const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

const axiosIntance = axios.create({
  baseURL,
});

axiosIntance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("access_token");
    const token = useStore.getState().user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosIntance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.data?.message === "Missing or malformed JWT") {
      console.log("axioError", error);
      sessionStorage.clear();
      sessionStorage.clear();
      // window.location.replace(`${window.location.origin}/login`);
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
