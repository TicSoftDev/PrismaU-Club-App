import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';

const DataEncuestas = ({ page, setPage, totalPages, pagedEncuestas, goDetalle }) => {
    return (
        <View style={tw`flex-1 bg-white`}>
            <ScrollView contentContainerStyle={tw`flex-1`}>
                {pagedEncuestas && pagedEncuestas.length === 0 ? (
                    <View style={tw`flex-1 justify-center items-center`}>
                        <Image source={imagenes.search} style={tw`w-60 h-60`} resizeMode='contain' />
                        <Text style={tw`text-lg text-gray-700 mt-4`}>No hay encuentas disponibles.</Text>
                    </View>
                ) : (
                    <View style={tw`flex-1 py-4`}>
                        <DataTable>
                            <ScrollView>
                                {pagedEncuestas.map((encuesta) => (
                                    <DataTable.Row key={encuesta.id}>
                                        <DataTable.Cell>
                                            <TouchableOpacity
                                                style={tw`flex-row items-center p-3 mb-2 rounded-lg bg-gray-100 shadow`}
                                                onPress={() => goDetalle(encuesta.id)}
                                            >
                                                <View style={tw`flex-1`}>
                                                    <Text style={tw`text-lg font-semibold`}>{encuesta.Titulo}</Text>
                                                    <Text style={tw`text-sm text-gray-600`}>
                                                        {encuesta.preguntas_count} Preguntas
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

export default DataEncuestas;
