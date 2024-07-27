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

export const getSolicitudes = async (token, id) => {
    try {
        const res = await axios.get(URL + "/user/" + id, {
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

export const getSolicitud = async (token, id) => {
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

export const getCantidadSolicitudesSocio = async (token, id) => {
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