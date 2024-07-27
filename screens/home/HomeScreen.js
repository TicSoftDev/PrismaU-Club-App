import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Bienvenida from '../../components/home/Bienvenida';
import CardsContadores from '../../components/home/CardsContadores';
import Logo from '../../components/home/Logo';
import MenuBienestar from '../../components/home/MenuBienestar';
import MenuPortal from '../../components/home/MenuPortal';
import { useAuthContext } from '../../context/AuthContext';
import useCantidad from '../../hooks/useCantidad';

export default function HomeScreen() {
  const { user, credenciales } = useAuthContext();
  const { contFamiliaresSocio, contInvitadosSocio, contReservasSocio, contSolicitudesSocio } = useCantidad();

  return (
    <ScrollView style={tw`flex-1`}>
      <Bienvenida user={user} rol={credenciales.Rol} />
      {
        (credenciales.Rol == 2 || credenciales.Rol == 3) ?
          <>
            <CardsContadores familiares={contFamiliaresSocio} invitados={contInvitadosSocio} solicitudes={contSolicitudesSocio} reservas={contReservasSocio} />
            <View style={tw`p-4`}>
              <Text style={tw`text-lg font-bold mb-5`}>Portal autogestión</Text>
              <MenuPortal />
            </View>
            <View style={tw`p-4`}>
              <Text style={tw`text-lg font-bold mb-5`}>Bienestar laboral</Text>
              <MenuBienestar />
            </View>
          </>
          :
          <View style={tw`p-4 mt-10 mb-5`}>
            <Logo />
          </View>
      }
    </ScrollView>
  )
}
