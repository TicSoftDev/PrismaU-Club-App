import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import { formatearFechaString } from '../../utilities/formater/FormateadorModel';

export default function Noticias({ noticias }) {

    const esProximaAVencer = (fecha) => {
        try {
            const fechaVencimiento = new Date(fecha);
            const hoy = new Date();
            const diasRestantes = Math.ceil((fechaVencimiento - hoy) / (1000 * 60 * 60 * 24));
            return diasRestantes <= 7 && diasRestantes >= 0;
        } catch (error) {
            return false;
        }
    };

    const obtenerColorPrioridad = (noticia) => {
        if (esProximaAVencer(noticia.Vencimiento)) return '#EF4444';
        return '#10B981';
    };

    if (!noticias || noticias.length === 0) {
        return (
            <View style={tw`flex-1 justify-center items-center py-12`}>
                <FontAwesome5 name="newspaper" size={48} color="#9CA3AF" />
                <Text style={tw`text-lg text-gray-500 mt-4 text-center`}>
                    No hay noticias disponibles
                </Text>
                <Text style={tw`text-sm text-gray-400 mt-2 text-center px-8`}>
                    Las notificaciones importantes aparecerán aquí
                </Text>
            </View>
        );
    }

    return (
        <View style={tw`px-3`}>
            {noticias.map((noticia) => {
                const colorPrioridad = obtenerColorPrioridad(noticia);
                const esUrgente = esProximaAVencer(noticia.Vencimiento);

                return (
                    <View key={noticia.id} style={[tw`bg-white rounded-2xl shadow-md mb-3 overflow-hidden`, { borderLeftWidth: 4, borderLeftColor: colorPrioridad }]}>
                        {esUrgente && (
                            <View style={tw`bg-red-500 px-3 py-1`}>
                                <Text style={tw`text-white text-xs font-bold text-center`}>
                                    Vence pronto
                                </Text>
                            </View>
                        )}
                        <View style={tw`p-4`}>
                            <View style={tw`flex-row items-start justify-between mb-3`}>
                                <View style={tw`flex-row items-center flex-1 mr-3`}>
                                    <View style={[tw`w-10 h-10 rounded-full justify-center items-center mr-3`, { backgroundColor: colorPrioridad + '20' }]}>
                                        <FontAwesome5 name="bullhorn" size={16} color={colorPrioridad} />
                                    </View>
                                    <View style={tw`flex-1`}>
                                        <Text style={tw`text-base font-bold text-gray-800 leading-5`}>
                                            {noticia.Titulo}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={tw`text-gray-700 text-sm leading-5 mb-3`}                            >
                                {noticia.Descripcion}
                            </Text>

                            <View style={tw`flex-row items-center justify-between`}>
                                <View style={tw`flex-row items-center`}>
                                    <FontAwesome5 name="clock" size={12} color="#9CA3AF" />
                                    <Text style={tw`text-xs text-gray-500 ml-2`}>
                                        Vence: {formatearFechaString(noticia.Vencimiento)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}