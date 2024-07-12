import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Bienvenida from '../components/home/Bienvenida';
import CardsContadores from '../components/home/CardsContadores';
import Logo from '../components/home/Logo';
import MenuOpciones from '../components/home/MenuOpciones';
import Noticias from '../components/home/Noticias';
import { useAuthContext } from '../context/AuthContext';
import useCantidad from '../hooks/useCantidad';
import useNoticias from '../hooks/useNoticias';

export default function HomeScreen() {
  const { user, credenciales } = useAuthContext();
  const { contFamiliaresSocio, contInvitadosSocio } = useCantidad();
  const { noticias, loading } = useNoticias();

  return (
    <ScrollView style={tw`flex-1`}>
      <Bienvenida user={user} rol={credenciales.Rol} />
      {
        credenciales.Rol == 2 || credenciales.Rol == 3 ?
          <>
            <CardsContadores familiares={contFamiliaresSocio} invitados={contInvitadosSocio} />
            <View style={tw`p-4`}>
              <Text style={tw`text-lg font-bold mb-5`}>Panel</Text>
              <MenuOpciones />
            </View>
          </>
          :
          <View style={tw`p-4 mt-10 mb-5`}>
            <Logo />
          </View>
      }
      <View style={tw`p-4 mb-5`}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={tw`mt-5`} />
        ) : (
          noticias.length > 0 && <Noticias noticias={noticias} />
        )}
      </View>
    </ScrollView>
  )
}
