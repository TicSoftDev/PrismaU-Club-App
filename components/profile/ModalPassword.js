import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';

export default function ModalPassword({ loading, modalVisible, toggleModal, password, handleChange, handleSubmit }) {
    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={toggleModal}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={tw`flex-1`}>
                <View style={tw`flex-1 justify-center items-center bg-gray-900 bg-opacity-70`}>
                    <View style={tw`bg-white rounded-lg shadow-lg p-5 w-11/12`}>
                        <Text style={tw`text-xl font-bold mb-10`}>Cambiar contraseña</Text>
                        <View style={tw`flex flex-row items-center w-full h-12 rounded-lg border-2 border-gray-300 bg-gray-100`}>
                            <FontAwesome5 name="lock" size={20} style={tw`ml-4 text-gray-400`} />
                            <TextInput
                                placeholder="Ingrese la nueva contraseña"
                                style={tw`flex-1 px-4 py-2 text-lg`}
                                secureTextEntry
                                value={password}
                                onChangeText={(text) => handleChange(text)}
                                autoFocus
                            />
                        </View>
                        <View style={tw`flex flex-row justify-evenly mt-10`}>
                            <TouchableOpacity style={tw`bg-red-500 rounded-lg py-2 px-8`} onPress={toggleModal}>
                                <Text style={tw`text-white text-center text-lg font-semibold`}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`bg-green-500 rounded-lg py-2 px-8`} onPress={handleSubmit}>
                                <Text style={tw`text-white text-center text-lg font-semibold`}>
                                    {loading ? <ActivityIndicator color={'#fff'} size={'large'} /> : 'Confirmar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}
