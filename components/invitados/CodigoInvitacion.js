import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { captureRef } from 'react-native-view-shot';
import tw from 'tailwind-react-native-classnames';

export default function CodigoInvitacion({ dataString, fechaVencimiento, recargar, invitacion }) {
    const viewRef = useRef();
    const [hideButtons, setHideButtons] = useState(false);

    const shareScreen = async () => {
        try {
            setHideButtons(true);
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 1,
            });
            setHideButtons(false);
            const shareableUri = `${FileSystem.documentDirectory}shared_screen.png`;
            await FileSystem.copyAsync({
                from: uri,
                to: shareableUri,
            });
            await Sharing.shareAsync(shareableUri);
        } catch (error) {
            setHideButtons(false);
            console.error('Error sharing screen', error);
        }
    };

    return (
        <ScrollView style={tw`flex-1 bg-gray-50`} ref={viewRef}>
            <View style={tw`w-full bg-green-500 px-4 py-5 justify-center`}>
                <View style={tw`flex-row items-center justify-center`}>
                    <FontAwesome5 name="qrcode" size={28} color="white" style={tw`mr-3`} />
                    <Text style={tw`text-2xl font-bold text-white`}>Código de Invitación</Text>
                </View>
            </View>

            <View style={tw`px-4 pt-6 pb-4`}>
                <View style={tw`bg-white rounded-2xl p-6 shadow-lg border border-gray-100`}>
                    <View style={tw`items-center mb-6`}>
                        <View style={tw`bg-white p-4 rounded-xl shadow-sm border-2 border-gray-100`}>
                            <QRCode color='black' value={dataString} size={200} />
                        </View>
                    </View>

                    <View style={tw`mb-4`}>
                        <Text style={tw`text-lg font-bold text-gray-800 mb-3 text-center`}>
                            Información del Invitado
                        </Text>

                        <View style={tw`flex-row items-center mb-2 px-3 py-2 bg-gray-50 rounded-lg`}>
                            <FontAwesome5 name="user" size={16} color="#4B5563" style={tw`mr-3`} />
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-sm text-gray-600`}>Nombre completo</Text>
                                <Text style={tw`text-base font-semibold text-gray-800`}>
                                    {invitacion.Nombre + " " + invitacion.Apellidos}
                                </Text>
                            </View>
                        </View>

                        <View style={tw`flex-row items-center mb-2 px-3 py-2 bg-gray-50 rounded-lg`}>
                            <FontAwesome5 name="id-card" size={16} color="#4B5563" style={tw`mr-3`} />
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-sm text-gray-600`}>Identificación</Text>
                                <Text style={tw`text-base font-semibold text-gray-800`}>
                                    {invitacion.Documento}
                                </Text>
                            </View>
                        </View>

                        <View style={tw`flex-row items-center mb-2 px-3 py-2 bg-gray-50 rounded-lg`}>
                            <FontAwesome5 name="user-friends" size={16} color="#4B5563" style={tw`mr-3`} />
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-sm text-gray-600`}>Invitado por</Text>
                                <Text style={tw`text-base font-semibold text-gray-800`}>
                                    {invitacion.usuario_info.Nombre + " " + invitacion.usuario_info.Apellidos}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={tw`bg-red-50 border border-red-200 rounded-xl p-4 mt-2`}>
                        <View style={tw`flex-row items-center justify-center`}>
                            <FontAwesome5 name="clock" size={18} color="#DC2626" style={tw`mr-2`} />
                            <Text style={tw`text-sm text-red-600 font-medium`}>Válido hasta</Text>
                        </View>
                        <Text style={tw`text-lg font-bold text-red-700 text-center mt-1`}>
                            {fechaVencimiento}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={tw`px-4 pb-6`}>
                <View style={tw`bg-blue-50 border border-blue-200 rounded-xl p-4`}>
                    <View style={tw`flex-row items-start`}>
                        <FontAwesome5 name="info-circle" size={20} color="#2563EB" style={tw`mr-3 mt-1`} />
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-sm font-semibold text-blue-800 mb-1`}>
                                Instrucciones importantes
                            </Text>
                            <Text style={tw`text-sm text-blue-700 leading-5`}>
                                Para acceder a las instalaciones debe presentar este código QR junto con su documento de identificación (CC, TI).
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {!hideButtons && (
                <View style={tw`px-4 pb-8`}>
                    <TouchableOpacity
                        onPress={recargar}
                        style={tw`flex-row justify-center items-center bg-green-500 p-4 rounded-xl mb-4 shadow-sm`}
                    >
                        <FontAwesome5 name="plus" size={18} color="white" style={tw`mr-2`} />
                        <Text style={tw`text-lg font-bold text-white`}>Generar Nueva Invitación</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={shareScreen}
                        style={tw`flex-row justify-center items-center bg-blue-500 p-4 rounded-xl shadow-sm`}
                    >
                        <FontAwesome5 name="share-alt" size={18} color="white" style={tw`mr-2`} />
                        <Text style={tw`text-lg font-bold text-white`}>Compartir Invitación</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}