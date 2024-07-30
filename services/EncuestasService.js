import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/encuestas';
const URL2 = 'https://www.apiclubsincelejo.prismau.co/api/respuestas-usuarios';

export const getEncuestas = async (token, id) => {
    try {
        const res = await axios.get(URL + "/disponibles/" + id, {
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

export const getEncuesta = async (token, id) => {
    try {
        const res = await axios.get(URL + "/" + id, {
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

export const responderEncuesta = async (token, data) => {
    try {
        const res = await axios.post(URL2, data, {
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