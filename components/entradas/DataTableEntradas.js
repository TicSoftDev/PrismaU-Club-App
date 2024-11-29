import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { es } from 'date-fns/locale'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import tw from 'tailwind-react-native-classnames'

export default function DataTableEntradas({ pagedEntradas, page, setPage, totalPages }) {

    const renderNombreCompleto = (user) => {
        if (user.asociado) {
            return user.asociado.Nombre + " " + user.asociado.Apellidos;
        } else if (user.adherente) {
            return user.adherente.Nombre + " " + user.adherente.Apellidos;
        } else if (user.familiar) {
            return user.familiar.Nombre + " " + user.familiar.Apellidos;
        } else if (user.empleado) {
            return user.empleado.Nombre + " " + user.empleado.Apellidos;
        } else {
            return "No disponible";
        }
    };

    const renderRol = (user) => {
        if (user.asociado) {
            return "Asociado";
        } else if (user.adherente) {
            return "Adherente";
        } else if (user.familiar) {
            return "Familiar";
        } else if (user.empleado) {
            return "Empleado";
        } else {
            return "No disponible";
        }
    };

    const formatFecha = (fecha) => {
        const fechaBogota = toZonedTime(fecha, 'America/Bogota');
        return format(fechaBogota, "dd/MM/yyyy, h:mm a", { locale: es });
    }

    return (
        <ScrollView horizontal>
            <View style={tw`flex-1 bg-white border-2 border-gray-200 rounded-lg`}>
                <DataTable>
                    <DataTable.Header style={tw`bg-green-400 rounded-t-lg`}>
                        <DataTable.Title style={tw`w-64`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}> Nombre Completo</Text>
                        </DataTable.Title>
                        <DataTable.Title style={tw`w-44`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}> Fecha</Text>
                        </DataTable.Title>
                        <DataTable.Title style={tw`w-20`}>
                            <Text style={tw`text-white uppercase font-bold text-sm`}> Rol</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    <ScrollView>
                        {pagedEntradas.map((entrada) => (
                            <DataTable.Row key={entrada.id}>
                                <DataTable.Cell style={tw`w-64`}>{renderNombreCompleto(entrada.user)}</DataTable.Cell>
                                <DataTable.Cell style={tw`w-44`}>
                                    {formatFecha(entrada.created_at)}
                                </DataTable.Cell>
                                <DataTable.Cell style={tw`w-20`}>{renderRol(entrada.user)}</DataTable.Cell>
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
