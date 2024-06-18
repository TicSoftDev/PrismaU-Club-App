import { useState, useEffect, useCallback } from 'react';
import { getEntradas } from '../services/AccesosService';
import { alertWarning } from '../utilities/toast/Toast';
import { useAuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

function useAccesos(itemsPerPage) {
    const { token } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [entradas, setEntradas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [pagedEntradas, setPagedEntradas] = useState([]);

    const handleBusqueda = (text) => {
        setBusqueda(text);
    };

    const handleSearch = () => {
        setSearchQuery(busqueda);
    };

    const consultarAccesos = async () => {
        try {
            setLoading(true);
            let data = await getEntradas(token);
            if (searchQuery) {
                const searchDate = new Date(searchQuery);
                const searchDateString = searchDate.toISOString().split('T')[0];
                data = data.filter(entrada => {
                    const entradaDate = new Date(entrada.created_at);
                    const entradaDateString = entradaDate.toISOString().split('T')[0];
                    return entradaDateString === searchDateString;
                });
            }
            setEntradas(data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            alertWarning(e.message);
        }
    };

    useFocusEffect(
        useCallback(() => {
            consultarAccesos();
        }, [searchQuery])
    );

    useEffect(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPagedEntradas(entradas.slice(startIndex, endIndex));
    }, [entradas, page, itemsPerPage]);

    return {
        loading,
        pagedEntradas,
        busqueda,
        handleBusqueda,
        handleSearch,
        page,
        setPage,
        totalPages: Math.ceil(entradas.length / itemsPerPage),
    };
}

export default useAccesos;
