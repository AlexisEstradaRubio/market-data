import axios from "axios";


const apiClient = axios.create({
  baseURL: "http://api.marketstack.com/v1/",
  httpsAgent: false,
});


apiClient.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
