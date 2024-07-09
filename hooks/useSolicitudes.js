import { useState } from 'react';
import { createSolicitud } from '../services/solicitudService';
import { alertSucces, alertWarning } from '../utilities/toast/Toast';
import { Keyboard } from 'react-native';
import { useAuthContext } from '../context/AuthContext';

function useSolicitudes() {

    const { token } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [solicitud, setSolicitud] = useState({
        'Nombres': '',
        'Apellidos': '',
        'Identificacion': '',
        'Correo': '',
        'Telefono': '',
        'Empresa': '',
        'Ciudad': '',
        'Estado': 1,
    });

    const recargar = () => {
        setSolicitud({
            'Nombres': '',
            'Apellidos': '',
            'Identificacion': '',
            'Correo': '',
            'Telefono': '',
            'Empresa': '',
            'Ciudad': '',
            'Estado': 1,
        });
    }

    const handleChange = (value, name) => {
        setSolicitud({
            ...solicitud,
            [name]: value
        })
    }

    const registro = async () => {
        Keyboard.dismiss();
        try {
            if (solicitud.Nombres === "" || solicitud.Apellidos === "" || solicitud.Identificacion === "" || solicitud.Correo === "" || solicitud.Telefono === "" || solicitud.Empresa === "" || solicitud.Ciudad === "") {
                return alertWarning('Hay campos vacios');
            }
            setLoading(true);
            const data = await createSolicitud(solicitud, token);
            setLoading(false);
            if (data.status) {
                recargar();
                alertSucces("Gracias por registrarse. Próximamente le confirmaremos su inscripción");
            } else {
                alertWarning("No se pudo registrar");
            }
        } catch (error) {
            setLoading(false);
            alertWarning("solicitud" + error.message);
        }
    }

    return {
        solicitud, loading, handleChange, registro
    }
}

export default useSolicitudes