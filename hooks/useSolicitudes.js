import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { createSolicitudes, getSolicitudes } from '../services/SolicitudesService';
import { alertSucces, alertWarning } from '../utilities/toast/Toast';

const useSolicitudes = () => {

    const titulo = 'Solicitudes';
    const itemsPerPage = 6;
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
            const data = await getSolicitudes(token);
            setLoading(false);
            setSolicitudes(data);
        } catch (error) {
            setLoading(false);
            alertWarning('get entradas', error.message);
        }
    }

    useEffect(() => {
        consultarSolicitudes();
    }, [])

    useEffect(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPagedSolicitudes(solicitudes.slice(startIndex, endIndex));
    }, [solicitudes, page, itemsPerPage]);

    return {
        titulo, loading, solicitud, solicitudes, totalPages: Math.ceil(solicitudes.length / itemsPerPage), page,
        pagedSolicitudes, setPage, handleChange, handleSubmit
    }
}

export default useSolicitudes