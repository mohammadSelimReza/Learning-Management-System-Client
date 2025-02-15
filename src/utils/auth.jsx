import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import apiInstance from "./axios";
import Toast from "../views/plugin/Toast";

export const login = async (email, password) => {
  try {
    const { data, status } = await apiInstance.post("user/token/", {
      email,
      password,
    });

    if (status === 200) {
      setAuthUser(data.access, data.refresh);

      Toast().fire({
        title: "Login Successfully!!!",
        icon: "success",
      });
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
    const { data } = await apiInstance.post("user/registrations/", {
      full_name,
      email,
      password,
      password2,
    });
    Toast().fire({
      title: "Registration Successfully and check your mail",
      icon: "success",
    });
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
  localStorage.removeItem("order_oid");
  localStorage.removeItem("randomString");
  useAuthStore.getState().setUser(null);
  Toast().fire({
    icon: "warning",
    title: "You have successfully logged out.",
  });
};

export const setUser = async () => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  if (!access_token || !refresh_token) {
    return;
  }

  if (isAccessTokenExpired(access_token)) {
    try {
      const response = await getRefreshToken(refresh_token);
      if (response.access) {
        setAuthUser(response.access, response.refresh);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Refresh Token Expired", error);
      logout();
    }
  } else {
    setAuthUser(access_token, refresh_token);
  }
};

export const setAuthUser = (access_token, refresh_token) => {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  try {
    const user = jwtDecode(access_token);
    if (user) {
      useAuthStore.getState().setUser(user);
    }
  } catch (error) {
    console.error("Invalid access token", error);
    logout();
  }

  useAuthStore.getState().setLoading(false);
};

export const updateUserData = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("No refresh token found");

    const response = await apiInstance.post("/user/token/refresh/", {
      refresh: refreshToken,
    });
    const { access, refresh } = response.data;
    setAuthUser(access,refresh)
  } catch (error) {
    console.error("Failed to refresh token", error);
    // logout();
    return null;
  }
};
export const getRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("No refresh token found");

    const response = await apiInstance.post("/user/token/refresh/", {
      refresh: refreshToken,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to refresh token", error);
    // logout();
    return null;
  }
};

export const isAccessTokenExpired = (access_token) => {
  if (!access_token || access_token.split(".").length !== 3) {
    console.error("Invalid access token format");
    return true;
  }

  try {
    const decoded_token = jwtDecode(access_token);
    return decoded_token.exp < Date.now() / 1000;
  } catch (error) {
    console.error("Error decoding access token", error);
    return true;
  }
};
