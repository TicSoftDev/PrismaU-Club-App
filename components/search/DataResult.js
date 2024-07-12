import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { servidorBack } from '../../routes/Routes';

export default function DataResult({ data }) {

    const rol = data.rol == 2 ? 'Asociado' : data.rol == 3 ? 'Adherente' : (data.rol == 4 || data.rol == 6) ? 'Empleado' : "Familiar";

    return (
        <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
            <View style={tw`mx-auto max-w-lg w-full bg-white rounded-lg shadow-md overflow-hidden`}>
                <ScrollView contentContainerStyle={tw`flex-grow`}>
                    <View>
                        <View style={tw`flex flex-row justify-center items-center mt-4`}>
                            <Image source={imagenes.logoClub} resizeMode='contain' style={tw`h-10 w-10`} />
                            <View>
                                <Text style={tw`text-lg text-green-800`}>CLUB</Text>
                                <Text style={tw`text-xl font-bold text-green-800 -mt-2`}>SINCELEJO</Text>
                            </View>
                        </View>
                        <View style={tw`items-center mt-5`}>
                            <View style={[tw`rounded-full bg-green-500 items-center justify-center shadow-md`, { width: 135, height: 135 }]}>
                                {data.imagen ?
                                    <Image source={{ uri: servidorBack + data.imagen }} style={tw`h-32 w-32 rounded-full`} /> :
                                    <Image source={imagenes.avatar} style={tw`h-32 w-32 rounded-full`} resizeMode='contain' />
                                }
                            </View>
                        </View>
                        <View style={tw`flex flex-col justify-center items-center mb-6`}>
                            <Text style={tw`mt-4 text-3xl font-bold text-green-700`}>{data.nombre}</Text>
                            <Text style={tw`text-lg text-green-700`}>{data.apellidos}</Text>
                            <Text style={tw`text-xl font-bold text-green-700 mt-5`}>{data.tipoDocumento} {data.documento}</Text>
                        </View>
                        <View style={tw`flex-row items-center justify-between p-5 rounded-b-lg ${data.estado == 0 ? "bg-red-600" : data.estado == 1 ? "bg-green-500" : data.estado == 2 ? "bg-yellow-500" : "bg-purple-500"} shadow`}>
                            <View style={tw`flex-row`}>
                                <FontAwesome5 name="user-cog" size={24} color="white" style={tw`mr-2 ml-2`} />
                                <Text style={tw`text-lg text-white font-semibold`}>{rol}</Text>
                            </View>
                            <View style={tw`flex-row items-center`}>
                                <FontAwesome5 name="eye" size={24} color="white" style={tw`mr-2 ml-2`} />
                                <Text style={tw`text-lg text-white font-semibold`}>{data.estado == 0 ? 'Inactivo' : data.estado == 1 ? 'Activo' : data.estado == 2 ? 'Retirado' : 'En Mora'}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
