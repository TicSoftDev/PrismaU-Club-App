import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { captureRef } from 'react-native-view-shot';
import tw from 'tailwind-react-native-classnames';

export default function CodigoInvitacion({ dataString, fechaVencimiento, recargar }) {
    const viewRef = useRef();
    const [hideButtons, setHideButtons] = useState(false);

    const shareScreen = async () => {
        try {
            setHideButtons(true);  // Ocultar botones
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 1,
            });
            setHideButtons(false);  // Volver a mostrar botones
            const shareableUri = `${FileSystem.documentDirectory}shared_screen.png`;
            await FileSystem.copyAsync({
                from: uri,
                to: shareableUri,
            });
            await Sharing.shareAsync(shareableUri);
        } catch (error) {
            setHideButtons(false);  // Volver a mostrar botones en caso de error
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
                    <QRCode color='black' value={dataString} size={200} />
                    <Text style={tw`text-lg mt-4 font-bold`}>Vence: {fechaVencimiento}</Text>
                </View>
            </View>
            <View style={tw`px-4 pb-8 w-full`}>
                <Text style={tw`text-lg text-center`}>
                    Recuerde que para acceder a las instalaciones usted deberá acompañar este QR con su identificación (CC, TI).
                </Text>
            </View>
            {!hideButtons && (
                <>
                    <TouchableOpacity onPress={recargar} style={tw`flex flex-row justify-center items-center bg-gray-200 p-3 rounded-full mx-5`}>
                        <FontAwesome5 name="qrcode" size={20} color="black" />
                        <Text style={tw`text-lg font-bold ml-2`}>Generar otra invitación</Text>
                    </TouchableOpacity>
                    <View style={tw`p-4 flex-row justify-center`}>
                        <TouchableOpacity onPress={shareScreen} style={tw`p-3 bg-gray-200 rounded-full`}>
                            <FontAwesome5 name="share-alt" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </ScrollView>
    );
}