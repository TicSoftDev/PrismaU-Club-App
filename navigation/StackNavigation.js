import { createStackNavigator } from "@react-navigation/stack";
import { styles } from "../assets/styles/Header";
import { Routes } from "../routes/Routes";
import LoginScreen from "../screens/auth/LoginScreen";
import RegistroScreen from "../screens/auth/RegistroScreen";
import EspaciosScreen from "../screens/espacios/EspaciosScreen";
import EventosScreen from "../screens/eventos/EventosScreen";
import FamiliaresScreen from "../screens/familiares/FamiliaresScreen";
import InvitacionScreen from "../screens/invitaciones/InvitacionScreen";
import SolicitudesScreen from "../screens/solicitudes/SolicitudesScreen";
import BotonLogout from "../utilities/Header/BotonLogout";
import HeaderNavigation from "../utilities/Header/HeaderNavigation";
import { TopNavigation } from "./TopNavigation";

const Stack = createStackNavigator();

export const StackNavigation = () => {

    return (
        <Stack.Navigator >
            <Stack.Screen name={Routes.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name={Routes.REGISTER} component={RegistroScreen} options={{
                headerTitle: () => <HeaderNavigation />, headerStyle: styles.headerStyle, headerBackTitleVisible: false,
            }} />
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
            <Stack.Screen name={Routes.ESPACIO} component={EspaciosScreen} options={{
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
        </Stack.Navigator>
    );
};