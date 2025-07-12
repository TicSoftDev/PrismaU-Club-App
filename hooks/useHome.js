import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getMenusBienestar, getMenusPagos, getMenusPerfil, getMenusPortal } from '../services/HomeService';

function useHome() {

    const { token, credenciales } = useAuthContext();
    const [loadingPortal, setLoadingPortal] = useState(false);
    const [loadingBienestar, setLoadingBienestar] = useState(false);
    const [loadingPagos, setLoadingPagos] = useState(false);
    const [loadingPerfil, setLoadingPerfil] = useState(false);
    const [menuPortal, setMenuPortal] = useState([]);
    const [menuBienestar, setMenuBienestar] = useState([]);
    const [menuPagos, setMenuPagos] = useState([]);
    const [menuPerfil, setMenuPerfil] = useState([]);

    const consultarMenusPortal = async () => {
        setLoadingPortal(true);
        try {
            const data = await getMenusPortal(credenciales.Rol, token);
            setMenuPortal(data);
        } catch (error) {
            console.log(error.message);
            throw error.message;
        }
        setLoadingPortal(false);
    }

    const consultarMenusBienestar = async () => {
        setLoadingBienestar(true);
        try {
            const data = await getMenusBienestar(credenciales.Rol, token);
            setMenuBienestar(data);
        } catch (error) {
            console.log(error.message);
            throw error.message;
        }
        setLoadingBienestar(false);
    }

    const consultarMenusPagos = async () => {
        setLoadingPagos(true);
        try {
            const data = await getMenusPagos(credenciales.Rol, token);
            setMenuPagos(data);
        } catch (error) {
            console.log(error.message);
            throw error.message;
        }
        setLoadingPagos(false);
    }

    const consultarMenusPerfil = async () => {
        setLoadingPerfil(true);
        try {
            const data = await getMenusPerfil(credenciales.Rol, token);
            setMenuPerfil(data);
        } catch (error) {
            console.log(error.message);
            throw error.message;
        }
        setLoadingPerfil(false);
    }

    useEffect(() => {
        const rol = Number(credenciales?.Rol);
        if (rol !== 2 || rol !== 3) {
            consultarMenusPerfil();
        }
        if (rol === 2 || rol === 3) {
            consultarMenusPortal();
            consultarMenusBienestar();
            consultarMenusPagos();
            consultarMenusPerfil();
        }
    }, [credenciales.Rol])

    return {
        menuPortal,
        loadingPortal,
        menuBienestar,
        loadingBienestar,
        menuPerfil,
        loadingPerfil,
        menuPagos,
        loadingPagos
    }
}

export default useHome