import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/solicitud';

export const createSolicitud = async (data, token) => {
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
}

export async function getCantidadInvitadosSocio(id, token) {
    try {
        const res = await axios.get(URL + "/cantidad/" + id, {
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