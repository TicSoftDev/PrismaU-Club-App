import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { es } from 'date-fns/locale'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import tw from 'tailwind-react-native-classnames'

export default function DataTableEntradasInvitados({ pagedEntradas, page, setPage, totalPages }) {

    const formatFecha = (fecha) => {
        const fechaBogota = toZonedTime(fecha, 'America/Bogota');
        return format(fechaBogota, "dd/MM/yyyy, h:mm a", { locale: es });
    }

    return (
        <ScrollView horizontal>
            <View style={tw`flex-1 bg-white border-2 border-gray-200 rounded-lg`}>
                <DataTable>
                    <DataTable.Header style={tw`bg-green-400 rounded-t-lg`}>
                        <DataTable.Title style={tw`w-56`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}> Nombre Completo</Text>
                        </DataTable.Title>
                        <DataTable.Title style={tw`w-44`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}> Identificación</Text>
                        </DataTable.Title>
                        <DataTable.Title style={tw`w-44`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}> Fecha</Text>
                        </DataTable.Title>
                        <DataTable.Title style={tw`w-52`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}> Invitado por</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    <ScrollView>
                        {
                            pagedEntradas.map((entrada) => (
                                <DataTable.Row key={entrada.id}>
                                    <DataTable.Cell style={tw`w-56`}>{entrada.Nombre + " " + entrada.Apellidos}</DataTable.Cell>
                                    <DataTable.Cell style={tw`w-44`}>{entrada.TipoDocumento + " " + entrada.Documento}</DataTable.Cell>
                                    <DataTable.Cell style={tw`w-44`}>{formatFecha(entrada.fecha)}</DataTable.Cell>
                                    <DataTable.Cell style={tw`w-52`}>{entrada.NombreSocio + " " + entrada.ApellidosSocio}</DataTable.Cell>
                                </DataTable.Row>
                            ))
                        }
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
