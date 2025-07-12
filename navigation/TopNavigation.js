import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { useAuthContext } from '../context/AuthContext';

import SearchScreen from '../screens/buscador/SearchScreen';
import CarnetScreen from '../screens/carnet/CarnetScreen';
import EntradasInvitadosScreen from '../screens/entradas/EntradasInvitadosScreen';
import EntradasScreen from '../screens/entradas/EntradasScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/perfil/ProfileScreen';
import QrScreen from '../screens/qr/QrScreen';
import ScanQrScreen from '../screens/qr/ScanQrScreen';

export const TopNavigation = () => {
  const layout = useWindowDimensions();
  const { credenciales } = useAuthContext();
  const userRole = Number(credenciales?.Rol);
  const [index, setIndex] = useState(0);

  const availableRoutes = useMemo(() => [
    { key: 'home', title: 'Inicio', icon: 'home-outline', component: HomeScreen, roles: [1, 2, 3, 4, 5, 6] },
    { key: 'carnet', title: 'Carnet', icon: 'card-outline', component: CarnetScreen, roles: [1, 2, 3, 4, 5] },
    { key: 'qr', title: 'QR', icon: 'qr-code-outline', component: QrScreen, roles: [1, 2, 3, 4, 5] },
    { key: 'scanqr', title: 'Escanear', icon: 'scan-outline', component: ScanQrScreen, roles: [6] },
    { key: 'search', title: 'Buscar', icon: 'search-outline', component: SearchScreen, roles: [6] },
    { key: 'entradas', title: 'Entradas', icon: 'log-in-outline', component: EntradasScreen, roles: [6] },
    { key: 'invitados', title: 'Invitados', icon: 'people-outline', component: EntradasInvitadosScreen, roles: [6] },
    { key: 'profile', title: 'Perfil', icon: 'person-circle-outline', component: ProfileScreen, roles: [1, 2, 3, 4, 5, 6] },
  ], []);

  const filteredRoutes = availableRoutes.filter(r => r.roles.includes(userRole));

  const sceneMap = useMemo(() => {
    const map = {};
    filteredRoutes.forEach((route, routeIndex) => {
      map[route.key] = () => {
        const Component = route.component;
        const isActive = index === routeIndex;

        if (route.key === 'scanqr') {
          return <Component isActive={isActive} />;
        }

        return <Component />;
      };
    });
    return SceneMap(map);
  }, [filteredRoutes, index]);

  const renderTabBar = props => (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
      {props.navigationState.routes.map((route, i) => {
        const focused = index === i;
        const found = filteredRoutes.find(r => r.key === route.key);
        return (
          <TouchableOpacity
            key={route.key}
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 10,
              borderBottomWidth: focused ? 3 : 0,
              borderBottomColor: '#09892F',
            }}
            onPress={() => setIndex(i)}
          >
            <Ionicons
              name={focused ? found.icon.replace('-outline', '') : found.icon}
              size={24}
              color={focused ? '#09892F' : 'gray'}
            />
            <Text style={{ color: focused ? '#09892F' : 'gray', fontSize: 12 }}>
              {found.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <TabView
      navigationState={{ index, routes: filteredRoutes.map(({ key, title }) => ({ key, title })) }}
      renderScene={sceneMap}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      lazy={true}
      lazyPreloadDistance={0}
    />
  );
};