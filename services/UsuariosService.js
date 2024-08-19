import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/usuario/';

export const getUsersActivos = async (token) => {
    try {
        const res = await axios.get(URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
}

export const getUsuario = async (documento, token) => {
    try {
        const res = await axios.get(URL + documento, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
}

export const changePassword = async (id, password, token) => {
    try {
        const res = await axios.put(URL + id, { password }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
};

export const deleteAccount = async (id, token) => {
    try {
        const res = await axios.delete(URL + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
};

