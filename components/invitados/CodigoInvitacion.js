import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import tw from 'tailwind-react-native-classnames';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';

export default function CodigoInvitacion({ dataString, fechaVencimiento, recargar }) {
    const viewRef = useRef();

    const shareScreen = async () => {
        try {
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 1,
            });
            const shareableUri = `${FileSystem.documentDirectory}shared_screen.png`;
            await FileSystem.copyAsync({
                from: uri,
                to: shareableUri,
            });
            await Sharing.shareAsync(shareableUri);
        } catch (error) {
            console.error('Error sharing screen', error);
        }
    };

    return (
        <ScrollView style={tw`flex-1`} ref={viewRef}>
            <View style={tw`absolute h-1/2 w-full bg-green-500`} />
            <View style={tw`h-20 w-full bg-green-500 pt-12 px-4`}>
                <Text style={tw`text-2xl font-bold text-white`}>Código de Invitación</Text>
            </View>
            <View style={tw`px-4 pt-8 pb-8 w-full`}>
                <View style={tw`flex justify-center items-center bg-white rounded-lg p-4 shadow-lg`}>
                    <QRCode color='black' value={dataString} size={300} />
                    <Text style={tw`text-lg mt-4 font-bold`}>Vence: {fechaVencimiento}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={recargar} style={tw`flex flex-row justify-center items-center bg-gray-200 p-3 rounded-full mx-5`}>
                <FontAwesome5 name="qrcode" size={20} color="black" />
                <Text style={tw`text-lg font-bold ml-2`}>Generar otra invitación</Text>
            </TouchableOpacity>
            <View style={tw`p-4 flex-row justify-center`}>
                <TouchableOpacity onPress={shareScreen} style={tw`p-3 bg-gray-200 rounded-full`}>
                    <FontAwesome5 name="share-alt" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}