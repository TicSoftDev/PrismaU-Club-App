import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Carnet from '../components/carnet/Carnet';
import { useAuthContext } from '../context/AuthContext';

export default function CarnetScreen() {
  const { user, credenciales } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [rol, setRol] = useState('');
  const [primerNombre, setPrimerNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');

  useEffect(() => {
    if (user && credenciales) {
      setData(JSON.stringify(user));
      const rol = (credenciales.Rol === 0 || credenciales.Rol === 1 || credenciales.Rol === 4 || credenciales.Rol === 6) ? 'EMPLEADO' : 'ASOCIADO';
      const primerNombre = user.Nombre.split(' ')[0];
      const primerApellido = user.Apellidos.split(' ')[0];

      setRol(rol);
      setPrimerNombre(primerNombre);
      setPrimerApellido(primerApellido);
      setIsLoading(false);
    }
  }, [user, credenciales]);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={tw`text-lg mt-4`}>Cargando...</Text>
      </View>
    );
  }

  return (
    <Carnet user={user} primerApellido={primerApellido} primerNombre={primerNombre} rol={rol} data={data} />
  );
}
