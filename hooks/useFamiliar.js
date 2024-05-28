import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getFamiliaresSocio } from '../services/FamiliaresService';
import { alertWarning } from '../utilities/toast/Toast';

export default function useFamiliar() {

    const { token, credenciales, user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [familiares, setFamiliares] = useState([]);

    const consultarFamiliaresSocio = async () => {
        try {
            setIsLoading(true);
            const rol = credenciales.Rol == 2 ? "Asociado" : "Adherente";
            const data = await getFamiliaresSocio(user.id, rol, token);
            setIsLoading(false);
            setFamiliares(data);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            alertWarning('Get familiares', error);

        }
    }

    useEffect(() => {
        consultarFamiliaresSocio();
    }, [])

    return {
        familiares, isLoading
    }
}