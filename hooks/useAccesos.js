import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getEntradas } from '../services/AccesosService';
import { alertWarning } from '../utilities/toast/Toast';

function useAccesos() {
    const itemsPerPage = 20;
    const { token } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [entradas, setEntradas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [page, setPage] = useState(0);
    const [pagedEntradas, setPagedEntradas] = useState([]);

    //========== CONSULTAR =======================

    const consultarAccesos = async () => {
        try {
            setLoading(true);
            let data = await getEntradas(token);
            setEntradas(data);
        } catch (e) {
            setLoading(false);
            alertWarning(e.message);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            consultarAccesos();
        }, [])
    );

    //========== BUSQUEDA =======================

    const handleBusqueda = (text) => {
        setBusqueda(text);
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filterBusqueda = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const usuario = dato.user.asociado ? dato.user.asociado : dato.user.adherente ? dato.user.adherente : dato.user.familiar;
            const nombreNormalizado = normalizeText(usuario.Nombre + " " + usuario.Apellidos);
            const documento = normalizeText(usuario.Documento);
            const fecha = new Date(dato.created_at).toISOString().split('T')[0];
            return palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra) || documento.includes(palabra) || fecha.includes(palabra)
            );
        });
    };

    const listadoFiltrado = filterBusqueda(entradas, busqueda);

    useEffect(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPagedEntradas(listadoFiltrado.slice(startIndex, endIndex));
    }, [entradas, page, itemsPerPage, busqueda]);

    const totalPages = Math.ceil(listadoFiltrado.length / itemsPerPage);

    return {
        loading,
        pagedEntradas,
        busqueda,
        page,
        totalPages,
        setPage,
        handleBusqueda,
    };
}

export default useAccesos;
