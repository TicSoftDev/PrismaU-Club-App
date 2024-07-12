import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { servidorBack } from '../../routes/Routes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function DataScanner({ data, rol }) {

    return (
        <View style={tw`flex-1 justify-center items-center my-1 mx-1`}>
            <ScrollView style={tw`w-full rounded-lg shadow`}>
                <View style={tw`items-center p-6 bg-green-400 rounded-t-lg mx-1 shadow`}>
                    <View style={tw`w-32 h-32 rounded-full bg-gray-200 items-center justify-center shadow-md`}>
                        <Image
                            source={data.imagen ? { uri: servidorBack + data.imagen } : imagenes.avatar}
                            style={tw`w-28 h-28 rounded-full`}
                        />
                    </View>
                    <Text style={tw`mt-4 text-3xl font-bold text-white`}>{data.Nombre}</Text>
                    <Text style={tw`text-lg text-white`}>{data.Apellidos}</Text>
                    <Text style={tw`text-xl border border-gray-700 rounded-lg p-2 text-gray-700 mt-4`}>
                        {data.TipoDocumento + ' ' + data.Documento}
                    </Text>
                </View>

                {
                    (rol == 2 || rol == 3) && (
                        data.familiares && data.familiares.length > 0 ? (
                            <View style={tw`p-5`}>
                                <Text style={tw`text-2xl font-bold text-gray-700 mb-3`}>Familiares:</Text>
                                {
                                    data.familiares.map((familiar, index) => (
                                        <View key={index} style={tw`flex-row items-center p-3 mb-2 rounded-lg bg-gray-100 shadow`}>
                                            <FontAwesome5 name="user" size={24} color="green" style={tw`mr-6 ml-2`} />
                                            <View style={tw`flex-1`}>
                                                <Text style={tw`text-lg font-semibold`}>{familiar.Nombre} {familiar.Apellidos}</Text>
                                                <Text style={tw`text-sm text-gray-600`}>{familiar.Parentesco}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        ) : (
                            <View style={tw`my-16 flex items-center`}>
                                <Text style={tw`text-lg font-bold text-gray-700`}>No tiene familiares registrados</Text>
                            </View>
                        )
                    )
                }

                {rol != null ?
                    <View style={tw`${data.Estado == 0 ? "bg-red-500" : data.Estado == 1 ? "bg-green-500" : data.Estado == 2 ? "bg-yellow-500" : "bg-purple-500"} w-full py-4 mt-6 items-center rounded-b-lg`}>
                        <Text style={tw`text-lg text-white font-bold`}>{data.Estado == 0 ? "INACTIVO" : data.Estado == 1 ? "ACTIVO" : data.Estado == 2 ? "RETIRADO" : "EN MORA"}</Text>
                    </View> :
                    <View style={tw`bg-green-500 w-full py-4 mt-6 items-center`}>
                        <Text style={tw`text-lg text-white font-bold`}>INVITADO</Text>
                    </View>
                }
            </ScrollView>
        </View>
    );
}
