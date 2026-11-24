import axios from "axios";
import Cookies from "js-cookie";
import { SOCKET_URL } from "@/apiConfig";
import store from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";

// Endpoints where a 401 is a normal answer, not an expired session
const SKIP = ["/login", "/signup", "/register", "/generateotp", "/forgot-password", "/reset-password", "/refresh-token", "/logout"];

let refreshing = null;

// Asks the server for a new access token using the httpOnly refresh cookie.
export const refreshSession = () => {
  if (!refreshing) {
    refreshing = axios
      .post(`${SOCKET_URL}/refresh-token`, {}, { withCredentials: true, _skipRefresh: true })
      .then((res) => res.data)
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
};

const endSession = () => {
  ["token", "user", "myProfile"].forEach((c) => Cookies.remove(c));
  store.dispatch(logout());
  if (!["/login", "/sign_up", "/"].includes(window.location.pathname)) {
    window.location.assign("/login");
  }
};

export const setupAuthRefresh = () => {
  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config;
      const status = error.response?.status;
      if (
        status !== 401 ||
        !original ||
        original._retried ||
        original._skipRefresh ||
        SKIP.some((p) => original.url?.includes(p))
      ) {
        return Promise.reject(error);
      }
      original._retried = true;
      try {
        await refreshSession();
        return axios(original);
      } catch (refreshError) {
        // only a definitive 401 from the refresh endpoint ends the session
        if (refreshError.response?.status === 401) endSession();
        return Promise.reject(error);
      }
    },
  );
};
