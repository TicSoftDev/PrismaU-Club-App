import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/mensualidades';
const URL2 = 'https://www.apiclubsincelejo.prismau.co/api/preferencia';

export async function createPreferencia(data, token) {
    try {
        const res = await axios.post(URL2 + "-mensualidad", { id: data.mensualidad_id, valor: data.valor }, {
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

export async function getMensualidadesUser(documento, token) {
    try {
        const res = await axios.get(URL + "/" + documento, {
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