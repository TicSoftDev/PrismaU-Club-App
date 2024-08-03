import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/AuthContext';
import { StackNavigation } from './navigation/StackNavigation';

Ionicons.loadFont();
export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
        <PaperProvider>
          <StackNavigation />
          <Toast />
        </PaperProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
