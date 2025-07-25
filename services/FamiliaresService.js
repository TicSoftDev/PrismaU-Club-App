import axios from "axios";

const URL_FAMILIAR = "https://www.apiclubsincelejo.prismau.co/api/familiares";

export const getCantidadFamiliaresSocio = async (id, rol, token) => {
    try {
        const res = await axios.get(URL_FAMILIAR + "/cantidad/" + id + "/" + rol, {
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

export const getFamiliaresSocio = async (id, rol, token) => {
    try {
        const res = await axios.get(URL_FAMILIAR + "/" + id + "/" + rol, {
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

export const getFamiliaresPareja = async (id, token) => {
    try {
        const res = await axios.get(URL_FAMILIAR + "/pareja/" + id, {
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