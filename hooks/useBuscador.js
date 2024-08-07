import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useAuthContext } from '../context/AuthContext';
import { getUsersActivos } from '../services/UsuariosService';
import { alertWarning } from '../utilities/toast/Toast';

export default function useBuscador() {

    const { token } = useAuthContext();
    const [busqueda, setBusqueda] = useState('');
    const [user, setUser] = useState({});
    const [searched, setSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    const handleChange = (value) => {
        setBusqueda(value);
    }

    const newSearch = () => {
        setSearched(false);
        setBusqueda('');
        setUser({});
    }

    const getUsers = async () => {
        setIsLoading(true);
        try {
            if (!token) {
                throw new Error('Token no disponible');
            }
            const res = await getUsersActivos(token);
            setUsuarios(res || []);
        } catch (error) {
            alertWarning('Error al cargar usuarios'+ error);
            console.error(error); 
        } finally {
            setIsLoading(false);
        }
    };

    const normalizeText = (text) => {
        return text?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const handleBusqueda = () => {
        Keyboard.dismiss();
        if (busqueda.trim() === '') {
            setIsLoading(false);
            alertWarning('Se debe ingresar un valor');
            return;
        }
        setIsLoading(true);

        const busquedaLower = normalizeText(busqueda);

        const filteredUsers = usuarios.filter(u => {
            const documento = normalizeText(u?.documento || '');
            const nombre = normalizeText(u?.nombre || '');
            const apellidos = normalizeText(u?.apellidos || '');
            const fullName = `${nombre} ${apellidos}`;

            return documento.includes(busquedaLower) ||
                   fullName.includes(busquedaLower) ||
                   busquedaLower.split(' ').every(word => fullName.includes(word));
        });

        if (filteredUsers.length === 0) {
            alertWarning("No se encontró el usuario");
        } else {
            setUser(filteredUsers[0]);
            setSearched(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, [token])

    return {
        searched,
        isLoading,
        user,
        busqueda,
        handleChange,
        handleBusqueda,
        newSearch,
        getUsers
    }

}