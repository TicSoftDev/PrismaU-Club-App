import { Text, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import tw from 'tailwind-react-native-classnames';
import { alertSucces, alertWarning } from '../../utilities/toast/Toast';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function PagoMensualidades({ initPoint, cerrarModal }) {
    return (
        <>
            {initPoint && (
                <View style={tw`flex-1 bg-gray-50 mb-12`}>
                    <TouchableOpacity style={tw`flex flex-row items-center justify-center p-4 bg-yellow-500 rounded-lg`} onPress={cerrarModal}>
                        <FontAwesome5 name="arrow-left" size={15} color="white" />
                        <Text style={tw`text-sm font-bold text-white ml-2`}>Cancelar pago</Text>
                    </TouchableOpacity>
                    <WebView
                        source={{ uri: initPoint }}
                        onNavigationStateChange={({ url }) => {
                            if (url.includes('success')) {
                                alertSucces('¡Pago exitoso!');
                                cerrarModal();
                            } else if (url.includes('failure')) {
                                alertWarning('Pago fallido');
                                cerrarModal();
                            } else if (url.includes('pending')) {
                                alertWarning('Pago pendiente');
                                cerrarModal();
                            }
                        }}
                    />
                </View>
            )}
        </>
    )
}