import React from 'react'
import { Image, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import imagenes from '../../assets/img/imagenes'

export default function Logo() {
    return (
        <View style={tw`flex-1 items-center justify-center mt-12 mb-10`}>
            <Image source={imagenes.logoClub} style={tw`w-32 h-32`} resizeMode='contain' />
        </View>
    )
}