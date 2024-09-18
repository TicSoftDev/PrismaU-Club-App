import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { createEntrada } from '../services/AccesosService';
import { updateEntrada } from '../services/InvitadosService';
import { getUsuario } from '../services/UsuariosService';
import { alertWarning } from '../utilities/toast/Toast';

export default function useQr() {
    const { token } = useAuthContext();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState({});
    const [rol, setRol] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState(null);
    const [isExpired, setIsExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            setIsLoading(false);
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setIsLoading(true);
        try {
            setScanned(true);
            const dataParse = JSON.parse(data);
            const vencimiento = new Date(dataParse.vencimiento);
            const expired = vencimiento < new Date();
            setFechaVencimiento(vencimiento);
            setIsExpired(expired);
            if (!expired) {
                setRol(dataParse.rol);
                if (dataParse.rol) {
                    const res = await getUsuario(dataParse.usuario.documento, token);
                    setData(res);
                    await createEntrada(dataParse.usuario.user_id, token);
                } else {
                    setData(dataParse.usuario);
                    await updateEntrada(dataParse.usuario.id, token);
                }
            } else {
                setData({});
            }
        } catch (error) {
            console.error('Error al procesar el código QR:', error);
            alertWarning('Error al procesar el código QR', error.message);
            setData({});
        }
        setIsLoading(false);
    };

    const newScanner = () => {
        setScanned(false);
        setData({});
        setRol('');
        setFechaVencimiento(null);
        setIsExpired(false);
        setIsLoading(false);
    };

    return {
        scanned,
        newScanner,
        handleBarCodeScanned,
        data,
        rol,
        fechaVencimiento,
        ahora: new Date(),
        isExpired,
        hasPermission,
        isLoading
    };
}
