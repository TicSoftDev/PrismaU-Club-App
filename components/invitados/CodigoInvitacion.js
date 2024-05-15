import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import tw from 'tailwind-react-native-classnames'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function CodigoInvitacion({ dataString, fechaVencimiento, recargar }) {

    return (
        <ScrollView style={tw`flex-1`}>
            <View style={tw`absolute h-1/2 w-full bg-green-500`} />
            <View style={tw`h-20 w-full bg-green-500 pt-12 px-4`}>
                <Text style={tw`text-2xl font-bold text-white`}>Código de Invitación</Text>
            </View>
            <View style={tw`px-4 pt-8 pb-8 w-full`}>
                <View style={tw`flex justify-center items-center bg-white rounded-lg p-4 shadow-lg`}>
                    <QRCode color='black' value={dataString} size={300} />
                    <Text style={tw`text-lg mt-4 font-bold`}>Vence: {fechaVencimiento}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={recargar} style={tw`flex flex-row justify-center items-center bg-yellow-200 p-3 rounded-full mx-5`}>
                <FontAwesome5 name="qrcode" size={20} color="black" />
                <Text style={tw`text-lg font-bold ml-2`}>Generar otra invitación</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
