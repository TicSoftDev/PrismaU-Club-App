import React from 'react';
import { Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';


export default function DetalleSolicitud({ solicitud }) {

    return (
        <>
            <Text style={tw`text-base font-bold`}>Tipo de solicitud</Text>
            <Text style={tw`text-base mt-1`}>{solicitud.Tipo}</Text>
            <Text style={tw`text-base font-bold mt-5`}>Especifique su solicitud:</Text>
            <Text style={tw`text-base mt-1`}>{solicitud.Descripcion}</Text>
            <Text style={tw`text-base font-bold mt-5`}>Especifique su solicitud:</Text>
            <Text style={tw`text-base mt-1`}>{solicitud.Descripcion}</Text>
            <Text style={tw`text-base font-bold mt-5`}>Estado:</Text>
            <View style={tw`flex flex-row items-center mt-1`}>
                <View style={tw`w-3 h-3 rounded-full mr-2 ${solicitud.Estado == 1 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                <Text style={tw`text-base`}>{solicitud.Estado == 1 ? 'Pendiente' : 'Aceptada'}</Text>
            </View>
            <Text style={tw`text-base font-bold mt-5`}>Respuesta:</Text>
            <Text style={tw`text-base mt-1`}>{solicitud.Respuesta ? solicitud.Respuesta : 'No se ha dado respuesta a la solicitud'}</Text>
        </>
    );
}