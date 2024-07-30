import React from 'react'
import { Image, Text } from 'react-native'
import imagenes from '../../assets/img/imagenes'
import { stylesLogin } from '../../assets/styles/Login'

const EncabezadoLogin = () => {
    return (
        <>
            <Image style={stylesLogin.logo} source={imagenes.logoPrisma} />
            <Text style={stylesLogin.titulo}>Bienvenido </Text>
            <Text style={stylesLogin.subtitulo}>Inicia sesión en tu cuenta</Text>
        </>
    )
}

export default EncabezadoLogin