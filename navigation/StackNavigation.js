import { createStackNavigator } from "@react-navigation/stack";
import { styles } from "../assets/styles/Header";
import { useAuthContext } from "../context/AuthContext";
import { Routes } from "../routes/Routes";
import ChangePasswordScreen from "../screens/auth/ChangePasswordScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RecuperacionScreen from "../screens/auth/RecuperacionScreen";
import RegistroScreen from "../screens/auth/RegistroScreen";
import VerifyCodeScreen from "../screens/auth/VerifyCodeScreen";
import DetalleEncuesta from "../screens/encuestas/DetalleEncuesta";
import EncuestasScreen from "../screens/encuestas/EncuestasScreen";
import EventosScreen from "../screens/eventos/EventosScreen";
import FamiliaresScreen from "../screens/familiares/FamiliaresScreen";
import InvitacionScreen from "../screens/invitaciones/InvitacionScreen";
import ReservarScreen from "../screens/reservas/ReservarScreen";
import ReservasScreen from "../screens/reservas/ReservasScreen";
import CrearSolicitudScreen from "../screens/solicitudes/CrearSolicitudScreen";
import DetalleSolicitudScreen from "../screens/solicitudes/DetalleSolicitudScreen";
import SolicitudesScreen from "../screens/solicitudes/SolicitudesScreen";
import SplashScreen from "../screens/splash/SplashScreen";
import BotonLogout from "../utilities/Header/BotonLogout";
import HeaderNavigation from "../utilities/Header/HeaderNavigation";
import { TopNavigation } from "./TopNavigation";
import PoliticasScreen from "../screens/politicas/PoliticasScreen";

const Stack = createStackNavigator();

export const StackNavigation = () => {

    const { token, isLoading } = useAuthContext();

    if (isLoading) {
        return <SplashScreen />
    }

    return (
        <Stack.Navigator >
            {!token ? (
                <Stack.Group>
                    <Stack.Screen name={Routes.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name={Routes.REGISTER} component={RegistroScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false,
                    }} />
                    <Stack.Screen name={Routes.RECUPERAR} component={RecuperacionScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false,
                    }} />
                    <Stack.Screen name={Routes.VALIDAR} component={VerifyCodeScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false,
                    }} />
                    <Stack.Screen name={Routes.RESET} component={ChangePasswordScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false,
                    }} />
                </Stack.Group>
            ) : (
                <Stack.Group>
                    <Stack.Screen name={Routes.HOME} component={TopNavigation} options={{
                        headerTitle: () => <HeaderNavigation />, headerLeft: () => null, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />, headerStyle: styles.headerStyle,
                    }} />
                    <Stack.Screen name={Routes.INVITACION} component={InvitacionScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                    <Stack.Screen name={Routes.FAMILIARES} component={FamiliaresScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                    <Stack.Screen name={Routes.EVENTOS} component={EventosScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                    <Stack.Screen name={Routes.SOLICITUDES} component={SolicitudesScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                    <Stack.Screen name={Routes.CREAR_SOLICITUD} component={CrearSolicitudScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                    <Stack.Screen name={Routes.DETALLE_SOLICITUD} component={DetalleSolicitudScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                    <Stack.Screen name={Routes.RESERVAS} component={ReservasScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                    <Stack.Screen name={Routes.RESERVAR} component={ReservarScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                    <Stack.Screen name={Routes.ENCUESTAS} component={EncuestasScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                    <Stack.Screen name={Routes.ENCUESTA} component={DetalleEncuesta} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                    <Stack.Screen name={Routes.POLITICAS} component={PoliticasScreen} options={{
                        headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false, headerTitleAlign: 'center',
                        headerRight: () => <BotonLogout />
                    }} />
                </Stack.Group>
            )}


        </Stack.Navigator>
    );
};