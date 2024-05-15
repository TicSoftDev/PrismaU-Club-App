import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import tw from 'tailwind-react-native-classnames'

export default function QrExpirado() {
    return (
        <ScrollView style={tw`flex-1`}>
            <View style={tw`absolute h-1/2 w-full bg-red-500`} />
            <View style={tw`h-20 w-full bg-red-500 pt-12 px-4`}>
                <Text style={tw`text-2xl font-bold text-white`}>Código QR expirado</Text>
            </View>
            <View style={tw`px-4 pt-8 pb-5 w-full`}>
                <View style={tw`flex justify-center items-center bg-white rounded-lg p-4 shadow-lg`}>
                    <QRCode color='red' value={'Qr expirado'} size={300} />
                </View>
            </View>
        </ScrollView>
    )
} 