import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_URL || "http://localhost:4000/api/";
axios.interceptors.request.use(
    (config) => {
        console.log("config")
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error.message)
        Promise.reject(error);
    }
);
export default axios;