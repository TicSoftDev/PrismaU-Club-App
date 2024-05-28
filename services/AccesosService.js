import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/entradas/';

export const createEntrada = async (id, token) => {
    try {
        const res = await axios.post(URL + id, {}, {
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
