import { axiosClient, headers } from '../config/axios';

export async function LoginService(data) {
    try {
        let response= await axiosClient.post("/login", data, { headers });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('user' in response.data && "token" in response.data)) throw new Error()
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function RegisterService(data) {
    try {
        let response= await axiosClient.post("/register", data, { headers });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('user' in response.data && "token" in response.data)) throw new Error()
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function LogoutService(token){
    try {
        let response= await axiosClient.get("/logout", { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function CheckSessionService(token){
    try {
        let response= await axiosClient.get("/session/check", { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export default {
    LoginService,
    RegisterService,
    LogoutService,
    CheckSessionService
};