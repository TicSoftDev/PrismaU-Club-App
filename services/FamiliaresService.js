import axios from "axios";

const URL_FAMILIAR = "https://www.apiclubsincelejo.prismau.co/api/familiares";

export const getCantidadFamiliaresSocio = async (id, token) => {
    try {
        const res = await axios.get(URL_FAMILIAR + "/cantidad/" + id, {
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

export const getFamiliaresSocio = async (id, token) => {
    try {
        const res = await axios.get(URL_FAMILIAR + "/socio/" + id, {
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