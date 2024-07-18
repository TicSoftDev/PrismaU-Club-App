import React from 'react'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

export default function Bienvenida({ user, rol }) {
    return (
        <>
            <View style={tw`absolute ${(rol == 2 || rol == 3) ? 'h-32' : 'h-20'} w-full bg-green-500`} />
            <View style={tw`h-16 w-full bg-green-500 pt-6 px-4`}>
                <Text style={tw`text-xl text-white`}>Hola, <Text style={tw`text-2xl text-white font-bold`}>{user.Nombre}</Text></Text>
            </View>
        </>
    )
}