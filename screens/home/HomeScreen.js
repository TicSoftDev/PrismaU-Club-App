import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Bienvenida from '../../components/home/Bienvenida';
import CardsContadores from '../../components/home/CardsContadores';
import Logo from '../../components/home/Logo';
import MenuBienestar from '../../components/home/MenuBienestar';
import MenuPagos from '../../components/home/MenuPagos';
import MenuPortal from '../../components/home/MenuPortal';
import { useAuthContext } from '../../context/AuthContext';
import useCantidad from '../../hooks/useCantidad';
import useHome from '../../hooks/useHome';

export default function HomeScreen() {
  const { user, credenciales } = useAuthContext();
  const { contFamiliaresSocio, contInvitadosSocio, contReservasSocio, contSolicitudesSocio } = useCantidad();

  const { loadingBienestar, loadingPortal, loadingPagos, menuBienestar, menuPortal, menuPagos } = useHome();

  return (
    <ScrollView style={tw`flex-1`}>
      <Bienvenida user={user} rol={credenciales.Rol} />
      {
        (Number(credenciales.Rol) === 2 || Number(credenciales.Rol) === 3 || (Number(credenciales.Rol) === 5 && user.Parentesco === "Esposo (a)")) ?
          <>
            <CardsContadores
              familiares={contFamiliaresSocio}
              invitados={contInvitadosSocio}
              solicitudes={contSolicitudesSocio}
              reservas={contReservasSocio}
            />
            <View style={tw`p-4`}>
              <View style={tw`mb-4`}>
                <Text style={tw`text-lg font-bold mb-3`}>Portal Autogestión</Text>
                {
                  loadingPortal ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <MenuPortal menus={menuPortal} />
                }
              </View>
              <View style={tw`mb-4`}>
                <Text style={tw`text-lg font-bold mb-3`}>Bienestar Institucional</Text>
                {
                  loadingBienestar ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <MenuBienestar menus={menuBienestar} />
                }
              </View>
              <View style={tw`mb-4`}>
                <Text style={tw`text-lg font-bold mb-3`}>Pagos</Text>
                {
                  loadingPagos ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <MenuPagos menus={menuPagos} />
                }
              </View>
            </View>
          </>
          :
          <View style={tw`p-4 mt-10 mb-2`}>
            <Logo />
          </View>
      }
    </ScrollView>
  )
}