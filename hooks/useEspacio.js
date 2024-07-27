import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getEspacios } from "../services/EspaciosService";
import { alertWarning } from "../utilities/toast/Toast";

export default function useEspacio() {

    const itemsPerPage = 1;
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [espacios, setEspacios] = useState([]);
    const [page, setPage] = useState(0);
    const [pagedEspacios, setPagedEspacios] = useState([]);

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
    }, []);

    useEffect(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPagedEspacios(espacios.slice(startIndex, endIndex));
    }, [espacios, page, itemsPerPage]);

    return {
        espacios, isLoading, totalPages: Math.ceil(espacios.length / itemsPerPage), page, pagedEspacios, setPage
    };
}