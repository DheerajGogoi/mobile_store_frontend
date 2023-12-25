import axios from "axios";

const auth_url = `${process.env.REACT_APP_BACKEND_URL}/api/user`;
const mobile_url = `${process.env.REACT_APP_BACKEND_URL}/api/mobile`;

export const login = async (payload) => {
    try {
        let options = {
            method: "POST",
            url: `${auth_url}/login`,
            data: payload
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const register = async (payload) => {
    try {
        let options = {
            method: "POST",
            url: `${auth_url}/register`,
            data: payload
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const get_all_mobiles = async (token, searchParams) => {
    try {
        let options = {
            method: "GET",
            url: `${mobile_url}/${searchParams}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
} 

export const get_options = async (token) => {
    try {
        let options = {
            method: "GET",
            url: `${mobile_url}/options`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const get_mobile = async (mobileId, token) => {
    try {
        let options = {
            method: "GET",
            url: `${mobile_url}/${mobileId}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const search_mobile = async (word, token) => {
    try {
        let options = {
            method: "GET",
            url: `${mobile_url}/search?keyword=${word}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}