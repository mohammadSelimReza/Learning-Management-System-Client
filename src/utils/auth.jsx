import axios from "axios";

const login = async (email, password) => {
  try {
    const { data, status } = await axios;
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.detail || "Something went wrong!!",
    };
  }
};
