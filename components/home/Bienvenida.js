import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

export default function Bienvenida({ user }) {
    return (
        <>
            <View style={tw`absolute h-1/3 w-full bg-green-500`} />
            <View style={tw`h-20 w-full bg-green-500 pt-4 px-4`}>
                <Text style={tw`text-xl text-white`}>Hola, {user.Nombre}</Text>
            </View>
        </>
    )
}