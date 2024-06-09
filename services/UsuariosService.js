import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/usuario/';

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