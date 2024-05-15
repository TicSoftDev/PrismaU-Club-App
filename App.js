import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/AuthContext';
import useApp from './hooks/useApp';
import Navigation from './navigation/Navigation';
import SplashScreen from './screens/SplashScreen';


export default function App() {

  const { isSplashReady, isUserLoggedIn } = useApp();

  if (!isSplashReady) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <Navigation />
      <Toast />
    </AuthProvider>
  );
}
