import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getCantidadFamiliaresSocio } from "../services/FamiliaresService";
import { getCantidadInvitadosSocio } from "../services/InvitadosService";
import { getCantidadReservasSocio } from "../services/ReservasService";
import { getCantidadSolicitudesSocio } from "../services/SolicitudesService";
import { alertWarning } from "../utilities/toast/Toast";

export default function useCantidad() {
  const { token, user, credenciales, socio } = useAuthContext();

  const [contFamiliaresSocio, setContFamiliaresSocio] = useState(0);
  const [contInvitadosSocio, setContInvitadosSocio] = useState(0);
  const [contReservasSocio, setContReservasSocio] = useState(0);
  const [contSolicitudesSocio, setContSolicitudesSocio] = useState(0);

  const cantidadFamiliaresSocio = async (id, rolNombre) => {
    try {
      const data = await getCantidadFamiliaresSocio(id, rolNombre, token);
      setContFamiliaresSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message || error);
      console.log("count familiares", error);
    }
  };

  const cantidadInvitadosSocio = async (id) => {
    try {
      const data = await getCantidadInvitadosSocio(id, token);
      setContInvitadosSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message || error);
      console.log("count invitados", error);
    }
  };

  const cantidadReservasSocio = async (id) => {
    try {
      const data = await getCantidadReservasSocio(token, id);
      setContReservasSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message || error);
      console.log("count reservas", error);
    }
  };

  const cantidadSolicitudesSocio = async (id) => {
    try {
      const data = await getCantidadSolicitudesSocio(token, id);
      setContSolicitudesSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message || error);
      console.log("count solicitudes", error);
    }
  };

  const refrescarContadores = useCallback(async () => {
    const rol = Number(credenciales?.Rol);
    const esFamiliarConSocio = rol === 5 && socio && (socio.Rol === 2 || socio.Rol === 3);

    const idConsulta = esFamiliarConSocio ? socio.id : user?.id;
    const rolNombre = esFamiliarConSocio
      ? (socio.Rol === 2 ? "Asociado" : "Adherente")
      : (rol === 2 ? "Asociado" : rol === 3 ? "Adherente" : null);

    if (!idConsulta || !rolNombre) return;

    await Promise.all([
      cantidadFamiliaresSocio(idConsulta, rolNombre),
      cantidadInvitadosSocio(user?.user_id),
      cantidadReservasSocio(idConsulta),
      cantidadSolicitudesSocio(idConsulta),
    ]);
  }, [credenciales, socio, user?.id, token]);

  useEffect(() => {
    refrescarContadores();
  }, [refrescarContadores]);

  return {
    contFamiliaresSocio,
    contInvitadosSocio,
    contReservasSocio,
    contSolicitudesSocio,
    refrescarContadores,
  };
}