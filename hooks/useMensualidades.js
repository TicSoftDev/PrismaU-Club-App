import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { createPreferencia, getMensualidadesUser } from '../services/MensualidadService';
import { alertWarning } from '../utilities/toast/Toast';

export default function useMensualidades() {
    const { token, user, credenciales, socio } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [mensualidades, setMensualidades] = useState([]);
    const [filteredMensualidades, setFilteredMensualidades] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [showFilters, setShowFilters] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [mensualidad, setMensualidad] = useState(null);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [initPoint, setInitPoint] = useState(null);
    const [touched, setTouched] = useState(false);
    const [pago, setPago] = useState({
        mensualidad_id: null,
        valor: null
    });

    //=================== Filtrado y Ordenamiento =====================================

    const applyFiltersAndSort = useCallback((data) => {
        let result = [...data];

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();

            result = result.filter(({ fecha, valor, total_pagos, restante }) => {
                const date = new Date(fecha + 'T00:00:00');
                const month = date.toLocaleDateString('es-CO', { month: 'long' });
                const year = date.getFullYear().toString();
                const monthYear = `${month} de ${year}`;

                return (
                    month.toLowerCase().includes(q) ||
                    year.includes(q) ||
                    monthYear.toLowerCase().includes(q) ||
                    valor.toString().includes(q) ||
                    total_pagos.toString().includes(q) ||
                    restante.toString().includes(q)
                );
            });
        }

        if (selectedFilter === 'paid') {
            result = result.filter(m => m.estado === 1);
        } else if (selectedFilter === 'pending') {
            result = result.filter(m => m.estado !== 1);
        }

        result.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'date') {
                aValue = new Date(a.fecha);
                bValue = new Date(b.fecha);
            }

            return sortOrder === 'asc'
                ? aValue > bValue ? 1 : -1
                : aValue < bValue ? 1 : -1;
        });

        setFilteredMensualidades(result);
        setCurrentPage(1);
    }, [searchQuery, selectedFilter, sortBy, sortOrder]);

    //==================== Cargar mensualidades =====================================

    const getMensualidadesUsuario = useCallback(async (showRefresh = false) => {
        showRefresh ? setRefreshing(true) : setLoading(true);

        const esFamiliarConSocio = Number(credenciales.Rol) === 5 && socio && socio.Documento;
        const documento = esFamiliarConSocio ? socio.Documento : user.Documento;

        try {
            const response = await getMensualidadesUser(documento, token);
            const data = response.mensualidades || [];
            setMensualidades(data);
            applyFiltersAndSort(data);
        } catch (error) {
            alertWarning("Error al obtener mensualidades", error.message || 'Error al obtener mensualidades.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [user.Documento, socio, credenciales.Rol, token, applyFiltersAndSort]);


    //==================== Actualizaciones =====================================

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleSortChange = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
    };

    const updateMensualidad = (id, updates) => {
        const updated = mensualidades.map(m => (m.id === id ? { ...m, ...updates } : m));
        setMensualidades(updated);
        applyFiltersAndSort(updated);
    };

    const refresh = () => {
        getMensualidadesUsuario(true);
    };

    //==================== Efectos =====================================

    useEffect(() => {
        getMensualidadesUsuario();
    }, [getMensualidadesUsuario]);

    useEffect(() => {
        applyFiltersAndSort(mensualidades);
    }, [searchQuery, selectedFilter, sortBy, sortOrder, mensualidades, applyFiltersAndSort]);

    //==================== Paginación =====================================

    const totalItems = filteredMensualidades.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedMensualidades = filteredMensualidades.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const nextPage = () => goToPage(currentPage + 1);
    const prevPage = () => goToPage(currentPage - 1);

    //==================== Estadísticas =====================================

    const stats = {
        total: mensualidades.length,
        pagadas: mensualidades.filter(m => m.estado === 1).length,
        pendientes: mensualidades.filter(m => m.estado !== 1).length,
        totalValor: mensualidades.reduce((sum, m) => sum + m.valor, 0),
        totalPagado: mensualidades.reduce((sum, m) => sum + m.total_pagos, 0),
        totalRestante: mensualidades.reduce((sum, m) => sum + m.restante, 0)
    };

    //==================== Pagar =====================================

    const handleChangeCheck = () => {
        setTouched(!touched);
        pago.valor = null;
    }

    const handleChange = (value, name) => {
        setPago({ ...pago, [name]: value, });
    };

    const cargarMensualidad = async (mensualidad) => {
        setMensualidad(mensualidad);
        setPago({ valor: null, mensualidad_id: mensualidad.id });
        setShowPaymentModal(true);
    };

    const cerrarModal = () => {
        setShowPaymentModal(false);
        setMensualidad(null);
        setPago({ valor: null, mensualidad_id: null });
        setIsLoadingPayment(false);
        setInitPoint(null);
        setTouched(false);
    }

    const crearPreferencia = async () => {
        setIsLoadingPayment(true);
        try {
            const response = await createPreferencia(pago, token);
            if (response.status) {
                setInitPoint(response.init_point);
            } else {
                setShowPaymentModal(false);
                response.errors.forEach(error => {
                    alertWarning("No completado", error);
                })
            }
        } catch (error) {
            alertWarning("No completado", error.message);
        } finally {
            setIsLoadingPayment(false);
        }
        setLoading(false);
    };

    return {
        loading,
        refreshing,
        mensualidades: paginatedMensualidades,
        allMensualidades: mensualidades,
        searchQuery,
        selectedFilter,
        sortOrder,
        sortBy,
        showFilters,
        currentPage,
        totalPages,
        itemsPerPage,
        totalItems,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        stats,
        showPaymentModal,
        mensualidad,
        isLoadingPayment,
        initPoint,
        pago,
        touched,
        handleChangeCheck,
        handleChange,
        crearPreferencia,
        cargarMensualidad,
        cerrarModal,
        goToPage,
        nextPage,
        prevPage,
        setShowFilters,
        handleSearch,
        handleFilterChange,
        handleSortChange,
        updateMensualidad,
        refresh,
        getMensualidadesUsuario
    };
}
