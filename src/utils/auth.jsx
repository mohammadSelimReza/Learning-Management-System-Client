import axios from "axios";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import apiInstance from "./axios";
export const login = async (email, password) => {
  try {
    const { data, status } = await apiInstance.post("user/token/", {
      email,
      password,
    });

    if (status === 200) {
      setAuthUser(data.access, data.refresh);

      alert("Login Successfully!!!");
    }
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data || "Something went wrong!!",
    };
  }
};

export const registration = async (full_name, email, password, password2) => {
  try {
    const { data } = await apiInstance.post("user/registration/", {
      full_name,
      email,
      password,
      password2,
    });

    await login(email, password);
    alert("Registration Successfully");
    return { data, error: null };
  } catch (error) {
    console.log(error.response.data.email);
    console.log(error.response.data.password);
    return {
      data: null,
      error: error.response?.data || "Something went wrong!!!",
    };
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  useAuthStore.getState().setUser(null);
  alert("Logout Successfully.");
};

export const setUser = async () => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  if (!access_token || !refresh_token) {
    // alert("No user token found!");
    return;
  }
  if (isAccessTokenExpired(access_token)) {
    const response = getRefreshToken(refresh_token);
    setAuthUser(response.access, response.refresh);
  } else {
    setAuthUser(access_token, refresh_token);
  }
};

export const setAuthUser = (access_token, refresh_token) => {
  localStorage.setItem("access_token", access_token, {
    expires: 1,
    secure: true,
  });
  localStorage.setItem("refresh_token", refresh_token, {
    expires: 7,
    secure: true,
  });

  const user = jwtDecode(access_token) ?? null;

  if (user) {
    useAuthStore.getState().setUser(user);
  }
  useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const response = await axios.post("token/refresh/", {
    refresh: refreshToken,
  });
  return response.data;
};

export const isAccessTokenExpired = (access_token) => {
  try {
    const decoded_token = jwtDecode(access_token);
    return decoded_token.exp < Date.now() / 1000;
  } catch (error) {
    console.log(error);
    return true;
  }
};
