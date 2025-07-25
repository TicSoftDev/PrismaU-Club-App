import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getFamiliaresPareja, getFamiliaresSocio } from '../services/FamiliaresService';
import { alertWarning } from '../utilities/toast/Toast';

export default function useFamiliar() {

    const { token, credenciales, user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [familiares, setFamiliares] = useState([]);

    const consultarFamiliaresSocio = async () => {
        try {
            setIsLoading(true);
            let data = [];
            const rol = credenciales.Rol == 2 ? "Asociado" : "Adherente";
            if (credenciales.Rol == 3 || credenciales.Rol == 2) {
                data = await getFamiliaresSocio(user.id, rol, token);
            }
            if (credenciales.Rol == 5 && user.Parentesco === "Esposo (a)") {
                data = await getFamiliaresPareja(user.id, token);
            }
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
    }, []);

    return {
        familiares, isLoading
    }
}