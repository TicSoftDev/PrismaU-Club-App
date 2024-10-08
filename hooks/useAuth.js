import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useAuthContext } from '../context/AuthContext';
import { Routes } from '../routes/Routes';
import { alertWarning } from '../utilities/toast/Toast';

export default function useAuth() {

    const navigation = useNavigation();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [documento, setDocumento] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, logout } = useAuthContext();

    useEffect(() => {
        const loadCredentials = async () => {
            const storedDocumento = await AsyncStorage.getItem('documento');
            const storedPassword = await AsyncStorage.getItem('password');
            if (storedDocumento) setDocumento(storedDocumento);
            if (storedPassword) setPassword(storedPassword);
        };
        loadCredentials();
    }, []);

    const recargar = () => {
        setDocumento('');
        setPassword('');
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const goRegistrar = () => {
        navigation.navigate(Routes.REGISTER);
    }

    const goReset = () => {
        navigation.navigate(Routes.RECUPERAR);
    }

    const handleLogin = async () => {
        Keyboard.dismiss();
        if (documento === '' || password === '') {
            return alertWarning('No completado', 'Hay campos vacios');
        }
        setLoading(true);
        const result = await login(documento, password);
        setLoading(false);
        if (result) {
            await AsyncStorage.setItem('documento', documento);
            await AsyncStorage.setItem('password', password);
            recargar();
            navigation.navigate(Routes.HOME);
        } else {
            recargar();
            alertWarning('No completado', 'Credenciales Invalidas');
        }
    }

    const toggleModal = () => {
        setModal(!modal);
    }

    const cerrarSesion = async () => {
        setLoading(true);
        await logout();
        navigation.navigate(Routes.LOGIN);
        setLoading(false);
        toggleModal();
    };

    return {
        loading,
        documento,
        password,
        modal,
        showPassword,
        setDocumento,
        setPassword,
        toggleShowPassword,
        handleLogin,
        toggleModal,
        cerrarSesion,
        goRegistrar,
        goReset
    }
}