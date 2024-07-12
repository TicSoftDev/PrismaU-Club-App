import { createStackNavigator } from "@react-navigation/stack";
import { Image, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import imagenes from "../assets/img/imagenes";
import { Routes } from "../routes/Routes";
import LoginScreen from "../screens/LoginScreen";
import { TopNavigation } from "./TopNavigation";
import InvitacionScreen from "../screens/InvitacionScreen";
import HeaderNavigation from "../utilities/Header/HeaderNavigation";
import { styles } from "../assets/styles/Header";
import BotonLogout from "../utilities/Header/BotonLogout";
import FamiliaresScreen from "../screens/FamiliaresScreen";
import EspaciosScreen from "../screens/EspaciosScreen";
import RegistroScreen from "../screens/RegistroScreen";

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
        </Stack.Navigator>
    );
};