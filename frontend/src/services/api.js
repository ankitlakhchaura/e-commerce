import axios from "axios";
const api = axios.create({
    baseURL: "https://e-commerce-backend-19g3.onrender.com/api",
    headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
}
});
export default api;
