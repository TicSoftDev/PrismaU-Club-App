import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/invitados';

export const createInvitado = async (data, token) => {
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

export const updateEntrada = async (id, token) => {
    try {
        const res = await axios.put(URL + "/" + id, {}, {
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