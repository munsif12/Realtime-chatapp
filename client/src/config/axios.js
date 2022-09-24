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

//response interceptor to handle errors
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error.message)
        const originalRequest = error.config;
        console.log(originalRequest)
        if (error.response.status === 401) {
            //push to login page
            window.location.href = "/";
            return Promise.reject(error);
        }

        // ** if error is 400 and has 'token expired' message retry request with refresh token **

        // if (error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;
        //     const refreshToken = localStorage.getItem("refreshToken");
        // return axios
        //     .post("/user/refreshToken", { refreshToken })
        //     .then((res) => {
        //         if (res.status === 201) {
        //             localStorage.setItem("authToken", res.data.token);
        //             localStorage.setItem("refreshToken", res.data.refreshToken);
        //             axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        //             return axios(originalRequest);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // }
        return Promise.reject(error);
    }
);
export default axios;