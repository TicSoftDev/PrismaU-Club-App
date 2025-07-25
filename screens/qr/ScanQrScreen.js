import { ActivityIndicator, Button, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import QrExpirado from '../../components/qr/QrExpirado';
import ScannerQr from '../../components/qr/ScannerQr';
import DataResult from '../../components/search/DataResult';
import useQr from '../../hooks/useQr';

export default function ScanQrScreen({ isActive = true }) {
  const { scanned, data, fechaVencimiento, ahora, isLoading, newScanner, handleBarCodeScanned } = useQr();
  const isExpired = scanned && fechaVencimiento && fechaVencimiento < ahora;

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#098221" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 justify-center`}>
      {!scanned && !isExpired ?
        <ScannerQr handleBarCodeScanned={handleBarCodeScanned} scanned={scanned} isActive={isActive} /> :
        isExpired ? <QrExpirado /> :
          scanned && !isExpired ?
            <DataResult data={data} /> :
            <Text>Loading...</Text>
      }
      {scanned &&
        <Button title={'Toca para escanear de nuevo'} onPress={newScanner} style={tw`mt-4`} />
      }
    </View>
  );
}