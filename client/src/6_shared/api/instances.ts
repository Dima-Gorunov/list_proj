import axios from "axios";
import { FRONT_ROUTES_STR, LOCAL_ST_TOKEN_STR, QUERY_STR_NULLABLE_ACCOUNT, serverName } from "../constants";

const instance = axios.create({
    withCredentials: true,
    baseURL: serverName(),
});

const authInstance = axios.create({
    withCredentials: true,
    baseURL: serverName(),
});

// accessToken
const authInterceptor = (config: any): any => {
    const token = localStorage.getItem(LOCAL_ST_TOKEN_STR); // accessToken

    if (token && config.headers) {
        config.headers.authorization = `Bearer ${token}`;
    }

    console.log("Authorization header:", config.headers?.authorization);
    return config;
};

authInstance.interceptors.request.use(authInterceptor); // связывает authInstance и authInterceptor

authInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await instance.get("/api/user/refresh", { withCredentials: true });
                localStorage.setItem(LOCAL_ST_TOKEN_STR, response.data.accessToken);
                return authInstance.request(originalRequest);
            } catch (e) {
                localStorage.removeItem(LOCAL_ST_TOKEN_STR);
                console.log("не авторизован");
                window.location.href = `/#/${FRONT_ROUTES_STR.login}?${QUERY_STR_NULLABLE_ACCOUNT}=true`;
            }
        }
        throw error;
    },
);

export async function loadProtectedFile(url: string): Promise<string> {
    try {
        const token = localStorage.getItem(LOCAL_ST_TOKEN_STR);
        const response = await axios.get(url, {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Создаем Object URL из blob
        const blob = response.data;
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Failed to load protected file:", error);
        console.log("Failed to load protected file:", error);
        throw error;
    }
}

export { authInstance, instance };
