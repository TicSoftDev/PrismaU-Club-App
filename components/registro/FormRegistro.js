import React from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';


export default function FormRegistro() {

    return (
        <ScrollView style={tw`flex-1`}>
            <View style={tw`absolute h-1/2 w-full bg-green-500`} />
            <View style={tw`h-20 w-full bg-green-500 pt-12 px-4`}>
                <Text style={tw`text-2xl font-bold text-white`}>Registrate</Text>
            </View>
            <View style={tw`px-4 pt-8 pb-20 w-full`}>
                <View style={tw`bg-white rounded-lg p-4 shadow-lg`}>
                    <Text style={tw`text-sm font-bold m-2`}>Nombres</Text>
                    <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100`}>
                        <FontAwesome5 name="keyboard" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                        <TextInput placeholder="Ingrese el nombre" style={tw`flex-1`}
                        />
                    </View>
                    <Text style={tw`text-sm font-bold m-2`}>Apellidos</Text>
                    <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100`}>
                        <FontAwesome5 name="keyboard" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                        <TextInput placeholder="Ingrese los apellidos" style={tw`flex-1`}
                        />
                    </View>
                    <Text style={tw`text-sm font-bold m-2`}>Identificación</Text>
                    <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100`}>
                        <FontAwesome5 name="id-card" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                        <TextInput placeholder="Numero de identificación" style={tw`flex-1`}
                        />
                    </View>
                    <Text style={tw`text-sm font-bold m-2`}>Correo</Text>
                    <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100`}>
                        <FontAwesome5 name="envelope" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                        <TextInput placeholder="Ingrese su correo" style={tw`flex-1`}
                        />
                    </View>
                    <Text style={tw`text-sm font-bold m-2`}>Teléfono</Text>
                    <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100`}>
                        <FontAwesome5 name="phone-alt" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                        <TextInput placeholder="Ingrese el número de teléfono" style={tw`flex-1`}
                        />
                    </View>
                    <TouchableOpacity style={tw`mt-4 bg-green-500 p-2 rounded shadow`} >
                        <Text style={tw`text-white text-center`}>
                            Registrarse
                            {/* {loading ? <ActivityIndicator color={'#fff'} size={'large'} /> : 'Registrarse'} */}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}