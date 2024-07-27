import { FontAwesome5 } from '@expo/vector-icons'
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import React from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import tw from 'tailwind-react-native-classnames'
import imagenes from '../../assets/img/imagenes'
import { servidorBack } from '../../routes/Routes'

const DataReservas = ({ page, setPage, totalPages, reservas, isLoading, cancelar }) => {

    const formatDate = (dateString) => {
        const date = parse(dateString, 'yyyy-MM-dd', new Date());
        return format(date, 'dd \'de\' MMMM \'de\' yyyy', { locale: es });
    };
    const formatTime = (timeString) => {
        const time = parse(timeString, 'HH:mm:ss', new Date());
        return format(time, 'hh:mm a', { locale: es });
    };

    if (isLoading) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#098221" />
                <Text style={tw`mt-2 text-lg text-gray-700`}>Cargando...</Text>
            </View>
        )
    }

    return (
        <View style={tw`flex-1`}>
            <ScrollView contentContainerStyle={tw`flex-1`}>
                {
                    !isLoading && reservas.length > 0 ? (
                        <View style={tw`p-4`}>
                            <DataTable>
                                <ScrollView>
                                    {reservas.map((reserva) => (
                                        <View style={tw`bg-white rounded-lg shadow-md p-4 mb-4`} key={reserva.id}>
                                            <Image source={reserva.espacio.imagen ? { uri: servidorBack + reserva.espacio.imagen } : imagenes.logoPrisma} style={tw`w-full h-40 rounded-lg`} />
                                            <Text style={tw`text-lg font-bold mt-3`}>{reserva.espacio.Descripcion}</Text>
                                            <View style={tw`flex-row items-center mt-3`}>
                                                <FontAwesome5 name="calendar-alt" size={15} style={tw`text-gray-700 mr-3`} />
                                                <Text style={tw`text-gray-700`}>{formatDate(reserva.Fecha)}</Text>
                                            </View>
                                            <View style={tw`flex-row items-center mt-2`}>
                                                <FontAwesome5 name="clock" size={15} style={tw`text-gray-700 mr-2`} />
                                                <Text style={tw`text-gray-700`}>{formatTime(reserva.Inicio)}</Text>
                                                <Text style={tw`text-gray-700 ml-4`}>{formatTime(reserva.Fin)}</Text>
                                            </View>
                                            <TouchableOpacity style={tw`bg-yellow-500 mt-4 rounded-full py-2`} onPress={() => cancelar(reserva.id)}>
                                                <Text style={tw`text-white text-center font-bold text-base uppercase`}>Cancelar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    <View style={tw`flex-row justify-between items-center p-2`}>
                                        <DataTable.Pagination
                                            page={page}
                                            numberOfPages={totalPages}
                                            onPageChange={(newPage) => setPage(newPage)}
                                            label={`Página ${page + 1} de ${totalPages}`}
                                        />
                                    </View>
                                </ScrollView>
                            </DataTable>
                        </View>
                    ) : (
                        <View style={tw`justify-center items-center flex-1 bg-white`}>
                            <Image source={imagenes.search} style={tw`w-60 h-60`} resizeMode='contain' />
                            <Text style={tw`text-lg text-gray-700`}>No hay reservas.</Text>
                        </View>
                    )
                }
            </ScrollView>
        </View>
    )
}

export default DataReservas