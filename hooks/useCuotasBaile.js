import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { createPreferencia, getCuotasBaileUser } from '../services/CuotaBaileService';
import { alertWarning } from '../utilities/toast/Toast';

export default function useCuotasBaile() {
    const { token, user, credenciales, socio } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [cuotas, setCuotas] = useState([]);
    const [filteredCuotas, setFilteredCuotas] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('descripcion');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showFilters, setShowFilters] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [cuota, setCuota] = useState(null);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [initPoint, setInitPoint] = useState(null);
    const [touched, setTouched] = useState(false);
    const [pago, setPago] = useState({
        cuotas_baile_id: null,
        valor: null
    });

    //=================== Filtrado y Ordenamiento =====================================
    const applyFiltersAndSort = useCallback((data) => {
        let result = [...data];

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(({ descripcion, valor, total_pagos, restante }) =>
                descripcion.toLowerCase().includes(q) ||
                valor.toString().includes(q) ||
                total_pagos.toString().includes(q) ||
                restante.toString().includes(q)
            );
        }

        if (selectedFilter === 'paid') {
            result = result.filter(m => m.estado === 1);
        } else if (selectedFilter === 'pending') {
            result = result.filter(m => m.estado !== 1);
        }

        result.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            return sortOrder === 'asc'
                ? aValue > bValue ? 1 : -1
                : aValue < bValue ? 1 : -1;
        });

        setFilteredCuotas(result);
        setCurrentPage(1);
    }, [searchQuery, selectedFilter, sortBy, sortOrder]);

    //==================== Cargar cuotas =====================================
    const getCuotasUsuario = useCallback(async (showRefresh = false) => {
        showRefresh ? setRefreshing(true) : setLoading(true);

        const esFamiliarConSocio = Number(credenciales.Rol) === 5 && socio && socio.Documento;
        const documento = esFamiliarConSocio ? socio.Documento : user.Documento;

        try {
            const response = await getCuotasBaileUser(documento, token);
            const data = response.cuotas || [];
            setCuotas(data);
            applyFiltersAndSort(data);
        } catch (error) {
            alertWarning("No completado", error.message || 'Error al obtener cuotas de baile.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [user.Documento, socio, credenciales.Rol, token, applyFiltersAndSort]);

    //==================== Actualizaciones =====================================
    const handleSearch = (query) => setSearchQuery(query);
    const handleFilterChange = (filter) => setSelectedFilter(filter);
    const handleSortChange = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
    };

    const updateCuota = (id, updates) => {
        const updated = cuotas.map(m => (m.id === id ? { ...m, ...updates } : m));
        setCuotas(updated);
        applyFiltersAndSort(updated);
    };

    const refresh = () => getCuotasUsuario(true);

    //==================== Efectos =====================================
    useEffect(() => {
        getCuotasUsuario();
    }, [getCuotasUsuario]);

    useEffect(() => {
        applyFiltersAndSort(cuotas);
    }, [searchQuery, selectedFilter, sortBy, sortOrder, cuotas, applyFiltersAndSort]);

    //==================== Paginación =====================================
    const totalItems = filteredCuotas.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedCuotas = filteredCuotas.slice(
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
        total: cuotas.length,
        pagadas: cuotas.filter(m => m.estado === 1).length,
        pendientes: cuotas.filter(m => m.estado !== 1).length,
        totalValor: cuotas.reduce((sum, m) => sum + m.valor, 0),
        totalPagado: cuotas.reduce((sum, m) => sum + m.total_pagos, 0),
        totalRestante: cuotas.reduce((sum, m) => sum + m.restante, 0)
    };

    //==================== Pagar =====================================
    const handleChangeCheck = () => {
        setTouched(!touched);
        pago.valor = null;
    };

    const handleChange = (value, name) => {
        setPago({ ...pago, [name]: value });
    };

    const cargarCuota = async (cuota) => {
        setCuota(cuota);
        setPago({ valor: null, cuotas_baile_id: cuota.id });
        setShowPaymentModal(true);
    };

    const cerrarModal = () => {
        setShowPaymentModal(false);
        setCuota(null);
        setPago({ valor: null, cuotas_baile_id: null });
        setIsLoadingPayment(false);
        setInitPoint(null);
        setTouched(false);
    };

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
    };

    return {
        loading,
        refreshing,
        cuotas: paginatedCuotas,
        allCuotas: cuotas,
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
        cuota,
        isLoadingPayment,
        initPoint,
        pago,
        touched,
        handleChangeCheck,
        handleChange,
        crearPreferencia,
        cargarCuota,
        cerrarModal,
        goToPage,
        nextPage,
        prevPage,
        setShowFilters,
        handleSearch,
        handleFilterChange,
        handleSortChange,
        updateCuota,
        refresh,
        getCuotasUsuario
    };
}
