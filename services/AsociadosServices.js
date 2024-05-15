import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/personal/familiares/';

export const getAsociadoWithFamiliar = async (id, token) => {
    try {
        const res = await axios.get(URL + id, {
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