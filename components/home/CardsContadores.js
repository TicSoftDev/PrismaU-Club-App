import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';

export default function CardsContadores({ familiares, invitados, reservas, solicitudes }) {
    return (
        <View style={tw`px-1 mt-5 w-full`}>
            <View style={tw`flex-row justify-between flex-wrap bg-white rounded-lg p-2 shadow-lg`}>
                <View style={[tw`flex-col border-2 border-red-500 rounded-lg p-2`, { width: 88 }]}>
                    <Text style={tw`text-xs text-center font-bold text-red-600 mb-0.5`}>Familiares</Text>
                    <View style={tw`flex flex-row justify-around items-center`}>
                        <FontAwesome5 name="users" size={18} style={tw`text-red-500`} />
                        <Text style={tw`text-sm font-bold text-red-600`}>{familiares}</Text>
                    </View>
                </View>
                <View style={[tw`flex-col border-2 border-purple-500 rounded-lg p-2`, { width: 88 }]}>
                    <Text style={tw`text-xs text-center font-bold text-purple-500 mb-0.5`}>Invitados</Text>
                    <View style={tw`flex flex-row justify-around items-center`}>
                        <FontAwesome5 name="user-clock" size={18} style={tw`text-purple-500`} />
                        <Text style={tw`text-sm font-bold text-purple-500`}>{invitados}</Text>
                    </View>
                </View>
                <View style={[tw`flex-col border-2 border-yellow-500 rounded-lg p-2`, { width: 88 }]}>
                    <Text style={tw`text-xs text-center font-bold text-yellow-500 mb-0.5`}>Reservas</Text>
                    <View style={tw`flex flex-row justify-around items-center`}>
                        <FontAwesome5 name="map-marked-alt" size={18} style={tw`text-yellow-500`} />
                        <Text style={tw`text-sm font-bold text-yellow-500`}>{reservas}</Text>
                    </View>
                </View>
                <View style={[tw`flex-col border-2 border-green-500 rounded-lg p-2`, { width: 88 }]}>
                    <Text style={tw`text-xs text-center font-bold text-green-600 mb-0.5`}>Solicitudes</Text>
                    <View style={tw`flex flex-row justify-around items-center`}>
                        <FontAwesome5 name="envelope-open-text" size={18} style={tw`text-green-500`} />
                        <Text style={tw`text-sm font-bold text-green-600`}>{solicitudes}</Text>
                    </View>
                </View>
            </View>
        </View >
    );
}
