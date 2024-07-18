import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { createSolicitudes } from '../services/SolicitudesService';
import { alertSucces, alertWarning } from '../utilities/toast/Toast';

const useSolicitudes = () => {

    const titulo = 'Solicitudes';
    const { token, credenciales } = useAuthContext();
    const [loading, setLoading] = useState(false);
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
            }else{
                alertWarning("No se pudo registrar");
            }
        } catch (error) {
            setLoading(false);
            alertWarning('crear solicitud '+error.message);
        }
    }

    return {
        titulo, loading, solicitud, handleChange, handleSubmit
    }
}

export default useSolicitudes