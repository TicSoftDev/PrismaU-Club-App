import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function Noticias() {
    return (
        <View style={tw`mt-5`}>
            <Text style={tw`text-lg font-bold mb-4`}>Noticias</Text>

            <View style={[tw`bg-white p-4 rounded-3xl shadow-lg`]}>
                <Text style={tw`text-base font-bold mb-4`}>Santa misa en acción de gracias</Text>
                <View style={tw`flex flex-row items-center`}>
                    <Text style={tw`flex-1 text-justify`} numberOfLines={3}>Se invita a todos los miembos del club a la santa misa de accion de gracias.</Text>
                </View>
                <Text style={tw`text-right mt-3 mr-2 font-bold`}>2020-01-01</Text>
            </View>
        </View>
    );
}


