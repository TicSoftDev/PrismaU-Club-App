import React from 'react';
import { ActivityIndicator, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { stylesLogin } from '../../assets/styles/Login';

export default function FormLogin({ loading, documento, password, setDocumento, setPassword, handleLogin }) {

    return (
        <SafeAreaView style={tw`flex-1 bg-white items-center justify-center`}>
            <Image style={stylesLogin.logo} source={imagenes.logoPrisma} />
            <Text style={stylesLogin.titulo}>Bienvenido </Text>
            <Text style={stylesLogin.subtitulo}>Inicia sesion en tu cuenta</Text>
            <View style={stylesLogin.inputContainer}>
                <Icon name="id-card" size={20} color="#000" style={stylesLogin.inputIcon} />
                <TextInput style={stylesLogin.textInput} placeholder="Número de documento."
                    value={documento} onChangeText={setDocumento} />
            </View>
            <View style={stylesLogin.inputContainer}>
                <MaterialIcons name="lock" size={20} color="#000" style={stylesLogin.inputIcon} />
                <TextInput style={stylesLogin.textInput} placeholder="Contraseña"
                    value={password} onChangeText={setPassword} secureTextEntry={true} />
            </View>
            <TouchableOpacity style={stylesLogin.boton} onPress={handleLogin} >
                <Text style={stylesLogin.text}>
                    {loading ? <ActivityIndicator color={'#fff'} size={'large'} /> : 'Ingresar'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesLogin.olvidar}  >
                <Text style={stylesLogin.textOlvidar}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}