import Cookies from "universal-cookie";
import axiosInstance from "./axios";

export const StorageKey = {
  token: "@token",
  user: "@user",
};

export const storage = () => {
  const cookies = new Cookies();
  const MAX_AGE = 2 * 60 * 1000;

  const setTokenIntoHeaders = (token) => {
    axiosInstance.defaults.headers["x-token"] = token;
  };

  const setToken = (token) => {
    cookies.set(StorageKey.token, token, {
      path: "/",
      maxAge: MAX_AGE,
    });
    setTokenIntoHeaders(token);
  };

  const getToken = () => {
    const token = cookies.get(StorageKey.token);
    setTokenIntoHeaders(token);
    return token;
  };

  const removeToken = () => {
    cookies.remove(StorageKey.token, {
      path: "/",
    });
    axiosInstance.defaults.headers.post["x-token"] = "";
  };

  const setUserData = (userData) => {
    cookies.set(StorageKey.user, userData, {
      path: "/",
      maxAge: MAX_AGE,
    });
  };

  const getUserData = () => {
    return cookies.get(StorageKey.user);
  };

  const removeUserData = () => {
    cookies.remove(StorageKey.user, {
      path: "/",
    });
  };

  return {
    setTokenIntoHeaders,
    setToken,
    getToken,
    removeToken,
    removeUserData,
    setUserData,
    getUserData,
  };
};
