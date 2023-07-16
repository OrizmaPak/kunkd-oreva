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
    if (error?.response?.status === 401) {
      //   window.location = "/login?reason=session_expired";
      //   localStorage.removeItem("access_token");
      //   localStorage.removeItem("business_domain");
      //   localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
