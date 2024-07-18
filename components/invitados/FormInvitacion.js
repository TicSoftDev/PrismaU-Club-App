import React from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import { styles } from '../../assets/styles/Select';

export default function FormInvitacion({ invitado, handleChange, handleSubmit, loading }) {

    const data = [
        { key: 'CC', label: 'Cédula de Ciudadanía' },
        { key: 'CE', label: 'Cédula de Extranjería' },
        { key: 'TI', label: 'Tarjeta de Identidad' },
    ];

    return (
        <ScrollView style={tw`flex-1 bg-gray-100`}>
            <View style={tw`absolute h-1/2 w-full bg-green-500`} />
            <View style={tw`h-20 w-full bg-green-500 pt-12 px-4`}>
                <Text style={tw`text-2xl font-bold text-white`}>Formulario de invitación</Text>
            </View>
            <View style={tw`px-4 pt-8 pb-20 w-full`}>
                <View style={tw`bg-white rounded-lg p-4 shadow-lg`}>
                    <Text style={tw`text-sm font-bold m-2`}>Nombres</Text>
                    <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
                        <FontAwesome5 name="keyboard" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                        <TextInput
                            placeholder="Ingrese el nombre"
                            style={tw`flex-1 text-sm`}
                            onChangeText={(text) => handleChange(text, 'Nombre')}
                            value={invitado.Nombre}
                        />
                    </View>
                    <Text style={tw`text-sm font-bold m-2`}>Apellidos</Text>
                    <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
                        <FontAwesome5 name="keyboard" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                        <TextInput
                            placeholder="Ingrese los apellidos"
                            style={tw`flex-1 text-sm`}
                            onChangeText={(text) => handleChange(text, 'Apellidos')}
                            value={invitado.Apellidos}
                        />
                    </View>
                    <Text style={tw`text-sm font-bold m-2`}>Tipo Documento</Text>
                    <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
                        <FontAwesome5 name="id-card" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                        <ModalSelector data={data} initValue="Escoja una opción" supportedOrientations={['landscape']} accessible={true} scrollViewAccessibilityLabel={'Scrollable options'} cancelButtonAccessibilityLabel={'Cancel Button'} cancelText='Cancelar'
                            optionTextStyle={styles.optionTextStyle} optionContainerStyle={styles.optionContainerStyle} optionStyle={styles.optionStyle} cancelTextStyle={styles.cancelTextStyle} cancelStyle={styles.cancelStyle}
                            onChange={(option) => handleChange(option.key, 'TipoDocumento')}>
                            <TextInput style={{ borderWidth: 0 }} editable={false} placeholder="Escoja una opción"
                                value={invitado.TipoDocumento} />
                        </ModalSelector>
                    </View>
                    <Text style={tw`text-sm font-bold m-2`}>Documento</Text>
                    <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
                        <FontAwesome5 name="id-card" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                        <TextInput
                            placeholder="Ingrese el número de documento"
                            style={tw`flex-1 text-sm`}
                            onChangeText={(text) => handleChange(text, 'Documento')}
                            value={invitado.Documento}
                        />
                    </View>
                    <Text style={tw`text-sm font-bold m-2`}>Teléfono</Text>
                    <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
                        <FontAwesome5 name="phone-alt" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                        <TextInput
                            placeholder="Ingrese el número de teléfono"
                            style={tw`flex-1 text-sm`}
                            onChangeText={(text) => handleChange(text, 'Telefono')}
                            value={invitado.Telefono}
                        />
                    </View>
                    <TouchableOpacity style={tw`mt-4 bg-green-500 p-2 rounded shadow`} onPress={handleSubmit}>
                        <Text style={tw`text-white text-center`}>
                            {loading ? <ActivityIndicator color={'#fff'} size={'large'} /> : 'Generar QR'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}