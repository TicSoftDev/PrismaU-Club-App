import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getCantidadFamiliaresSocio } from "../services/FamiliaresService";
import { getCantidadInvitadosSocio } from "../services/InvitadosService";
import { alertWarning } from "../utilities/toast/Toast";

export default function useCantidad() {

    const { token, user, credenciales } = useAuthContext();
    const [contFamiliaresSocio, setContFamiliaresSocio] = useState(0);
    const [contInvitadosSocio, setContInvitadosSocio] = useState(0);

    const cantidadFamiliaresSocio = async () => {
        try {
            const rol = credenciales.Rol == 2 ? "Asociado" : "Adherente";
            const data = await getCantidadFamiliaresSocio(user.id, rol, token);
            setContFamiliaresSocio(data);
        } catch (error) {
            alertWarning('Count error', error.message);
        }
    }

    const cantidadInvitadosSocio = async () => {
        try {
            const data = await getCantidadInvitadosSocio(credenciales.id, token);
            setContInvitadosSocio(data);
        } catch (error) {
            alertWarning('Count error', error.message);
        }
    }

    useEffect(() => {
        cantidadFamiliaresSocio();
        cantidadInvitadosSocio();
    }, [])

    return {
        contFamiliaresSocio, contInvitadosSocio
    }
}