import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, Linking, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { stylesLogin } from '../../assets/styles/Login';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes/Routes';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  // const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const compatible = await LocalAuthentication.hasHardwareAsync();
  //     setIsBiometricSupported(compatible);
  //   })();
  // }, []);

  // const handleBiometricAuth = async () => {
  //   const savedDocumento = await AsyncStorage.getItem('documento');
  //   if (!savedDocumento) {
  //     Alert.alert('Error', 'No se encontró un documento guardado.');
  //     return;
  //   }

  //   const biometricAuth = await LocalAuthentication.authenticateAsync({
  //     promptMessage: 'Autenticación facial para iniciar sesión',
  //     fallbackLabel: 'Usar contraseña',
  //   });

  //   if (biometricAuth.success) {
  //     // Rellena el documento guardado y realiza el inicio de sesión automáticamente
  //     setDocumento(savedDocumento);
  //     handleLogin();
  //   } else {
  //     Alert.alert('Error', 'La autenticación facial falló.');
  //   }
  // };

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
          {/* {isBiometricSupported && (
            <TouchableOpacity style={styles.faceIdButton} onPress={handleBiometricAuth}>
              <FontAwesome5 name="user-check" size={20} color="#808080" />
            </TouchableOpacity>
          )} */}
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
  faceIdButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
});