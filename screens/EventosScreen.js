import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Noticias from '../components/eventos/Noticias';
import useNoticias from '../hooks/useNoticias';

const EventosScreen = () => {

    const { noticias, loading } = useNoticias();

    return (
        <ScrollView style={tw`flex-1`}>
            <View style={tw`h-20 w-full bg-green-500 pt-8 px-4`}>
                <Text style={tw`text-xl font-bold text-white`}>Eventos</Text>
            </View>
            <View style={tw`p-2 mb-2`}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={tw`mt-5`} />
                ) : (
                    noticias.length > 0 && <Noticias noticias={noticias} />
                )}
            </View>
        </ScrollView>
    );
}

export default EventosScreen