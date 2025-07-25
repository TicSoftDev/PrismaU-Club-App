import { useState } from 'react';
import { Keyboard } from 'react-native';
import { registrarse } from '../services/AuthService';
import { alertSuccess, alertWarning } from '../utilities/toast/Toast';

function useContrataciones() {

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
            const data = await registrarse(solicitud);
            setLoading(false);
            if (data.status) {
                recargar();
                alertSuccess("Gracias por registrarse. Próximamente le confirmaremos su inscripción");
            } else {
                alertWarning("No se pudo registrar");
            }
        } catch (error) {
            setLoading(false);
            console.log(error.message);
            alertWarning("solicitud" + error.message);
        }
    }

    return {
        solicitud, loading, handleChange, registro
    }
}

export default useContrataciones