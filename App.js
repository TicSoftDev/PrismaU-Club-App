import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/AuthContext';
import useApp from './hooks/useApp';
import Navigation from './navigation/Navigation';
import SplashScreen from './screens/SplashScreen';
import { PaperProvider } from 'react-native-paper';


export default function App() {

  const { isSplashReady, isUserLoggedIn } = useApp();

  if (!isSplashReady) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <PaperProvider>
        <Navigation />
        <Toast />
      </PaperProvider>
    </AuthProvider>
  );
}
