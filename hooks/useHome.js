import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getMenusBienestar, getMenusPerfil, getMenusPortal } from '../services/HomeService';

function useHome() {

    const { token, credenciales } = useAuthContext();
    const [loadingPortal, setLoadingPortal] = React.useState(false);
    const [loadingBienestar, setLoadingBienestar] = React.useState(false);
    const [loadingPerfil, setLoadingPerfil] = React.useState(false);
    const [menuPortal, setMenuPortal] = React.useState([]);
    const [menuBienestar, setMenuBienestar] = React.useState([]);
    const [menuPerfil, setMenuPerfil] = React.useState([]);

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
        consultarMenusPortal();
        consultarMenusBienestar();
        consultarMenusPerfil();
    }, [credenciales.Rol])

    return {
        menuPortal, loadingPortal, menuBienestar, loadingBienestar, menuPerfil, loadingPerfil
    }
}

export default useHome