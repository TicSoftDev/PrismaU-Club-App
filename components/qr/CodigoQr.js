import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import tw from 'tailwind-react-native-classnames';

export default function CodigoQr({ user, dataString, fechaVencimientoTexto }) {
  if (!dataString) {
    return <Text>No input text</Text>;
  }

  return (
    <ScrollView style={tw`flex-1 `}>
      <View style={tw`absolute h-1/2 w-full bg-green-500`} />
      <View style={tw`h-20 w-full bg-green-500 pt-8 px-4`}>
        <Text style={tw`text-2xl font-bold text-white`}>Código QR</Text>
      </View>
      <View style={tw`px-4 pt-5 pb-5 w-full`}>
        <View style={tw`flex justify-center items-center bg-white rounded-lg p-4 shadow-lg`}>
          <QRCode color='black' value={dataString} size={300} />
        </View>
      </View>
      <View style={tw`flex justify-center items-center mb-6`}>
        <Text style={tw`text-lg mt-4 font-bold`}>Vence: {fechaVencimientoTexto}</Text>
      </View>
      {user.Estado == 0 &&
        <View style={tw`bg-red-500 w-full py-4 mt-6 flex justify-center items-center`}>
          <Text style={tw`text-lg text-white font-bold text-center`}>Usted se encuentra inactivo, por favor comuníquese con la administración.</Text>
        </View>
      }
    </ScrollView>
  );
}
