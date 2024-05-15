import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuthContext } from "../context/AuthContext";
import { Routes } from "../routes/Routes";
import CarnetScreen from "../screens/CarnetScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import QrScreen from "../screens/QrScreen";
import ScanQrScreen from "../screens/ScanQrScreen";
import SearchScreen from "../screens/SearchScreen";
const Tab = createMaterialTopTabNavigator();

export const TopNavigation = () => {

    const navigation = useNavigation();
    const { credenciales } = useAuthContext();

    const routes = [
        { name: Routes.PRINCIPAL, component: HomeScreen, roles: ["1", "2", "3", "4", "5", "6"] },
        { name: Routes.CARNET, component: CarnetScreen, roles: ["1", "2", "3", "4", "5"] },
        { name: Routes.QR, component: QrScreen, roles: ["1", "2", "3", "4", "5"] },
        { name: Routes.SCANQR, component: ScanQrScreen, roles: ["6"] },
        { name: Routes.SEARCH, component: SearchScreen, roles: ["6"] },
        { name: Routes.PROFILE, component: ProfileScreen, roles: ["1", "2", "3", "4", "5", "6"] },
    ];

    const TabBarIcon = ({ routeName, focused }) => {
        let iconName;
        switch (routeName) {
            case Routes.PRINCIPAL:
                iconName = focused ? "home" : "home-outline";
                break;
            case Routes.CARNET:
                iconName = focused ? "id-card" : "id-card-outline";
                break;
            case Routes.QR:
                iconName = focused ? "qr-code" : "qr-code-outline";
                break;
            case Routes.SCANQR:
                iconName = focused ? "scan" : "scan-outline";
                break;
            case Routes.SEARCH:
                iconName = focused ? "search" : "search-outline";
                break;
            case Routes.PROFILE:
                iconName = focused ? "person-circle" : "person-circle-outline";
                break;
            default:
                iconName = focused ? "alert-circle" : "alert-circle-outline"; // Un ícono predeterminado
        }
        return <Ionicons name={iconName} size={25} color="#09892F" />;
    };

    const accessibleRoutes = routes.filter(route => route.roles.includes(credenciales.Rol));

    useEffect(() => {
        if (accessibleRoutes.length === 0) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: Routes.LOGIN }],
                })
            );
        }
    }, [accessibleRoutes.length, navigation]);

    if (accessibleRoutes.length === 0) {
        return null;
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon routeName={route.name} focused={focused} />
                ),
                tabBarActiveTintColor: 'yellow',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: 'white' },
                tabBarIndicatorStyle: { backgroundColor: '#09892F' },
                tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold', color: '#09892F' },
            })}
        >
            {accessibleRoutes.map(route => (
                <Tab.Screen key={route.name} name={route.name} component={route.component} />
            ))}
        </Tab.Navigator>

    )
}
