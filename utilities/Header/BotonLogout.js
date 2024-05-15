import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/AntDesign';
import tw from 'tailwind-react-native-classnames';
import { useAuthContext } from '../../context/AuthContext';
import { Routes } from '../../routes/Routes';

export default function BotonLogout() {

    const { logout } = useAuthContext();
    const navigation = useNavigation();

    const cerrarSesion = async () => {
        await logout();
        navigation.navigate(Routes.LOGIN);
    };

    return (
        <TouchableOpacity style={tw`flex flex-row items-center justify-center mx-4 border-2 border-red-500 rounded-lg p-1.5 px-2`} onPress={cerrarSesion}>
            <FontAwesome5 name="logout" size={20} style={tw`text-red-500 mr-1`} />
            <Text style={tw`text-red-500 text-sm font-bold`}>Salir</Text>
        </TouchableOpacity>
    )
}