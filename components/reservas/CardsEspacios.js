import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { servidorBack } from '../../routes/Routes';

export default function CardsEspacios({ page, setPage, totalPages, espacios, isLoading, onSelect }) {

    

    return (
        <>
            <View style={tw`p-4`}>
                <DataTable>
                    <View style={tw`flex justify-end items-end`}>
                        <DataTable.Pagination
                            page={page}
                            numberOfPages={totalPages}
                            onPageChange={(newPage) => setPage(newPage)}
                            label="Escoja un espacio"
                            style={tw`text-black text-lg`}
                        />
                    </View>
                    <ScrollView>
                        {espacios.map((espacio, index) => (
                            <TouchableOpacity key={index} onPress={() => onSelect(espacio)}>
                                <View style={tw`bg-white rounded-lg overflow-hidden shadow-md mb-1`}>
                                    <Image source={espacio.imagen ? { uri: servidorBack + espacio.imagen } : imagenes.logoPrisma} style={tw`${espacio.imagen ? "w-full" : "w-40"} h-40`} />
                                    <View style={tw`p-4`}>
                                        <Text style={tw`text-lg font-semibold mb-2`}>{espacio.Descripcion}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </DataTable>
            </View>
        </>
    );
}
