import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { alertSucces, alertWarning } from '../utilities/toast/Toast';
import { createInvitado } from '../services/InvitadosService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function useInvitado() {

    const { token, user } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [generado, setGenerado] = useState(false);
    const [invitacion, setInvitacion] = useState({});
    const [invitado, setInvitado] = useState({
        personal_id: user.id,
        Nombre: "",
        Apellidos: "",
        Telefono: "",
        TipoDocumento: "",
        Documento: "",
        Status: false,
    });
    const vencimiento = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const fechaVencimiento = format(vencimiento, "PPpp", { locale: es });
    const datosQR = { usuario: invitacion, vencimiento };
    const dataString = JSON.stringify(datosQR);

    const recargar = () => {
        setInvitado({
            personal_id: user.id,
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
                alertWarning("Esta persona superó el límite de invitaciones mensuales.");
            }
        } catch (error) {
            alertWarning("Invitado" + error.message);
        }
    };

    return {
        dataString, invitado, generado, loading, fechaVencimiento, handleChange, handleSubmit, recargar
    }
}