import axios from "axios";
import { API_BASE_URL } from "./constants";
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from "./auth";

const useAxios = () => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${access_token}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!isAccessTokenExpired) {
      return req;
    }

    const res = await getRefreshToken(refresh_token);
    setAuthUser(res.access, res.refresh);
    req.headers.Authorization = `Bearer ${refresh_token.data?.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
