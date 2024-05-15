import { Text, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import tw from 'tailwind-react-native-classnames'
import { useAuthContext } from '../context/AuthContext';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import CodigoQr from '../components/qr/CodigoQr';

export default function QrScreen() {

  const { user, credenciales } = useAuthContext();
  const ahora = new Date();
  const vencimiento = new Date(ahora.getTime() + 24 * 60 * 60 * 1000);
  const fechaVencimientoTexto = format(vencimiento, "PPpp", { locale: es });
  const fechaVencimiento = vencimiento.toISOString();
  const datosQR = {
    usuario: user,
    rol: credenciales.Rol,
    vencimiento: fechaVencimiento
  };
  const dataString = JSON.stringify(datosQR);

  return (
    <CodigoQr user={user} dataString={dataString} fechaVencimientoTexto={fechaVencimientoTexto} />
  )
}