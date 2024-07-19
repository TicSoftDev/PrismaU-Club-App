import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';

const DataSolicitudes = ({ page, setPage, totalPages, pagedSolicitudes, goDetalle }) => {
    return (
        <View style={tw`flex-1 bg-white`}>
            <ScrollView contentContainerStyle={tw`flex-1`}>
                {pagedSolicitudes && pagedSolicitudes.length === 0 ? (
                    <View style={tw`flex-1 justify-center items-center`}>
                        <Image source={imagenes.search} style={tw`w-60 h-60`} resizeMode='contain' />
                        <Text style={tw`text-lg text-gray-700 mt-4`}>No hay Solicitudes registradas.</Text>
                    </View>
                ) : (
                    <View style={tw`flex-1 py-4`}>
                        <DataTable>
                            <ScrollView>
                                {pagedSolicitudes.map((solicitud) => (
                                    <DataTable.Row key={solicitud.id}>
                                        <DataTable.Cell>
                                            <TouchableOpacity
                                                style={tw`flex-row items-center p-3 mb-2 rounded-lg bg-gray-100 shadow`}
                                                onPress={() => goDetalle(solicitud.id)}
                                            >
                                                <FontAwesome5
                                                    name={solicitud.Estado == 1 ? 'clock' : 'check'}
                                                    size={20}
                                                    color={solicitud.Estado == 1 ? 'orange' : 'green'}
                                                    style={tw`mr-6 ml-2`}
                                                />
                                                <View style={tw`flex-1`}>
                                                    <Text style={tw`text-lg font-semibold`}>{solicitud.Tipo}</Text>
                                                    <Text style={tw`text-sm text-gray-600`}>
                                                        {solicitud.Estado == 1 ? 'Pendiente' : 'Aceptada'}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </ScrollView>
                            <View style={tw`flex-row justify-between items-center p-2`}>
                                <DataTable.Pagination
                                    page={page}
                                    numberOfPages={totalPages}
                                    onPageChange={(newPage) => setPage(newPage)}
                                    label={`Página ${page + 1} de ${totalPages}`}
                                />
                            </View>
                        </DataTable>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default DataSolicitudes;
