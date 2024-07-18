import { Ionicons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/AuthContext';
import useApp from './hooks/useApp';
import { StackNavigation } from './navigation/StackNavigation';
import SplashScreen from './screens/splash/SplashScreen';


Ionicons.loadFont();
export default function App() {

  const { isSplashReady } = useApp();

  if (!isSplashReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <PaperProvider>
          <StackNavigation />
          <Toast />
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
