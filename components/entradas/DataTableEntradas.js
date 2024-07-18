import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import React from 'react'
import { ScrollView, View } from 'react-native'
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

    return (
        <ScrollView horizontal>
            <View style={tw`flex-1 bg-white border-2 border-gray-200 rounded-lg`}>
                <DataTable>
                    <DataTable.Header style={tw`bg-green-400`}>
                        <DataTable.Title style={tw`w-64`}>Nombre Completo</DataTable.Title>
                        <DataTable.Title style={tw`w-48`}>Fecha</DataTable.Title>
                        <DataTable.Title style={tw`w-28`}>Rol</DataTable.Title>
                    </DataTable.Header>

                    <ScrollView>
                        {pagedEntradas.map((entrada) => (
                            <DataTable.Row key={entrada.id}>
                                <DataTable.Cell style={tw`w-64`}>{renderNombreCompleto(entrada.user)}</DataTable.Cell>
                                <DataTable.Cell style={tw`w-48`}>
                                    {format(new Date(entrada.created_at), "d 'de' MMMM 'de' yyyy, h:mm a", { locale: es })}
                                </DataTable.Cell>
                                <DataTable.Cell style={tw`w-28`}>{renderRol(entrada.user)}</DataTable.Cell>
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
