import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { AppState, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function ScannerQr({ handleBarCodeScanned, scanned, isActive }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [showCamera, setShowCamera] = useState(false);
  const appStateRef = useRef(AppState.currentState);

  // Manejo del estado de la app
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      appStateRef.current = nextAppState;

      if (nextAppState === 'active' && isActive) {
        // La app vuelve al primer plano y la pestaña está activa
        setTimeout(() => setShowCamera(true), 150);
      } else if (nextAppState.match(/inactive|background/)) {
        // La app va al fondo
        setShowCamera(false);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [isActive]);

  // Controlar la cámara basándose en si la pestaña está activa
  useEffect(() => {
    if (isActive && appStateRef.current === 'active' && permission?.granted) {
      // Delay para evitar conflictos al cambiar de pestaña
      const timer = setTimeout(() => {
        setShowCamera(true);
      }, 200);

      return () => {
        clearTimeout(timer);
        setShowCamera(false);
      };
    } else {
      setShowCamera(false);
    }
  }, [isActive, permission?.granted]);

  // Solicitar permisos
  useEffect(() => {
    if (!permission || permission.status !== 'granted') {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return <Text style={tw`text-center mt-4`}>Solicitando permisos...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-center text-red-500 mb-2`}>
          Necesitamos permiso para acceder a la cámara
        </Text>
        <Text onPress={requestPermission} style={tw`text-blue-600 underline`}>
          Otorgar permiso
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      {showCamera ? (
        <>
          <CameraView
            style={tw`flex-1`}
            facing={facing}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'pdf417'],
            }}
          />
          {/* Overlay */}
          <View style={[tw`absolute w-5 h-5 border-t-4 border-l-4 border-white`, { top: '20%', left: '20%' }]} />
          <View style={[tw`absolute w-5 h-5 border-t-4 border-r-4 border-white`, { top: '20%', right: '20%' }]} />
          <View style={[tw`absolute w-5 h-5 border-b-4 border-l-4 border-white`, { bottom: '20%', left: '20%' }]} />
          <View style={[tw`absolute w-5 h-5 border-b-4 border-r-4 border-white`, { bottom: '20%', right: '20%' }]} />
        </>
      ) : (
        <View style={tw`flex-1 justify-center items-center bg-black`}>
          <Text style={tw`text-white text-center`}>
            {isActive ? 'Iniciando cámara...' : 'Cámara pausada'}
          </Text>
        </View>
      )}
    </View>
  );
}