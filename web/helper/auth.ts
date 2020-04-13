import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";

export const setToken = token => {
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("user", JSON.stringify(jwtDecode(token)));
  Cookie.set("jwt", token, { expires: 365 });
};

export const unsetToken = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
  Cookie.remove("jwt");
};

export const getUserFromLocalStorage = () => {
  const json = window.localStorage.user;
  return json ? JSON.parse(json) : undefined;
};

export const getTokenFromLocalStorage = () => {
  const jwt = window.localStorage.token;
  return jwt ? jwt : undefined;
};
