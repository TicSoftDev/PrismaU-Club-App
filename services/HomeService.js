import axios from "axios";

const URL = 'https://www.apiclubsincelejo.prismau.co/api/menus/rol/';

export const getMenusPortal = async (id, token) => {
    try {
        const res = await axios.get(URL + id + '/portal', {
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

export const getMenusBienestar = async (id, token) => {
    try {
        const res = await axios.get(URL + id + '/bienestar', {
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

export const getMenusPerfil = async (id, token) => {
    try {
        const res = await axios.get(URL + id + '/perfil', {
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