import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { useAuthContext } from '../../context/AuthContext';
import { servidorBack } from '../../routes/Routes';

const FormProfile = ({ toggleModal }) => {
    const { user } = useAuthContext();

    return (
        <ScrollView style={tw`bg-gray-50 flex-1`}>
            <View style={tw`items-center p-8 bg-green-400`}>
                <View style={tw`w-32 h-32 rounded-full bg-gray-200 items-center justify-center shadow-md`}>
                    <Image
                        source={user.imagen ? { uri: servidorBack + user.imagen } : imagenes.avatar}
                        style={tw`w-28 h-28 rounded-full`}
                    />
                </View>
                <Text style={tw`mt-4 text-3xl font-bold text-white`}>{user.Nombre}</Text>
                <Text style={tw`text-lg text-white`}>{user.Apellidos}</Text>
            </View>

            <View style={tw`mt-2 bg-white py-5 px-2`}>
                <Text style={tw`text-xl font-semibold mb-4 px-2`}>INFORMACIÓN</Text>
                <InformationItem icon="id-card" label="Documento" value={user.TipoDocumento + ': ' + user.Documento} />
                <InformationItem icon="envelope" label="Correo" value={user.Correo} />
                <InformationItem icon="phone-alt" label="Teléfono" value={user.Telefono} />
                <InformationItem icon="map-marker-alt" label="Dirección" value={user.DireccionResidencia || 'No registrada'} />
            </View>

            <View style={tw`mt-2 bg-white p-5 shadow-sm`}>
                <TouchableOpacity style={tw`mt-4 bg-green-500 p-2 rounded-full shadow`} onPress={toggleModal}>
                    <Text style={tw`text-white text-center`}>Cambiar Contraseña</Text>
                </TouchableOpacity>
            </View>
           
        </ScrollView>
    );
};

const InformationItem = ({ icon, label, value }) => (
    <View style={tw`flex-row items-center p-3 border-b border-gray-200`}>
        <FontAwesome5 name={icon} size={22} color="#4b5563" style={tw`mr-4`} />
        <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-bold text-gray-900`}>{label}</Text>
            <Text style={tw`text-xs text-gray-500`}>{value}</Text>
        </View>
    </View>
);

export default FormProfile;
