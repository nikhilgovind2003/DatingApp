const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/v1`;
const SOCKET_URL = BACKEND_URL;

export { API_URL, SOCKET_URL };
