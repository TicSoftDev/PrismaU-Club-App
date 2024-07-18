import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import tw from 'tailwind-react-native-classnames'

const DataSolicitudes = ({ page, setPage, totalPages, pagedSolicitudes }) => {
    return (
        <ScrollView style={tw``}>
            <View style={tw`flex-1 bg-white w-full py-4`}>
                <DataTable>
                    <ScrollView>
                        {pagedSolicitudes.map((solicitud) => (
                            <DataTable.Row key={solicitud.id}>
                                <DataTable.Cell>
                                    <View key={solicitud.id} style={tw`flex-row items-center p-3 mb-2 rounded-lg bg-gray-100 shadow`}>
                                        <FontAwesome5 name={solicitud.Estado ? 'clock' : 'check'} size={20} color={solicitud.Estado ? 'orange' : 'green'} style={tw`mr-6 ml-2`} />
                                        <View style={tw`flex-1`}>
                                            <Text style={tw`text-lg font-semibold`}>{solicitud.Tipo}</Text>
                                            <Text style={tw`text-sm text-gray-600`}>{solicitud.Estado ? 'Pendiente' : 'Aceptada'}</Text>
                                        </View>
                                    </View>
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
        </ScrollView>
    )
}

export default DataSolicitudes