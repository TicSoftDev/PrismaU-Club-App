import axios from "axios";

const URL_SEND_CODE = 'https://www.apiclubsincelejo.prismau.co/api/reset-password';
const URL_VERIFY = 'https://www.apiclubsincelejo.prismau.co/api/verify-reset-code';
const URL_CHANGE = 'https://www.apiclubsincelejo.prismau.co/api/change-password';

export async function sendCode(documento) {
    try {
        const res = await axios.post(URL_SEND_CODE, { Documento: documento });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function validateCode(codigo) {
    try {
        const res = await axios.post(URL_VERIFY, { code: codigo });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export async function changePassword(codigo, clave) {
    try {
        const res = await axios.post(URL_CHANGE, { code: codigo, new_password: clave });
        return res.data;
    } catch (error) {
        throw error;
    }
};

