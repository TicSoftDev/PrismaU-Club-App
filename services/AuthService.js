import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/login';
const URL_REGISTRO = 'https://www.apiclubsincelejo.prismau.co/api/contratos';
// const URL = "http://192.168.0.108:8000/api/login";

export const validarSesion = async (Documento, password) => {
    try {
        const res = await axios.post(URL, { Documento, password });
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
}

export const registrarse = async (data) => {
    try {
        const res = await axios.post(URL_REGISTRO, data);
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
} 