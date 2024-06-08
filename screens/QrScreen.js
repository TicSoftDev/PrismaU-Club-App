import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import React from 'react';
import CodigoQr from '../components/qr/CodigoQr';
import { useAuthContext } from '../context/AuthContext';

export default function QrScreen() {

  const { user, credenciales } = useAuthContext();
  const ahora = new Date();
  const vencimiento = new Date(ahora.getTime() + 24 * 60 * 60 * 1000);
  const fechaVencimientoTexto = format(vencimiento, "PPpp", { locale: es });
  const fechaVencimiento = vencimiento.toISOString();
  const usuario = {
    id: user.id,
    imagen: user.imagen,
    nombre: user.Nombre,
    apellidos: user.Apellidos,
    tipoDocumento: user.TipoDocumento,
    documento: user.Documento,
    user_id: credenciales.id
  };
  const datosQR = {
    usuario: usuario,
    rol: credenciales.Rol,
    vencimiento: fechaVencimiento
  };
  const dataString = JSON.stringify(datosQR);
  return (
    <CodigoQr user={user} dataString={dataString} fechaVencimientoTexto={fechaVencimientoTexto} />
  )
}