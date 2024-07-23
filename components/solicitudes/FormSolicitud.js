import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import tw from 'tailwind-react-native-classnames';

export default function FormSolicitud({ solicitud, handleChange, handleSubmit, loading }) {
    const [selectedTipo, setSelectedTipo] = useState(solicitud.Tipo || '');

    const data = [
        { key: 'Certificado laboral o de afiliación', label: 'Certificado laboral o de afiliación' },
        { key: 'Permiso laboral o Capacitación', label: 'Permiso laboral o Capacitación' },
        { key: 'Solicitud sesiones de teletrabajo', label: 'Solicitud sesiones de teletrabajo' },
        { key: 'Reporte de incapacidad', label: 'Reporte de incapacidad' },
        { key: 'Otra', label: 'Otra' },
    ];

    const handleTipoChange = (option) => {
        setSelectedTipo(option.label);
        handleChange(option.key, 'Tipo');
    };

    return (
        <View style={tw`flex-1 p-4 bg-gray-100`}>
            <Text style={tw`text-sm font-bold m-2`}>Tipo de solicitud</Text>
            <ModalSelector
                data={data}
                initValue="Escoja una opción"
                supportedOrientations={['landscape', 'portrait']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                cancelText='Cancelar'
                onChange={handleTipoChange}
            >
                <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
                    <TextInput
                        style={tw`border-0 ml-4 flex-1`}
                        editable={false}
                        placeholder="Escoja una opción"
                        value={selectedTipo}
                    />
                </View>
            </ModalSelector>
            <Text style={tw`text-sm font-bold m-2`}>Descripción de la solicitud:</Text>
            <TextInput
                multiline
                numberOfLines={10}
                placeholder="Ingrese el detalle de la solicitud"
                style={[tw`flex-1 rounded-lg border-2 border-gray-200 bg-gray-100 px-4 py-2 mb-4`, { height: 200, textAlignVertical: 'top' }]}
                onChangeText={(text) => handleChange(text, 'Descripcion')}
                value={solicitud.Descripcion}
            />
            <TouchableOpacity style={tw`bg-green-500 p-2 rounded shadow`} onPress={handleSubmit}>
                <Text style={tw`text-white text-center font-bold uppercase`}>
                    {loading ? <ActivityIndicator color={'#fff'} size={'large'} /> : 'Solicitar'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}