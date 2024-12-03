import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import BuscadorEntrada from '../../components/entradas/BuscadorEntrada';
import DataTableEntradasInvitados from '../../components/entradas/DataTableEntradasInvitados';
import useInvitado from '../../hooks/useInvitado';

const EntradasInvitadosScreen = () => {
    const { loading, lista, busqueda, page, totalPages, handleBusqueda, setPage } = useInvitado();

    return (
        <View style={tw`flex-1 p-5 bg-gray-50`}>
            <Text style={tw`font-bold text-lg`}>Control de entradas invitados</Text>
            <BuscadorEntrada busqueda={busqueda} handleBusqueda={handleBusqueda} />
            {
                loading ? (
                    <View style={tw`flex-1 justify-center items-center`}>
                        <ActivityIndicator size="large" color="#098221" />
                    </View>
                ) : (
                    <ScrollView style={tw`flex-1`}>
                        <DataTableEntradasInvitados
                            page={page}
                            setPage={setPage}
                            pagedEntradas={lista}
                            totalPages={totalPages}
                        />
                    </ScrollView>
                )
            }
        </View>
    );
};

export default EntradasInvitadosScreen;
