import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/noticias';


export const getNoticias = async (token) => {
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