import React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import tw from 'tailwind-react-native-classnames';
import { styles } from '../../assets/styles/Select';


export default function FormSolicitud({ solicitud, handleChange, handleSubmit, loading }) {

    const data = [
        { key: 'Certificado laboral o de afiliación', label: 'Certificado laboral o de afiliación' },
        { key: 'Permiso laboral o Capacitación', label: 'Permiso laboral o Capacitación' },
        { key: 'Solicitud sesiones de teletrabajo', label: 'Solicitud sesiones de teletrabajo' },
        { key: 'Reporte de incapacidad', label: 'Reporte de incapacidad' },
        { key: 'Otra', label: 'Otra' },
    ];

    return (
        <>
            <Text style={tw`text-sm font-bold m-2`}>Tipo de solicitud</Text>
            <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100`}>
                <ModalSelector data={data} initValue="Escoja una opción" supportedOrientations={['landscape']} accessible={true} scrollViewAccessibilityLabel={'Scrollable options'} cancelButtonAccessibilityLabel={'Cancel Button'} cancelText='Cancelar'
                    optionTextStyle={styles.optionTextStyle} optionContainerStyle={styles.optionContainerStyle} optionStyle={styles.optionStyle} cancelTextStyle={styles.cancelTextStyle} cancelStyle={styles.cancelStyle}
                    onChange={(option) => handleChange(option.key, 'Tipo')}>
                    <TextInput style={tw`border-0 ml-4`} editable={false} placeholder="Escoja una opción"
                        value={solicitud.Tipo} />
                </ModalSelector>
            </View>
            <Text style={tw`text-sm font-bold m-2`}>Especifique su solicitud:</Text>
            <TextInput multiline numberOfLines={20} placeholder="Ingrese el detalle de la solicitud"
                style={[tw`flex-1 rounded-lg border-2 border-gray-200 bg-gray-100 px-4 py-2`, { height: 200, textAlignVertical: 'top' }]}
                onChangeText={(text) => handleChange(text, 'Descripcion')} value={solicitud.Descripcion}
            />
            <TouchableOpacity style={tw`mt-4 bg-green-500 p-2 rounded shadow`} onPress={handleSubmit}>
                <Text style={tw`text-white text-center font-bold uppercase`}>
                    {loading ? <ActivityIndicator color={'#fff'} size={'large'} /> : 'Enviar'}
                </Text>
            </TouchableOpacity>
        </>
    );
}