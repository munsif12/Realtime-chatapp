import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_URL || "http://localhost:4000/api/";
const authToken = localStorage.getItem("authToken");
console.log({ authToken })
if (authToken) {
    axios.defaults.headers.common = {
        Authorization: `bearer ${authToken}`,
    };
} else {
    axios.defaults.headers.common = {
        Authorization: null,
    };
}
export default axios;