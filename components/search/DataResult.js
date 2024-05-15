import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { servidorBack } from '../../routes/Routes';

export default function DataResult({ data }) {

    return (
        <View style={tw`flex-1 justify-center items-center my-5 mx-6`}>
            <ScrollView style={tw`w-full`}>
                <View style={tw`mb-10`}>
                    {data.imagen ?
                        <Image style={tw`h-28 w-28 rounded-full`} source={{ uri: servidorBack + data.imagen }} /> :
                        <Image style={tw`h-28 w-28 rounded-full`} source={imagenes.avatar} />
                    }
                </View>
                <View style={tw`flex flex-row items-center w-full`}>
                    <Text style={tw`text-2xl font-bold text-gray-700`}>
                        {data.Nombre + ' ' + data.Apellidos}
                    </Text>
                </View>
                <View style={tw`mb-5 flex flex-row items-center w-full h-10`}>
                    <FontAwesome6 name='id-card' style={tw`mr-1 px-4 text-lg text-gray-700`} />
                    <Text style={tw`text-lg text-gray-700 flex-1`}>
                        {data.TipoDocumento + ': ' + data.Documento}
                    </Text>
                </View>
                <View style={tw`bg-${data.Estado == 1 ? 'green' : 'red'}-500 w-full py-4 mt-6 items-center`}>
                    <Text style={tw`text-lg text-white font-bold`}>{data.Estado == 1 ? 'ACTIVO' : 'INACTIVO'}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
