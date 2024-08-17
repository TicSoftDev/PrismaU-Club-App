import React from 'react'
import { Image, Text, View } from 'react-native'
import imagenes from '../../assets/img/imagenes'
import tw from 'tailwind-react-native-classnames'

const Forbiden = ({ estado }) => {

    const estadoString = estado == 0 ? 'Inactivo' : estado == 1 ? 'Activo' : estado == 2 ? 'Retirado' : 'En Mora';

    return (
        <View style={tw`flex-1 justify-center items-center p-5`}>
            <Image source={imagenes.denied} style={tw`w-72 h-72`} resizeMode='contain' />
                <Text style={tw`text-xl font-bold mt-5 text-center`}>
                No tiene acceso a este recurso, actualmente estas {estadoString}
            </Text>
        </View>
    )
}

export default Forbiden