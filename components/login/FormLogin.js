import React from 'react';
import { ActivityIndicator, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, Linking, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { stylesLogin } from '../../assets/styles/Login';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes/Routes';

const openURL = async (url) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`No se puede abrir la URL: ${url}`);
    }
  } catch (error) {
    Alert.alert(`Error al intentar abrir la URL: ${url}`, error.message);
  }
};

export default function FormLogin({ loading, documento, password, setDocumento, setPassword, handleLogin }) {

  const navigate = useNavigation();
  
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={tw`flex-1 justify-center items-center`}>
          <Image style={stylesLogin.logo} source={imagenes.logoPrisma} />
          <Text style={stylesLogin.titulo}>Bienvenido </Text>
          <Text style={stylesLogin.subtitulo}>Inicia sesión en tu cuenta</Text>
          <View style={stylesLogin.inputContainer}>
            <Icon name="id-card" size={20} color="#000" style={stylesLogin.inputIcon} />
            <TextInput
              style={stylesLogin.textInput}
              placeholder="Número de documento"
              value={documento}
              onChangeText={setDocumento}
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()} // Foco en el siguiente campo
              blurOnSubmit={false}
            />
          </View>
          <View style={stylesLogin.inputContainer}>
            <MaterialIcons name="lock" size={20} color="#000" style={stylesLogin.inputIcon} />
            <TextInput
              style={stylesLogin.textInput}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              returnKeyType="go"
              ref={(input) => { this.passwordInput = input; }}
              onSubmitEditing={handleLogin} // Llamada al iniciar sesión al presionar Enter
            />
          </View>
          <TouchableOpacity style={stylesLogin.boton} onPress={handleLogin} >
            <Text style={stylesLogin.text}>
              {loading ? <ActivityIndicator color={'#fff'} size={'large'} /> : 'Ingresar'}
            </Text>
          </TouchableOpacity>
          <View style={styles.linksContainer}>
            <TouchableOpacity style={stylesLogin.olvidar} onPress={() => openURL('https://prismau.co/')}>
              <Text style={stylesLogin.textOlvidar}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesLogin.olvidar} onPress={() => navigate.navigate(Routes.REGISTER)}>
              <Text style={stylesLogin.textOlvidar}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});