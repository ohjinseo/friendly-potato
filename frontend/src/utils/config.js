import axios from "axios";
import jwt_decode from "jwt-decode";
import { baseURL } from "./baseURL";

const getRefreshToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

        const config = {
            headers: {
                authorization: `Bearer ${accessToken}`,
                refresh: refreshToken
            }
    };
    
    try {
        const { data } = await axios.get(
            `${baseURL}/auth/refresh`,
            config
        );
        
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const instance = axios.create();

instance.interceptors.request.use(
    async (config) => {

        let currentDate = new Date();
        const accessToken = localStorage.getItem("accessToken");
        const decodedToken = jwt_decode(accessToken);

        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const data = await getRefreshToken();
            config.headers["authorization"] = `Bearer ${data.accessToken}`;
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)