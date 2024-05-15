import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Bienvenida from '../components/home/Bienvenida';
import CardsContadores from '../components/home/CardsContadores';
import Logo from '../components/home/Logo';
import MenuOpciones from '../components/home/MenuOpciones';
import { useAuthContext } from '../context/AuthContext';
import useCantidad from '../hooks/useCantidad';

export default function HomeScreen() {
  const { user, credenciales } = useAuthContext();
  const { contFamiliaresSocio, contInvitadosSocio } = useCantidad();

  return (
    <ScrollView style={tw`flex-1`}>
      <Bienvenida user={user} />
      {
        credenciales.Rol == 2 || credenciales.Rol == 3 ?
          <>
            <CardsContadores familiares={contFamiliaresSocio} invitados={contInvitadosSocio} />
            <View style={tw`p-4 mb-5`}>
              <Text style={tw`text-lg font-bold mb-2`}>Panel</Text>
              <MenuOpciones />
              <Logo />
            </View>
          </>
          :
          <View style={tw`p-4 mb-5`}>
            <Logo />
          </View>
      }
    </ScrollView>
  )
}
