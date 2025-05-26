import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getCantidadFamiliaresSocio } from "../services/FamiliaresService";
import { getCantidadInvitadosSocio } from "../services/InvitadosService";
import { getCantidadSolicitudesSocio } from "../services/SolicitudesService";
import { getCantidadReservasSocio } from "../services/ReservasService";
import { alertWarning } from "../utilities/toast/Toast";

export default function useCantidad() {
  const { token, user, credenciales } = useAuthContext();

  const [contFamiliaresSocio, setContFamiliaresSocio] = useState(0);
  const [contInvitadosSocio, setContInvitadosSocio] = useState(0);
  const [contReservasSocio, setContReservasSocio] = useState(0);
  const [contSolicitudesSocio, setContSolicitudesSocio] = useState(0);

  const cantidadFamiliaresSocio = async () => {
    try {
      const rol = credenciales.Rol == 2 ? "Asociado" : "Adherente";
      const data = await getCantidadFamiliaresSocio(user.id, rol, token);
      setContFamiliaresSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message);
    }
  };

  const cantidadInvitadosSocio = async () => {
    try {
      const data = await getCantidadInvitadosSocio(credenciales.id, token);
      setContInvitadosSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message);
    }
  };

  const cantidadReservasSocio = async () => {
    try {
      const data = await getCantidadReservasSocio(token, credenciales.id);
      setContReservasSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message);
    }
  };

  const cantidadSolicitudesSocio = async () => {
    try {
      const data = await getCantidadSolicitudesSocio(token, credenciales.id);
      setContSolicitudesSocio(data);
    } catch (error) {
      alertWarning("Count error", error.message);
    }
  };

  // ✅ Función pública para refrescar desde cualquier componente
  const refrescarContadores = () => {
    cantidadFamiliaresSocio();
    cantidadInvitadosSocio();
    cantidadReservasSocio();
    cantidadSolicitudesSocio();
  };

  // Cargar una vez al montar
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