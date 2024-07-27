import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/reservas';


export const createReserva = async (token, data) => {
    try {
        const res = await axios.post(URL, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getReservas = async (token, id) => {
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

export const getCantidadReservasSocio = async (token, id) => {
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
}

export const deleteReserva = async (token, id) => {
    try {
        const res = await axios.delete(URL + "/" + id, {
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