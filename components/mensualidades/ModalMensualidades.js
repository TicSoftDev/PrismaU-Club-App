import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { formatearFechaMes, formatearMoneda } from '../../utilities/formater/FormateadorModel';
import CheckBox from 'react-native-check-box';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function ModalMensualidades({ showPaymentModal, cerrarModal, mensualidad, loading, crearPreferencia,
    touched, handleChange, pago, handleChangeCheck
}) {

    return (
        <Modal visible={showPaymentModal} transparent={true} onRequestClose={cerrarModal} animationType="slide">
            <View style={tw`flex-1 justify-end`} backgroundColor="rgba(0,0,0,0.5)">
                <View style={tw`bg-white rounded-t-3xl p-6`}>
                    <View style={tw`flex-row items-center justify-between mb-6`}>
                        <Text style={tw`text-2xl font-bold text-gray-900`}>
                            Pagar Mensualidad
                        </Text>
                        <TouchableOpacity onPress={cerrarModal} style={tw`p-2`}>
                            <Text style={tw`text-gray-500 text-lg`}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    {mensualidad && (
                        <View style={tw`mb-4`}>
                            <View style={tw`bg-green-50 rounded-2xl p-5 mb-4 border border-green-200`}>
                                <View style={tw`flex-row items-center mb-3`}>
                                    <View style={tw`w-3 h-3 bg-green-500 rounded-full mr-3`}></View>
                                    <Text style={tw`text-sm font-medium text-green-700 uppercase`}>
                                        ID: {mensualidad.id}
                                    </Text>
                                </View>

                                <Text style={tw`text-gray-700 text-base mb-2`}>
                                    Período de pago
                                </Text>
                                <Text style={tw`text-xl font-bold text-gray-900 mb-4`}>
                                    {formatearFechaMes(mensualidad.fecha)}
                                </Text>

                                <View style={tw`border-t border-green-200 pt-4`}>
                                    <View style={tw`flex-row justify-between items-center mb-3`}>
                                        <Text style={tw`text-gray-700 font-medium`}>Valor total:</Text>
                                        <Text style={tw`text-2xl font-bold text-gray-900`}>
                                            {formatearMoneda(mensualidad.valor)}
                                        </Text>
                                    </View>

                                    <View style={tw`flex-row justify-between items-center`}>
                                        <Text style={tw`text-gray-700 font-medium`}>Pendiente:</Text>
                                        <Text style={[
                                            tw`text-lg font-semibold`,
                                            { color: mensualidad.restante > 0 ? '#dc2626' : '#16a34a' }
                                        ]}>
                                            {formatearMoneda(mensualidad.restante)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    <TouchableOpacity style={tw`flex flex-row items-center mb-4`} onPress={handleChangeCheck} activeOpacity={0.7}>
                        <CheckBox style={tw`mr-2`} isChecked={touched} onClick={() => { }} />
                        <Text style={tw`text-sm text-gray-700`}>Pagar otro valor</Text>
                    </TouchableOpacity>

                    {(touched || mensualidad?.total_pagos != 0) && (
                        <View style={tw`mb-4`}>
                            <Text style={tw`text-sm font-bold m-2`}>Ingrese el valor</Text>
                            <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
                                <FontAwesome5 name="dollar-sign" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                                <TextInput style={tw`flex-1 text-sm`} placeholder="Valor" keyboardType="phone-pad"
                                    onChangeText={(e) => handleChange(e, 'valor')} value={pago.valor} />
                            </View>
                        </View>
                    )}
                    <View style={tw`flex-row my-4`}>
                        <TouchableOpacity style={tw`flex-1 bg-gray-100 p-4 rounded-xl border border-gray-200 mr-2`}
                            onPress={cerrarModal}
                        >
                            <Text style={tw`text-gray-700 font-semibold text-center text-base`}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>

                        {mensualidad?.restante > 0 && (
                            <TouchableOpacity style={tw`flex-1 bg-green-600 p-4 rounded-xl ml-2`} onPress={crearPreferencia}>
                                <Text style={tw`text-white font-semibold text-center text-base`}>
                                    {loading ? 'Cargando...' : 'Pagar Ahora'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    )
}