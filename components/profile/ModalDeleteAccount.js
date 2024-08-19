import React from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const ModalDeleteAccount = ({ modal, toggleModal, res, eliminar, loading }) => {

    return (
        <Modal animationType="slide" transparent={true} visible={modal} onRequestClose={toggleModal}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={tw`flex-1`}>
                <View style={tw`flex-1 justify-center items-center bg-gray-900 bg-opacity-70`}>
                    <View style={tw`bg-white rounded-lg shadow-lg p-5 w-11/12`}>
                        <Text style={tw`text-xl font-bold mb-10`}>Eliminar cuenta</Text>
                        {
                            res ?
                                <>
                                    <Text style={tw`text-base`}>
                                        Hemos enviado comunicación a su empresa para iniciar proceso de eliminación de la cuenta. Le estaremos enviando confirmación una vez sea eliminada la cuenta. y que envie un mail a la cuenta que tiene registrada.
                                    </Text>
                                    <View style={tw`flex flex-row justify-evenly mt-10`}>
                                        <TouchableOpacity style={tw`bg-red-500 rounded-lg py-2 px-8`} onPress={toggleModal}>
                                            <Text style={tw`text-white text-center text-lg font-semibold`}>Cerrar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                                :
                                <>
                                    <Text style={tw`text-xl text-center`}>¿Seguro que quieres eliminar tu cuenta?</Text>
                                    <View style={tw`flex flex-row justify-evenly mt-10`}>
                                        <TouchableOpacity style={tw`bg-red-500 rounded-lg py-2 px-8`} onPress={toggleModal}>
                                            <Text style={tw`text-white text-center text-lg font-semibold`}>Cancelar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={tw`bg-green-500 rounded-lg py-2 px-8`} onPress={eliminar}>
                                            <Text style={tw`text-white text-center text-lg font-semibold`}>
                                                {loading ? <ActivityIndicator size="small" color="#ffffff" /> : 'Sí, eliminar'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                        }
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default ModalDeleteAccount