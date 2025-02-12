import axios from "axios";
import { API_BASE_URL } from "./constants";
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from "./auth";

const useAxios = () => {
  let access_token = localStorage.getItem("access_token");
  let refresh_token = localStorage.getItem("refresh_token");

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${access_token}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!access_token || !refresh_token) {
      console.error("No access or refresh token found");
      return req;
    }

    if (isAccessTokenExpired(access_token)) {
      try {
        const res = await getRefreshToken(); 
        if (res && res.access) {
          setAuthUser(res.access, res.refresh);
          req.headers.Authorization = `Bearer ${res.access}`; 
          access_token = res.access;
        } else {
          console.error("Refresh token expired, logging out");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      } catch (error) {
        console.error("Failed to refresh token", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    } else {
      req.headers.Authorization = `Bearer ${access_token}`;
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
