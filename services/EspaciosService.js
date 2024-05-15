import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/espacios';

export async function getEspacios(token) {
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
};
