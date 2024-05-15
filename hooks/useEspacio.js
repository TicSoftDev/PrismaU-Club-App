import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getEspacios } from "../services/EspaciosService";
import { alertWarning } from "../utilities/toast/Toast";

export default function useEspacio() {

    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [espacios, setEspacios] = useState([]);

    const consultarEspacios = async () => {
        try {
            setIsLoading(true);
            const data = await getEspacios(token);
            setIsLoading(false);
            setEspacios(data);
        } catch (error) {
            setIsLoading(false);
            alertWarning('Get Espacios', error.message);
        }
    }

    useEffect(() => {
        consultarEspacios();
    }, [])

    return {
        espacios, isLoading
    };
}