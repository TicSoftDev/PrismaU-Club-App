import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Routes } from "../routes/Routes";
import QrScreen from "../screens/QrScreen";
import { Ionicons } from '@expo/vector-icons';
import ScanQrScreen from "../screens/ScanQrScreen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => {
                    let iconName;
                    if (route.name === Routes.GENERAR) {
                        iconName = focused ? "qr-code" : "qr-code-outline";
                    } else if (route.name === Routes.ESCANEAR) {
                        iconName = focused ? "scan" : "scan-outline";
                    }
                    return <Ionicons name={iconName} size={size} color="rgb(9, 130, 33)" />
                },
                headerStyle: { backgroundColor: 'rgb(9, 130, 33)', },
                headerTintColor: 'white',
                headerTitleStyle: { fontWeight: 'bold', },
            })}
        >
            <Tab.Screen name={Routes.GENERAR} component={QrScreen} options={{title: 'Código QR'}} />
            <Tab.Screen name={Routes.ESCANEAR} component={ScanQrScreen} options={{title: 'Escanear QR'}} />
        </Tab.Navigator>
    );
};
export default TabNavigation;