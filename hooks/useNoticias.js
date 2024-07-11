import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getNoticias } from '../services/NoticiasService';
import { alertWarning } from '../utilities/toast/Toast';

function useNoticias() {

    const { token } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [noticias, setNoticias] = useState([]);

    const consultarNoticias = async () => {
        try {
            setLoading(true);
            const data = await getNoticias(token);
            setLoading(false);
            setNoticias(data);
        } catch (error) {
            setLoading(false);
            console.log(error.message);
            alertWarning(error.message);
        }
    }

    useEffect(() => {
        consultarNoticias();
    }, [])

    return {
        loading, noticias, consultarNoticias
    }
}

export default useNoticias