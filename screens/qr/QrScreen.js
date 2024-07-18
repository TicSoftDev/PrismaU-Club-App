import { useFocusEffect } from '@react-navigation/native';
import { addHours } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import es from 'date-fns/locale/es';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import CodigoQr from '../../components/qr/CodigoQr';
import { useAuthContext } from '../../context/AuthContext';

export default function QrScreen() {
  const { user, credenciales } = useAuthContext();
  const [dataString, setDataString] = useState('');
  const [fechaVencimientoTexto, setFechaVencimientoTexto] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const ahora = new Date();
      const zonaHoraria = 'America/Bogota';
      const vencimiento = addHours(ahora, 12);

      const fechaVencimientoTexto = formatInTimeZone(vencimiento, zonaHoraria, 'PPpp', { locale: es });
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

      setDataString(dataString);
      setFechaVencimientoTexto(fechaVencimientoTexto);
      setIsLoading(false);
    }, [user, credenciales])
  );

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={tw`text-lg mt-4`}>Cargando...</Text>
      </View>
    );
  }

  return (
    <CodigoQr user={user} dataString={dataString} fechaVencimientoTexto={fechaVencimientoTexto} />
  );
}
