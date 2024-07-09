import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/AntDesign';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../../hooks/useAuth';

export default function BotonLogout() {

    const { toggleModal, modal, cerrarSesion, loading } = useAuth();

    return (
        <>
            <TouchableOpacity style={tw`flex flex-row items-center justify-center mx-4  border-gray-400 rounded-lg p-1.5 px-2`} onPress={toggleModal}>
                <FontAwesome5 name="logout" size={16} style={tw`text-gray-400 mr-1`} />
                <Text style={tw`text-gray-400 text-sm font-bold`}>Salir</Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={modal} onRequestClose={toggleModal}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={tw`flex-1`}>
                    <View style={tw`flex-1 justify-center items-center bg-gray-900 bg-opacity-70`}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#ffffff" />
                        ) : (
                            <View style={tw`bg-white rounded-lg shadow-lg p-5 w-11/12`}>
                                <Text style={tw`text-xl font-bold mb-10`}>Salir</Text>
                                <Text style={tw`text-xl text-center`}>¿Quiere cerrar la sesión actual?</Text>
                                <View style={tw`flex flex-row justify-evenly mt-10`}>
                                    <TouchableOpacity style={tw`bg-red-500 rounded-lg py-2 px-8`} onPress={toggleModal}>
                                        <Text style={tw`text-white text-center text-lg font-semibold`}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={tw`bg-green-500 rounded-lg py-2 px-8`} onPress={cerrarSesion}>
                                        <Text style={tw`text-white text-center text-lg font-semibold`}>
                                            Sí, Salir
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    )
}
