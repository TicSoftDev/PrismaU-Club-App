import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Routes } from '../routes/Routes';
import { createSolicitudes, getSolicitud, getSolicitudes } from '../services/SolicitudesService';
import { alertSucces, alertWarning } from '../utilities/toast/Toast';

const useSolicitudes = () => {

    const titulo = 'Crear Solicitud';
    const titulo2 = 'Detalle Solicitud';
    const itemsPerPage = 6;
    const navigation = useNavigation();
    const { token, credenciales } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [solicitudes, setSolicitudes] = useState([]);
    const [page, setPage] = useState(0);
    const [pagedSolicitudes, setPagedSolicitudes] = useState([]);
    const [solicitud, setSolicitud] = useState({
        'user_id': credenciales.id,
        'Tipo': '',
        'Descripcion': '',
        'Estado': 1
    });

    const recargar = () => {
        setSolicitud({
            'user_id': credenciales.id,
            'Tipo': '',
            'Descripcion': '',
            'Estado': 1
        });
        setLoading(false);
    };

    const goCrear = () => {
        recargar();
        navigation.navigate(Routes.CREAR_SOLICITUD);
    }

    const goDetalle = (id) => {
        navigation.navigate(Routes.DETALLE_SOLICITUD, { id });
    };

    const handleChange = (value, name) => {
        setSolicitud({
            ...solicitud,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            if (solicitud.Tipo === '' || solicitud.Descripcion === '') {
                return alertWarning('Hay campos vacios');
            }
            setLoading(true);
            const data = await createSolicitudes(token, solicitud);
            setLoading(false);
            if (data.status) {
                alertSucces("Solicitud enviada");
                recargar();
                // await consultarSolicitudes();
                navigation.navigate(Routes.SOLICITUDES);
            } else {
                alertWarning("No se pudo registrar");
            }
        } catch (error) {
            setLoading(false);
            alertWarning('crear solicitud ' + error.message);
        }
    }

    const consultarSolicitudes = async () => {
        try {
            setLoading(true);
            const data = await getSolicitudes(token, credenciales.id);
            setLoading(false);
            setSolicitudes(data);
        } catch (error) {
            setLoading(false);
            alertWarning('get entradas', error.message);
        }
    }

    const consultarSolicitud = async (id) => {
        try {
            setLoading(true);
            const data = await getSolicitud(token, id);
            setLoading(false);
            setSolicitud(data);
        } catch (error) {
            setLoading(false);
            alertWarning('get entradas', error.message);
        }
    }

    useFocusEffect(
        useCallback(() => {
            consultarSolicitudes();
        }, [])
    );

    useEffect(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPagedSolicitudes(solicitudes.slice(startIndex, endIndex));
    }, [solicitudes, page, itemsPerPage]);

    return {
        titulo, loading, solicitud, solicitudes, totalPages: Math.ceil(solicitudes.length / itemsPerPage), page,
        pagedSolicitudes, titulo2, setPage, handleChange, handleSubmit, goCrear, goDetalle, consultarSolicitud
    }
}

export default useSolicitudes