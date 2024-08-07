import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, Button, Image, SafeAreaView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import Buscador from '../../components/search/Buscador';
import DataResult from '../../components/search/DataResult';
import useBuscador from '../../hooks/useBuscador';

export default function SearchScreen() {
    const { user, busqueda, isLoading, searched, handleChange, handleBusqueda, newSearch,
        getUsers } = useBuscador();
    useFocusEffect(
        useCallback(() => {
            getUsers();
        }, [])
    );

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <Buscador busqueda={busqueda} handleBusqueda={handleBusqueda} handleChange={handleChange} />
            {isLoading ? (
                <View style={tw`flex-1 justify-center items-center`}>
                    <ActivityIndicator size="large" color="#098221" />
                    <Text style={tw`mt-2 text-lg text-gray-700`}>Cargando...</Text>
                </View>
            ) : searched && Object.keys(user).length > 0 ? (
                <>
                    <DataResult data={user} />
                    <Button title={'Toca para realizar otra busqueda'} onPress={newSearch} style={tw`mt-4`} />
                </>
            ) : (
                <View style={tw`flex-1 justify-center items-center`}>
                    <Image source={imagenes.search} style={tw`w-60 h-60`} resizeMode='contain' />
                    <Text style={tw`text-lg text-gray-700`}>Ingrese un documento para buscar.</Text>
                </View>
            )}
        </SafeAreaView>
    );
}
