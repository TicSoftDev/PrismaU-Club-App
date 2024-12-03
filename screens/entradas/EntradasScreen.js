import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import BuscadorEntrada from '../../components/entradas/BuscadorEntrada';
import DataTableEntradas from '../../components/entradas/DataTableEntradas';
import useAccesos from '../../hooks/useAccesos';

const EntradasScreen = () => {
    const { loading, pagedEntradas, busqueda, page, totalPages, handleBusqueda, setPage } = useAccesos();

    return (
        <View style={tw`flex-1 p-5 bg-gray-50`}>
            <Text style={tw`font-bold text-lg`}>Control de entradas</Text>
            <BuscadorEntrada busqueda={busqueda} handleBusqueda={handleBusqueda} />
            {
                loading ? (
                    <View style={tw`flex-1 justify-center items-center`}>
                        <ActivityIndicator size="large" color="#098221" />
                    </View>
                ) : (
                    <ScrollView style={tw`flex-1`}>
                        <DataTableEntradas
                            page={page}
                            setPage={setPage}
                            pagedEntradas={pagedEntradas}
                            totalPages={totalPages}
                        />
                    </ScrollView>
                )
            }
        </View>
    );
};

export default EntradasScreen;
