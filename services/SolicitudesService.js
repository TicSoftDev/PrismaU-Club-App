import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/solicitudes';


export const createSolicitudes = async (token, data) => {
    try {
        const res = await axios.post(URL, data, {
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