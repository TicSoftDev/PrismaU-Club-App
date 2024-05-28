import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
export default function CardsContadores({ familiares, invitados }) {
    return (
        <View style={tw`px-2 pb-5 w-full`}>
            <View style={tw`bg-white rounded-lg p-4 shadow-lg`}>
                <View style={tw`flex-row justify-between`}>
                    <View style={tw`flex-row justify-around items-center w-1/2 border-2 border-purple-500 rounded-lg mr-2`}>
                        <View style={tw`justify-center items-center rounded-full`}>
                            <FontAwesome5 name="users" size={24} color="#9061f9" />
                        </View>
                        <View style={tw`flex justify-end items-center`}>
                            <Text style={tw`mt-1 text-sm text-purple-600`}>Familiares</Text>
                            <Text style={tw`text-lg font-bold text-purple-600`}>{familiares}</Text>
                        </View>
                    </View>
                    <View style={tw`flex-row justify-around items-center w-1/2 p-2 rounded-lg border-2 border-red-500`}>
                        <View style={tw`justify-center items-center rounded-full`}>
                            <FontAwesome5 name="user-clock" size={32} color="red" />
                        </View>
                        <View style={tw`flex justify-end items-center`}>
                            <Text style={tw`mt-1 text-sm text-red-500`}>Invitados</Text>
                            <Text style={tw`text-xl font-bold text-red-500`}>{invitados}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}