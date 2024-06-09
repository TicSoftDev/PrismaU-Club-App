import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { servidorBack } from '../../routes/Routes';

export default function DataResult({ data }) {
    return (
        <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
            <View style={tw`mx-auto max-w-lg w-full bg-white rounded-lg shadow-md overflow-hidden`}>
                <ScrollView contentContainerStyle={tw`flex-grow`}>
                    <View style={tw`pt-4`}>
                        <View style={tw`flex flex-row justify-center items-center mt-4`}>
                            <Image source={imagenes.logoClub} resizeMode='contain' style={tw`h-12 w-12`} />
                            <View>
                                <Text style={tw`text-lg text-green-800`}>CLUB</Text>
                                <Text style={tw`text-xl font-bold text-green-800 -mt-2`}>SINCELEJO</Text>
                            </View>
                        </View>
                        <View style={tw`items-center mt-10 mb-6`}>
                        <View style={[tw`rounded-full bg-green-500 items-center justify-center shadow-md`, { width: 155, height: 155 }]}>
                                {data.imagen ?
                                    <Image source={{ uri: servidorBack + data.imagen }} style={tw`h-36 w-36 rounded-full`} /> :
                                    <Image source={imagenes.avatar} style={tw`h-36 w-36 rounded-full`} resizeMode='contain' />
                                }
                            </View>
                        </View>
                        <View style={tw`flex flex-col justify-center items-center mb-6`}>
                            <Text style={tw`mt-4 text-3xl font-bold text-green-700`}>{data.nombre}</Text>
                            <Text style={tw`text-lg text-green-700`}>{data.apellidos}</Text>
                        </View>
                        <View style={tw`flex-row items-center p-5 rounded-b-lg bg-green-500 shadow`}>
                            <FontAwesome5 name="id-badge" size={24} color="white" style={tw`mr-6 ml-2`} />
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-lg text-white font-semibold`}>{data.tipoDocumento} {data.documento}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
