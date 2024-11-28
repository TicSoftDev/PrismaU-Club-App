import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import BuscadorEntrada from '../../components/entradas/BuscadorEntrada';
import DataTableEntradas from '../../components/entradas/DataTableEntradas';
import useAccesos from '../../hooks/useAccesos';

const itemsPerPage = 8;

const EntradasScreen = () => {
    const { loading, pagedEntradas, busqueda, page, totalPages, handleBusqueda, handleSearch, setPage } = useAccesos(itemsPerPage);

    return (
        <View style={tw`flex-1 p-5 bg-gray-50`}>
            <Text style={tw`font-bold text-lg`}>Control de entradas</Text>
            <BuscadorEntrada busqueda={busqueda} handleBusqueda={handleBusqueda} handleSearch={handleSearch} />
            {
                loading ? (
                    <View style={tw`flex-1 justify-center items-center`}>
                        <ActivityIndicator size="large" color="#098221" />
                    </View>
                ) : (
                    <DataTableEntradas
                        page={page}
                        setPage={setPage}
                        pagedEntradas={pagedEntradas}
                        totalPages={totalPages}
                    />
                )
            }
        </View>
    );
};

export default EntradasScreen;
