import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import { Routes } from '../../routes/Routes';

export default function MenuBienestar() {

    const navigation = useNavigation();

    return (
        <View style={tw`flex-row justify-start flex-wrap`}>
            <TouchableOpacity style={tw`items-center w-1/4`} onPress={() => navigation.navigate(Routes.FAMILIARES)}>
                <View style={tw`w-16 h-16 bg-pink-500 justify-center rounded-lg items-center`}>
                    <FontAwesome5 name="clipboard-list" size={30} color="#ffffff" />
                </View>
                <Text style={[tw`mt-1 font-bold`, { fontSize: Platform.OS === 'ios' ? 10 : 13 }]}>Encuestas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`items-center w-1/4`} onPress={() => navigation.navigate(Routes.INVITACION)}>
                <View style={tw`w-16 h-16 bg-blue-900 justify-center rounded-lg items-center`}>
                    <FontAwesome5 name="user-clock" size={25} color="#ffffff" />
                </View>
                <Text style={[tw`mt-1 font-bold`, { fontSize: Platform.OS === 'ios' ? 10 : 13 }]}>Eventos</Text>
            </TouchableOpacity>
        </View>
    )
}