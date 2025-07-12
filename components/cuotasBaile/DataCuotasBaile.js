import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { formatearMoneda } from '../../utilities/formater/FormateadorModel';

export default function DataCuotasBaile({ cuotas, loading, refreshing, refresh, handlePago }) {

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 1:
                return {
                    text: 'Pagada',
                    bg: 'bg-green-100 text-green-800',
                    icon: 'check'
                };
            default:
                return {
                    text: 'Pendiente',
                    bg: 'bg-red-100 text-red-800',
                    icon: 'clock'
                };
        }
    };

    const calcularPorcentajePago = (totalPagos, valor) => {
        if (valor === 0) return 0;
        return Math.round((totalPagos / valor) * 100);
    };

    if (loading) {
        return (
            <View style={tw`flex-1 bg-gray-50`}>
                <View style={tw`flex-1 justify-center items-center`}>
                    <ActivityIndicator size="large" color="#10b981" />
                    <Text style={tw`mt-4 text-gray-600`}>Cargando cuotas...</Text>
                </View>
            </View>
        );
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
            style={tw`flex-1 px-4 my-3`}
            showsVerticalScrollIndicator={false}
        >
            {cuotas.length === 0 ? (
                <View style={tw`bg-white rounded-lg shadow-sm p-8 items-center`}>
                    <Text style={tw`text-3xl mb-4`}>📋</Text>
                    <Text style={tw`text-gray-500 text-center text-lg font-medium`}>
                        No se encontraron cuotas
                    </Text>
                    <Text style={tw`text-gray-400 text-center text-sm mt-2`}>
                        Intenta ajustar los filtros de búsqueda
                    </Text>
                </View>
            ) : (
                cuotas.map((mensualidad) => {
                    const estadoInfo = getEstadoColor(mensualidad.estado);
                    const porcentajePago = calcularPorcentajePago(mensualidad.total_pagos, mensualidad.valor);

                    return (
                        <View key={mensualidad.id} style={tw`bg-white rounded-xl shadow-sm mb-4 border border-gray-100`}>
                            <View style={tw`p-4 border-b border-gray-100`}>
                                <View style={tw`flex-row justify-between items-center`}>
                                    <View style={tw`flex-row items-center`}>
                                        <View style={tw`w-10 h-10 rounded-full ${estadoInfo.bg} items-center justify-center mr-3`}>
                                            <Text style={tw`font-bold text-lg`}>
                                                <FontAwesome5 name={estadoInfo.icon} size={20} color="#020202" />
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={tw`text-lg font-semibold text-gray-800`}>
                                                {mensualidad.descripcion}
                                            </Text>
                                            <Text style={tw`text-sm text-gray-500`}>
                                                Cuota de baile
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={tw`flex-row items-center`}>
                                        <View style={tw`px-3 py-1 rounded-full ${estadoInfo.bg}`}>
                                            <Text style={tw`text-xs font-medium`}>
                                                {estadoInfo.text}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`p-4`}>
                                <View style={tw`flex-row justify-between items-center mb-4`}>
                                    <Text style={tw`text-sm text-gray-500 mb-1`}>Valor cuota de baile</Text>
                                    <Text style={tw`text-2xl font-bold text-gray-800`}>
                                        {formatearMoneda(mensualidad.valor)}
                                    </Text>
                                </View>

                                <View style={tw`bg-gray-50 rounded-lg p-3 mb-4`}>
                                    <View style={tw`flex-row justify-between mb-2`}>
                                        <View style={tw`flex-1 mr-2`}>
                                            <Text style={tw`text-xs text-gray-500 mb-1`}>Abonado</Text>
                                            <Text style={tw`text-sm font-semibold text-green-600`}>
                                                {formatearMoneda(mensualidad.total_pagos)}
                                            </Text>
                                        </View>
                                        <View style={tw`flex-1 ml-2`}>
                                            <Text style={tw`text-xs text-gray-500 mb-1`}>Restante</Text>
                                            <Text style={tw`text-sm font-semibold text-red-600`}>
                                                {formatearMoneda(mensualidad.restante)}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Barra de progreso */}
                                    <View style={tw`mb-2`}>
                                        <View style={tw`flex-row justify-between items-center mb-1`}>
                                            <Text style={tw`text-xs text-gray-500`}>Progreso de pago</Text>
                                            <Text style={tw`text-xs font-medium text-gray-700`}>
                                                {porcentajePago}%
                                            </Text>
                                        </View>
                                        <View style={tw`w-full bg-gray-200 rounded-full h-2`}>
                                            <View
                                                style={[
                                                    tw`h-2 rounded-full`,
                                                    {
                                                        width: `${porcentajePago}%`,
                                                        backgroundColor: porcentajePago === 100 ? '#10b981' : '#3b82f6'
                                                    }
                                                ]}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={tw`flex-row justify-between items-center`}>
                                    <View>
                                        {mensualidad.estado === 1 ? (
                                            <View style={tw`flex-row items-center`}>
                                                <Text style={tw`text-green-600 text-sm font-medium`}>✓ Pagada completamente</Text>
                                            </View>
                                        ) : (
                                            <View>
                                                <Text style={tw`text-gray-500 text-xs`}>
                                                    Faltan {formatearMoneda(mensualidad.restante)}
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    {mensualidad.estado !== 1 && (
                                        <TouchableOpacity
                                            style={tw`bg-green-500 px-6 py-3 rounded-lg flex-row items-center shadow-sm`}
                                            onPress={() => handlePago(mensualidad)}
                                        >
                                            <Text style={tw`text-white font-medium mr-2`}>Pagar</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    );
                })
            )}
        </ScrollView>
    );
}