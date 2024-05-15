import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import DataScanner from '../components/qr/DataScanner';
import QrExpirado from '../components/qr/QrExpirado';
import ScannerQr from '../components/qr/ScannerQr';
import useQr from '../hooks/useQr';

export default function ScanQrScreen() {
  const {
    scanned,
    newScanner,
    handleBarCodeScanned,
    data,
    rol,
    fechaVencimiento,
    ahora,
    isLoading
  } = useQr();

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
        <ScannerQr handleBarCodeScanned={handleBarCodeScanned} />
        :
        isExpired ?
          <QrExpirado />
          :
          scanned && !isExpired ?
            <DataScanner data={data} rol={rol} />
            :
            <Text>Loading...</Text>
      }
      {scanned &&
        <Button title={'Toca para escanear de nuevo'} onPress={newScanner} style={tw`mt-4`} />
      }
    </View>
  );
}
