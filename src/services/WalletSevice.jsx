import { axiosClient, headers } from '../config/axios';

export async function MakeDepositService(data, token) {
    try {
        let response= await axiosClient.post("/deposit", data, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('deposit' in response.data)) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function GetDepositsService(token) {
    try {
        let response= await axiosClient.get("/deposits", { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('deposits' in response.data)) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function MakePurchaseService(data, token) {
    try {
        let response= await axiosClient.post("/purchase", data, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('purchase' in response.data)) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function ConfirmPurchaseService(id, data, token) {
    try {
        let response= await axiosClient.post("/purchase/"+id+"/confirm", data, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('purchase' in response.data)) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function GetPurchasesService(token) {
    try {
        let response= await axiosClient.get("/purchases", { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('purchases' in response.data)) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function GetBalanceService(token) {
    try {
        let response= await axiosClient.get("/balance", { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('balance' in response.data)) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export default {
    MakeDepositService,
    GetDepositsService,
    MakePurchaseService,
    ConfirmPurchaseService,
    GetPurchasesService,
    GetBalanceService
};