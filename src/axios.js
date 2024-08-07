import axios from "axios";

// Khai báo hàm getAccessToken trước
const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

const getTokenExpirationTime = () => {
  const expiresIn = localStorage.getItem("expires_in");
  if (expiresIn) {
    return parseInt(expiresIn, 10); // Chuyển đổi expiresIn thành số
  }
  return null;
};

const refreshToken = async () => {
  try {
    const response = await axios.post("/api/auth/refresh");
    localStorage.setItem("access_token", response.data.accessToken);
    localStorage.setItem(
      "expires_in",
      Date.now() + response.data.expiresIn * 1000
    );
    return response.data.accessToken;
  } catch (error) {
    // Xử lý lỗi refresh token, ví dụ: logout người dùng
    console.error("Lỗi refresh token:", error);
    localStorage.clear();
    window.location.reload();
    return null;
  }
};

const axiosInstance = axios.create({
  baseURL: "https://ghichu.anhdev.online/", // URL cơ bản của API
  timeout: 10000, // Thời gian chờ tối đa cho mỗi yêu cầu HTTP (10 giây)
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}` // Gọi getAccessToken() khi khai báo axiosInstance,
    "Access-Control-Allow-Origin": "*",
    Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
  withCredentials: true,
});

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Chỉ refresh token khi nhận được lỗi 401 và request chưa được refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu request đã được refresh

      try {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest); // Thực hiện lại request ban đầu với access token mới
        } else {
          localStorage.clear();
          // Thực hiện các hành động khi không thể refresh token, ví dụ: logout người dùng
        }
      } catch (refreshError) {
        console.log("error refreshToken", refreshError);
        localStorage.clear();
        // Thực hiện các hành động khi không thể refresh token, ví dụ: logout người dùng
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
