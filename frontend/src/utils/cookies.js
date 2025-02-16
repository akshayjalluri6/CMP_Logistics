// src/utils/cookies.js
import Cookies from 'js-cookie';

const setCookie = (name, value, options = {}) => {
  options.sameSite = 'strict'; // Choose based on your security needs
  Cookies.set(name, value, options);
};

const getCookie = (name) => {
  return Cookies.get(name);
};

const removeCookie = (name) => {
  Cookies.remove(name);
};

// Secure cookie options for production
const setSecureCookie = (name, value, options = {}) => {
  options.sameSite = 'none'; // Choose based on your security needs
  options.secure = true; // Requires HTTPS
  Cookies.set(name, value, options);
};

export { setCookie, getCookie, removeCookie, setSecureCookie };