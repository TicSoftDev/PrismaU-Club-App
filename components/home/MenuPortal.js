import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import { Routes } from '../../routes/Routes';

export default function MenuPortal() {

    const navigation = useNavigation();

    return (
        <View style={tw`flex-row justify-between flex-wrap`}>
            <TouchableOpacity style={tw`items-center w-1/4`} onPress={() => navigation.navigate(Routes.FAMILIARES)}>
                <View style={tw`w-16 h-16 bg-red-500 justify-center rounded-lg items-center`}>
                    <FontAwesome5 name="users" size={25} color="#ffffff" />
                </View>
                <Text style={[tw`mt-1 font-bold`, { fontSize: Platform.OS === 'ios' ? 10 : 13 }]}>Familiares</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`items-center w-1/4`} onPress={() => navigation.navigate(Routes.INVITACION)}>
                <View style={tw`w-16 h-16 bg-purple-500 justify-center rounded-lg items-center`}>
                    <FontAwesome5 name="user-clock" size={25} color="#ffffff" />
                </View>
                <Text style={[tw`mt-1 font-bold`, { fontSize: Platform.OS === 'ios' ? 10 : 13 }]}>Invitación</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`items-center w-1/4`} onPress={() => navigation.navigate(Routes.RESERVAS)}>
                <View style={tw`w-16 h-16 bg-yellow-500 justify-center rounded-lg items-center`}>
                    <FontAwesome5 name="map-marked-alt" size={25} color="#ffffff" />
                </View>
                <Text style={[tw`mt-1 font-bold`, { fontSize: Platform.OS === 'ios' ? 10 : 13 }]}>Reservas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`items-center w-1/4`} onPress={() => navigation.navigate(Routes.SOLICITUDES)}>
                <View style={tw`w-16 h-16 bg-green-600 justify-center rounded-lg items-center`}>
                    <FontAwesome5 name="envelope-open-text" size={25} color="#ffffff" />
                </View>
                <Text style={[tw`mt-1 font-bold`, { fontSize: Platform.OS === 'ios' ? 10 : 13 }]}>Solicitudes</Text>
            </TouchableOpacity>
        </View>
    )
}