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

    const handleBusqueda = async () => {
        Keyboard.dismiss();
        if (busqueda === '') {
            return alertWarning('Se debe ingresar un valor');
        }
        setIsLoading(true);
        const res = await getUsuario(busqueda, token);
        setIsLoading(false);
        if (res.status === false) {
            newSearch()
            return alertWarning("No se encontro el usuario");
        } else {
            setSearched(true);
            setUser(res.user);
        }
    }

    const newSearch = () => {
        setSearched(false);
        setBusqueda('');
        setUser({});
    }

    return {
        searched,
        isLoading,
        user,
        busqueda,
        handleChange,
        handleBusqueda,
        newSearch
    }

}