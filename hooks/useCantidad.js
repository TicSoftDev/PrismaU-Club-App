import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getCantidadFamiliaresSocio } from "../services/FamiliaresService";
import { getCantidadInvitadosSocio } from "../services/InvitadosService";
import { getCantidadReservasSocio } from "../services/ReservasService";
import { getCantidadSolicitudesSocio } from "../services/SolicitudesService";
import { alertWarning } from "../utilities/toast/Toast";

export default function useCantidad() {
  const { token, user, credenciales } = useAuthContext();

  const [contFamiliaresSocio, setContFamiliaresSocio] = useState(0);
  const [contInvitadosSocio, setContInvitadosSocio] = useState(0);
  const [contReservasSocio, setContReservasSocio] = useState(0);
  const [contSolicitudesSocio, setContSolicitudesSocio] = useState(0);

  const cantidadFamiliaresSocio = async () => {
    try {
      const rolNombre = credenciales.Rol == 2 ? "Asociado" : "Adherente";
      const data = await getCantidadFamiliaresSocio(user.id, rolNombre, token);
      setContFamiliaresSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message || error);
      console.log("count familiares", error);
    }
  };

  const cantidadInvitadosSocio = async () => {
    try {
      const data = await getCantidadInvitadosSocio(credenciales.id, token);
      setContInvitadosSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message || error);
      console.log("count invitados", error);
    }
  };

  const cantidadReservasSocio = async () => {
    try {
      const data = await getCantidadReservasSocio(token, credenciales.id);
      setContReservasSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message || error);
      console.log("count reservas", error);
    }
  };

  const cantidadSolicitudesSocio = async () => {
    try {
      const data = await getCantidadSolicitudesSocio(token, credenciales.id);
      setContSolicitudesSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message || error);
      console.log("count solicitudes", error);
    }
  };

  const refrescarContadores = useCallback(async () => {
    const rol = Number(credenciales?.Rol);
    if (rol !== 2 || rol !== 3) return;

    await Promise.all([
      cantidadFamiliaresSocio(),
      cantidadInvitadosSocio(),
      cantidadReservasSocio(),
      cantidadSolicitudesSocio(),
    ]);
  }, [credenciales]);


  useEffect(() => {
    refrescarContadores();
  }, []);

  return {
    contFamiliaresSocio,
    contInvitadosSocio,
    contReservasSocio,
    contSolicitudesSocio,
    refrescarContadores,
  };
}
