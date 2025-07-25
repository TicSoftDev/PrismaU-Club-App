import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Routes } from "../routes/Routes";
import { changePassword, sendCode, validateCode } from "../services/ResetService";
import { alertSuccess, alertWarning } from "../utilities/toast/Toast";

function useReset() {
    const navigate = useNavigation();
    const [loading, setLoading] = useState(false);
    const [documento, setDocumento] = useState('');
    const [codigo, setCodigo] = useState('');
    const [password, setPassword] = useState('');

    /*=========== Enviar Codigo ==============================*/

    const handleChangeDocumento = (value) => {
        setDocumento(value);
    }

    const enviarCodigo = async () => {
        setLoading(true);
        if (documento === '') {
            alertWarning("No completado", "Por favor, ingrese el documento");
            setLoading(false);
            return;
        }
        try {
            const data = await sendCode(documento);
            if (data.status) {
                alertSuccess("Se envio el código correctamente");
                navigate.navigate(Routes.VALIDAR);
            }
            else {
                setDocumento('');
                alertWarning("No completado", "No se encontró ningún usuario");
            }
        } catch (error) {
            alertWarning("Error al enviar el código ", error.message);
        }
        setLoading(false);
    }

    /*=========== Validar Codigo ==============================*/

    const handleChangeCode = (value) => {
        setCodigo(value);
    }

    const verificarCodigo = async () => {
        setLoading(true);
        if (codigo === '') {
            alertWarning("No completado", "Por favor, ingrese el código");
            setLoading(false);
            return;
        }
        try {
            const data = await validateCode(codigo);
            if (data.status) {
                await AsyncStorage.setItem('code', codigo);
                navigate.navigate(Routes.RESET);
            }
            else {
                setCodigo('');
                alertWarning("No completado", "Codigo invalido");
            }
        } catch (error) {
            alertWarning("Error al enviar el código ", error.message);
        }
        setLoading(false);
    }

    /*=========== Cambiar Password ==============================*/

    const handleChangePassword = (value) => {
        setPassword(value);
    }

    const cambiarPassword = async () => {
        setLoading(true);
        const code = await AsyncStorage.getItem('code');
        if (!code) {
            alertWarning("No completado", "No se encontró el código de validación");
            setLoading(false);
            return;
        }
        if (password === '') {
            alertWarning("No completado", "Por favor, ingrese la contraseña");
            setLoading(false);
            return;
        }
        try {
            const data = await changePassword(code, password);
            if (data.status) {
                alertSuccess("Contraseña actualizada correctamente");
                navigate.navigate(Routes.LOGIN);
            }
            else {
                setPassword('');
                alertWarning("No completado", "No se pudo cambiar la contraseña");
            }
        } catch (error) {
            alertWarning("Error al cambiar el password ", error.message);
        }
        setLoading(false);
    }

    return {
        documento,
        codigo,
        loading,
        password,
        handleChangeDocumento,
        handleChangeCode,
        enviarCodigo,
        verificarCodigo,
        handleChangePassword,
        cambiarPassword
    }
}

export default useReset;
