import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getMenusBienestar, getMenusPagos, getMenusPerfil, getMenusPortal } from '../services/HomeService';

function useHome() {
    const { token, credenciales, socio } = useAuthContext();

    const [loadingPortal, setLoadingPortal] = useState(false);
    const [loadingBienestar, setLoadingBienestar] = useState(false);
    const [loadingPagos, setLoadingPagos] = useState(false);
    const [loadingPerfil, setLoadingPerfil] = useState(false);
    const [menuPortal, setMenuPortal] = useState([]);
    const [menuBienestar, setMenuBienestar] = useState([]);
    const [menuPagos, setMenuPagos] = useState([]);
    const [menuPerfil, setMenuPerfil] = useState([]);

    const consultarMenusPortal = async (rolConsulta) => {
        setLoadingPortal(true);
        try {
            const data = await getMenusPortal(rolConsulta, token);
            setMenuPortal(data);
        } catch (error) {
            console.log(error.message);
        }
        setLoadingPortal(false);
    };

    const consultarMenusBienestar = async (rolConsulta) => {
        setLoadingBienestar(true);
        try {
            const data = await getMenusBienestar(rolConsulta, token);
            setMenuBienestar(data);
        } catch (error) {
            console.log(error.message);
        }
        setLoadingBienestar(false);
    };

    const consultarMenusPagos = async (rolConsulta) => {
        setLoadingPagos(true);
        try {
            const data = await getMenusPagos(rolConsulta, token);
            setMenuPagos(data);
        } catch (error) {
            console.log(error.message);
        }
        setLoadingPagos(false);
    };

    const consultarMenusPerfil = async () => {
        setLoadingPerfil(true);
        try {
            const data = await getMenusPerfil(credenciales.Rol, token);
            setMenuPerfil(data);
        } catch (error) {
            console.log(error.message);
        }
        setLoadingPerfil(false);
    };

    useEffect(() => {
        const rol = Number(credenciales?.Rol);
        const esFamiliarConSocio = rol === 5 && socio && (Number(socio.Rol) === 2 || Number(socio.Rol) === 3);
        const rolConsulta = esFamiliarConSocio ? Number(socio.Rol) : rol;

        consultarMenusPerfil();

        if (rolConsulta === 2 || rolConsulta === 3) {
            consultarMenusPortal(rolConsulta);
            consultarMenusBienestar(rolConsulta);
            consultarMenusPagos(rolConsulta);
        }
    }, [credenciales.Rol, socio]);

    return {
        menuPortal,
        loadingPortal,
        menuBienestar,
        loadingBienestar,
        menuPerfil,
        loadingPerfil,
        menuPagos,
        loadingPagos
    };
}

export default useHome;
