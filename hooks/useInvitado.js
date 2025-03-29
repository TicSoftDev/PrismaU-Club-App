import { useFocusEffect } from "@react-navigation/native";
import { addHours } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { es } from "date-fns/locale";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { createInvitado, getEntradas } from "../services/InvitadosService";
import { alertSucces, alertWarning } from "../utilities/toast/Toast";

export default function useInvitado() {
    const itemsPerPage = 20;
    const zonaHoraria = "America/Bogota";
    const { token, credenciales } = useAuthContext();

    const fechaVencimiento = useMemo(() => addHours(new Date(), 12).toISOString(), []);
    const fechaVencimientoTexto = useMemo(
        () => formatInTimeZone(new Date(fechaVencimiento), zonaHoraria, "PPpp", { locale: es }),
        [fechaVencimiento]
    );

    const [loading, setLoading] = useState(false);
    const [generado, setGenerado] = useState(false);
    const [invitacion, setInvitacion] = useState({});
    const [entradas, setEntradas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [page, setPage] = useState(0);

    const [invitado, setInvitado] = useState({
        user_id: credenciales.id,
        Nombre: "",
        Apellidos: "",
        Telefono: "",
        TipoDocumento: "",
        Documento: "",
        Status: false,
    });
    const dataString = useMemo(() => JSON.stringify({ usuario: invitacion, fechaVencimiento }), [invitacion, fechaVencimiento]);

    //================= RECARGAR ===============================

    const recargar = () => {
        setInvitado({
            user_id: credenciales.id,
            Nombre: "",
            Apellidos: "",
            Telefono: "",
            TipoDocumento: "",
            Documento: "",
            Status: false,
        });
        setInvitacion({});
        setGenerado(false);
        setLoading(false);
    };

    //================= INVITAR ===============================

    const handleChange = (value, name) => {
        let filteredValue = value;
        if (name === "Documento") {
            filteredValue = value.replace(/[^0-9]/g, "");
        }
        setInvitado({
            ...invitado,
            [name]: filteredValue,
        });
    };

    const handleSubmit = async (e) => {
        try {
            if (Object.values(invitado).some(value => value === "")) {
                return alertWarning("Hay campos vacíos");
            }
            setLoading(true);
            const data = await createInvitado(invitado, token);
            setLoading(false);
            if (data.status) {
                setGenerado(true);
                setInvitacion(data.data);
                alertSucces("Se ha generado el codigo de invitación");
            } else {
                alertWarning(
                    "No completado",
                    data.message
                );
            }
        } catch (error) {
            setLoading(false);
            alertWarning("Invitado" + error.message);
        }
    };

    useEffect(() => {
        const nuevoDataString = JSON.stringify({ usuario: invitacion, fechaVencimiento });

        if (nuevoDataString !== dataString) {
            setDataString(nuevoDataString);
        }
    }, [invitacion]);

    //================= ENTRADAS ===============================

    const entradasInvitados = async () => {
        try {
            setLoading(true);
            const data = await getEntradas(token);
            setEntradas(data);
        } catch (error) {
            alertWarning(error.message);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            entradasInvitados();
        }, [])
    );

    //================= Filtro de busqueda =======================

    const handleBusqueda = (text) => {
        setBusqueda(text);
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const listadoFiltrado = useMemo(() => {
        if (!busqueda) return entradas;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return entradas.filter(({ Nombre, Apellidos, Documento, fecha }) => {
            const nombreCompleto = normalizeText(`${Nombre} ${Apellidos}`);
            const documento = normalizeText(Documento);
            const fechaNormalizada = new Date(fecha).toISOString().split('T')[0];

            return palabrasBusqueda.every(palabra =>
                nombreCompleto.includes(palabra) ||
                documento.includes(palabra) ||
                fechaNormalizada.includes(palabra)
            );
        });
    }, [entradas, busqueda]);

    useEffect(() => { setPage(0); }, [busqueda]);

    const totalPages = Math.ceil(listadoFiltrado.length / itemsPerPage);

    const pagedEntradas = useMemo(() => {
        const startIndex = page * itemsPerPage;
        return listadoFiltrado.slice(startIndex, startIndex + itemsPerPage);
    }, [listadoFiltrado, page, itemsPerPage]);

    return {
        dataString,
        invitado,
        generado,
        loading,
        fechaVencimientoTexto,
        entradas,
        page,
        totalPages,
        lista: pagedEntradas,
        busqueda,
        handleBusqueda,
        handleChange,
        handleSubmit,
        recargar,
        setPage,
    };
}
