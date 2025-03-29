import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
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

    //========== CONSULTAR ACCESOS =======================

    const consultarAccesos = async () => {
        setLoading(true);
        try {
            const data = await getEntradas(token);
            setEntradas(data);
        } catch (e) {
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

    //========== FILTRO DE BÚSQUEDA =======================

    const handleBusqueda = (text) => setBusqueda(text);

    const normalizeText = (text = '') =>
        text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const listadoFiltrado = useMemo(() => {
        if (!busqueda) return entradas;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return entradas.filter((dato) => {
            const usuario = dato.user.asociado ?? dato.user.adherente ?? dato.user.familiar;
            const nombreCompleto = `${usuario?.Nombre ?? ''} ${usuario?.Apellidos ?? ''}`;
            const documento = normalizeText(usuario?.Documento ?? '');
            const nombreNormalizado = normalizeText(nombreCompleto);
            const fecha = dato.created_at?.split('T')[0] || '';

            return palabrasBusqueda.every((palabra) =>
                nombreNormalizado.includes(palabra) || documento.includes(palabra) || fecha.includes(palabra)
            );
        });
    }, [entradas, busqueda]);

    //========== PAGINACIÓN =======================

    const totalPages = Math.ceil(listadoFiltrado.length / itemsPerPage);
    const pagedEntradas = useMemo(() => {
        const startIndex = page * itemsPerPage;
        return listadoFiltrado.slice(startIndex, startIndex + itemsPerPage);
    }, [listadoFiltrado, page]);

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
