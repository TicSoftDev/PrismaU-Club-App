import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';

export default function Buscador({ busqueda, handleChange, handleBusqueda }) {
    return (
        <View style={tw`flex flex-row items-center justify-center p-5 m-5`}>
            <View style={tw`flex flex-row items-center border rounded-xl p-2 border-gray-300`}>
                <Icon name="id-card" size={20} color="#000" style={tw`ml-2 mr-4 text-gray-500`} />
                <TextInput style={tw`text-lg flex-1`} placeholder="Busque por identificación."
                    value={busqueda} onChangeText={(text) => handleChange(text)} />
            </View>
            <TouchableOpacity onPress={() => handleBusqueda()} style={tw`ml-2 bg-green-500 p-3 rounded-xl justify-center items-center`}>
                <Icon name="search" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}