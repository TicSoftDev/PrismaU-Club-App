import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import BuscadorEntrada from '../../components/entradas/BuscadorEntrada';
import DataTableEntradasInvitados from '../../components/entradas/DataTableEntradasInvitados';
import useInvitado from '../../hooks/useInvitado';

const itemsPerPage = 8;

const EntradasInvitadosScreen = () => {
    const { loading, pagedEntradas, busqueda, page, totalPages, handleBusqueda, handleSearch, setPage } = useInvitado(itemsPerPage);

    return (
        <View style={tw`flex-1 p-5 bg-gray-50`}>
            <Text style={tw`font-bold text-lg`}>Control de entradas invitados</Text>
            <BuscadorEntrada busqueda={busqueda} handleBusqueda={handleBusqueda} handleSearch={handleSearch} />
            {
                loading ? (
                    <View style={tw`flex-1 justify-center items-center`}>
                        <ActivityIndicator size="large" color="#098221" />
                    </View>
                ) : (
                    <DataTableEntradasInvitados
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

export default EntradasInvitadosScreen;
