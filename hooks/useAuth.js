import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Routes } from '../routes/Routes';
import { alertWarning } from '../utilities/toast/Toast';
import { Keyboard } from 'react-native';

export default function useAuth() {

    const navigation = useNavigation();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [documento, setDocumento] = useState('');
    const [password, setPassword] = useState('');
    const { login, logout } = useAuthContext();

    const recargar = () => {
        setDocumento('');
        setPassword('');
    }

    const handleLogin = async () => {
        Keyboard.dismiss();
        if (documento === '' || password === '') {
            return alertWarning('Hay campos vacios');
        }
        setLoading(true);
        const result = await login(documento, password);
        setLoading(false);
        if (result) {
            recargar();
            navigation.navigate(Routes.HOME);
        } else {
            recargar();
            alertWarning('Credenciales Invalidas');
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
        setDocumento,
        setPassword,
        handleLogin,
        toggleModal,
        cerrarSesion
    }
}