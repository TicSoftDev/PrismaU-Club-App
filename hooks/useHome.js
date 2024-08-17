import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getMenusBienestar, getMenusPortal } from '../services/HomeService';

function useHome() {

    const { token, credenciales } = useAuthContext();
    const [loadingPortal, setLoadingPortal] = React.useState(false);
    const [loadingBienestar, setLoadingBienestar] = React.useState(false);
    const [menuPortal, setMenuPortal] = React.useState([]);
    const [menuBienestar, setMenuBienestar] = React.useState([]);

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

    useEffect(() => {
        consultarMenusPortal();
        consultarMenusBienestar();
    }, [credenciales.Rol])

    return {
        menuPortal, loadingPortal, menuBienestar, loadingBienestar
    }
}

export default useHome