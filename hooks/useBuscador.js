import { useState } from 'react';
import { Keyboard } from 'react-native';
import { useAuthContext } from '../context/AuthContext';
import { getUsuario } from '../services/UsuariosService';
import { alertWarning } from '../utilities/toast/Toast';

export default function useBuscador() {

    const { token } = useAuthContext();
    const [busqueda, setBusqueda] = useState('');
    const [user, setUser] = useState({});
    const [searched, setSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (value) => {
        setBusqueda(value);
    }

    const newSearch = () => {
        setSearched(false);
        setBusqueda('');
        setUser({});
    }

    const handleBusqueda = async () => {
        Keyboard.dismiss();
        if (busqueda.trim() === '') {
            setIsLoading(false);
            alertWarning('Se debe ingresar un valor');
            return;
        }
        setIsLoading(true);
        const data = await getUsuario(busqueda, token);
        if (!data.status) {
            alertWarning("No completado", "No se encontró el usuario");
        } else {
            setUser(data);
            setSearched(true);
        }
        setIsLoading(false);
    };

    return {
        searched,
        isLoading,
        user,
        busqueda,
        handleChange,
        handleBusqueda,
        newSearch,
    }

}