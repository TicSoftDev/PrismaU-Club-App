import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function Noticias({ noticias }) {
    return (
        <View style={tw`mt-5`}>
            <Text style={tw`text-lg font-bold mb-1`}>Noticias</Text>
            {noticias.map((noticia) => (
                <View style={[tw`bg-white p-4 rounded-3xl shadow-lg mt-2`]} key={noticia.id}>
                    <Text style={tw`text-base font-bold mb-4`}>{noticia.Titulo}</Text>
                    <View style={tw`flex flex-row items-center`}>
                        <Text style={tw`flex-1 text-justify`} numberOfLines={3}>{noticia.Descripcion}</Text>
                    </View>
                    <Text style={tw`text-right mt-3 mr-2 font-bold`}>{noticia.Vencimiento}</Text>
                </View>
            ))}
        </View>
    );
}
