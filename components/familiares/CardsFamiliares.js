import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';

export default function CardsFamiliares({ familiares, isLoading }) {

    if (isLoading) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#098221" />
                <Text style={tw`mt-2 text-lg text-gray-700`}>Cargando...</Text>
            </View>
        )
    }

    return (
        <View style={tw`flex-1 bg-white`}>
            {
                !familiares || familiares.length === 0 ?
                    <View style={tw`flex-1 justify-center items-center bg-white`}>
                        <Image source={imagenes.search} style={tw`w-60 h-60`} resizeMode='contain' />
                        <Text style={tw`text-lg text-gray-700`}>No hay familiares registrados.</Text>
                    </View>
                    :
                    <View style={tw`p-4`}>
                        <Text style={tw`text-lg font-bold mb-4`}>Listado de Familiares</Text>
                        {familiares.map((item, index) => (
                            <View key={index} style={tw`flex-row items-center p-3 mb-2 rounded-lg bg-gray-100 shadow`}>
                                <FontAwesome5 name="user" size={24} color="green" style={tw`mr-6 ml-2`} />
                                <View style={tw`flex-1`}>
                                    <Text style={tw`text-lg font-semibold`}>{item.Nombre} {item.Apellidos}</Text>
                                    <Text style={tw`text-sm text-gray-600`}>{item.Parentesco}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
            }
        </View>
    )
}
