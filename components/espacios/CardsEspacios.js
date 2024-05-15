import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { servidorBack } from '../../routes/Routes';

export default function CardsEspacios({ espacios, isLoading }) {

    if (isLoading) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#098221" />
                <Text style={tw`mt-2 text-lg text-gray-700`}>Cargando...</Text>
            </View>
        )
    }

    return (
        <>
            {
                espacios && espacios.length > 0 ? (
                    <View style={tw`p-4`}>
                        {
                            espacios.map((espacio, index) => (
                                <TouchableOpacity key={index}>
                                    <View style={tw`bg-white rounded-lg overflow-hidden shadow-md mb-4`}>
                                        <Image source={espacio.imagen ? { uri: servidorBack + espacio.imagen } : imagenes.logoPrisma} style={tw`w-full h-40`} />
                                        <View style={tw`p-4`}>
                                            <Text style={tw`text-lg font-semibold mb-2`}>{espacio.Descripcion}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                ) : (
                    <View style={tw`justify-center items-center flex-1 bg-white mt-20`}>
                        <Image source={imagenes.search} style={tw`w-60 h-60`} resizeMode='contain' />
                        <Text style={tw`text-lg text-gray-700`}>No hay espacios registrados.</Text>
                    </View>
                )
            }
        </>
    );
}
