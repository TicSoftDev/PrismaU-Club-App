import { addHours } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { createInvitado } from '../services/InvitadosService';
import { alertSucces, alertWarning } from '../utilities/toast/Toast';

export default function useInvitado() {

    const { token, credenciales } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [generado, setGenerado] = useState(false);
    const [invitacion, setInvitacion] = useState({});
    const [invitado, setInvitado] = useState({
        user_id: credenciales.id,
        Nombre: "",
        Apellidos: "",
        Telefono: "",
        TipoDocumento: "",
        Documento: "",
        Status: false,
    });
    const ahora = new Date();
    const zonaHoraria = 'America/Bogota';
    const vencimiento = addHours(ahora, 12);
    const fechaVencimientoTexto = formatInTimeZone(vencimiento, zonaHoraria, 'PPpp', { locale: es });
    const fechaVencimiento = vencimiento.toISOString();
    const datosQR = { usuario: invitacion, fechaVencimiento };
    const dataString = JSON.stringify(datosQR);

    const recargar = () => {
        setInvitado({
            user_id: credenciales.id,
            Nombre: "",
            Apellidos: "",
            Telefono: "",
            TipoDocumento: "",
            Documento: "",
            Status: false,

        });
        setInvitacion({});
        setGenerado(false);
        setLoading(false);
    };

    const handleChange = (value, name) => {
        setInvitado({
            ...invitado,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        try {
            if (invitado.Nombre === "" || invitado.Apellidos === "" || invitado.Documento === "" || invitado.TipoDocumento === "" || invitado.Telefono === "") {
                return alertWarning('Hay campos vacios');
            }
            setLoading(true);
            const data = await createInvitado(invitado, token);
            setLoading(false);
            if (data.status) {
                setGenerado(true);
                setInvitacion(data.data);
                alertSucces("Se ha generado el codigo de invitación");
            } else {
                alertWarning("No completado", "Esta persona superó el límite de invitaciones mensuales.");
            }
        } catch (error) {
            setLoading(false);
            alertWarning("Invitado" + error.message);
        }
    };

    return {
        dataString, invitado, generado, loading, fechaVencimientoTexto, handleChange, handleSubmit, recargar
    }
}