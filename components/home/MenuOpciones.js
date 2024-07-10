import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import { Routes } from '../../routes/Routes';

export default function MenuOpciones() {

    const navigation = useNavigation();

    return (
        <View style={tw`px-4 flex-row justify-between flex-wrap`}>
            <TouchableOpacity style={tw`items-center w-1/4`} onPress={() => navigation.navigate(Routes.FAMILIARES)}>
                <View style={tw`w-16 h-16 bg-red-500 justify-center rounded-lg items-center`}>
                    <FontAwesome5 name="users" size={20} color="#ffffff" />
                </View>
                <Text style={[tw`mt-1 font-bold`, { fontSize: 10 }]}>Familiares</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`items-center w-1/4`} onPress={() => navigation.navigate(Routes.INVITACION)}>
                <View style={tw`w-16 h-16 bg-purple-500 justify-center rounded-lg items-center`}>
                    <FontAwesome5 name="user-clock" size={20} color="#ffffff" />
                </View>
                <Text style={[tw`mt-1 font-bold`, { fontSize: 10 }]}>Invitación</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`items-center w-1/4`} onPress={() => navigation.navigate(Routes.ESPACIO)}>
                <View style={tw`w-16 h-16 bg-yellow-500 justify-center rounded-lg items-center`}>
                    <FontAwesome5 name="map-marked-alt" size={20} color="#ffffff" />
                </View>
                <Text style={[tw`mt-1 font-bold`, { fontSize: 10 }]}>Espacios</Text>
            </TouchableOpacity>
        </View>
    )
}