import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getFamiliaresSocio } from '../services/FamiliaresService';
import { alertWarning } from '../utilities/toast/Toast';

export default function useFamiliar() {

    const { token, user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [familiares, setFamiliares] = useState([]);

    const consultarFamiliaresSocio = async () => {
        try {
            setIsLoading(true);
            const data = await getFamiliaresSocio(user.id, token);
            setIsLoading(false);
            setFamiliares(data);
        } catch (error) {
            alertWarning('Get familiares', error.message);

        }
    }

    useEffect(() => {
        consultarFamiliaresSocio();
    }, [])

    return {
        familiares, isLoading
    }
}