import { useFocusEffect } from "@react-navigation/native";
import { addHours } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { es } from "date-fns/locale";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { createInvitado, getEntradas } from "../services/InvitadosService";
import { alertSucces, alertWarning } from "../utilities/toast/Toast";

export default function useInvitado(itemsPerPage) {
    const ahora = new Date();
    const zonaHoraria = "America/Bogota";
    const vencimiento = addHours(ahora, 12);
    const fechaVencimientoTexto = formatInTimeZone(vencimiento, zonaHoraria, "PPpp", { locale: es });
    const fechaVencimiento = vencimiento.toISOString();
    const datosQR = { usuario: invitacion, fechaVencimiento };
    const dataString = JSON.stringify(datosQR);
    const { token, credenciales } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [generado, setGenerado] = useState(false);
    const [invitacion, setInvitacion] = useState({});
    const [entradas, setEntradas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [pagedEntradas, setPagedEntradas] = useState([]);
    const [invitado, setInvitado] = useState({
        user_id: credenciales.id,
        Nombre: "",
        Apellidos: "",
        Telefono: "",
        TipoDocumento: "",
        Documento: "",
        Status: false,
    });

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
            if (
                invitado.Nombre === "" ||
                invitado.Apellidos === "" ||
                invitado.Documento === "" ||
                invitado.TipoDocumento === "" ||
                invitado.Telefono === ""
            ) {
                return alertWarning("Hay campos vacios");
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
                    "Esta persona superó el límite de invitaciones mensuales."
                );
            }
        } catch (error) {
            setLoading(false);
            alertWarning("Invitado" + error.message);
        }
    };

    //================= Filtro de busqueda =======================

    const handleBusqueda = (text) => {
        setBusqueda(text);
    };

    const handleSearch = () => {
        setSearchQuery(busqueda);
    };

    //================= ENTRADAS ===============================

    const entradasInvitados = async () => {
        try {
            setLoading(true);
            const data = await getEntradas(token);
            if (searchQuery) {
                const searchDate = new Date(searchQuery);
                const searchDateString = searchDate.toISOString().split('T')[0];
                data = data.filter(entrada => {
                    const entradaDate = new Date(entrada.created_at);
                    const entradaDateString = entradaDate.toISOString().split('T')[0];
                    return entradaDateString === searchDateString;
                });
            }
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
        }, [searchQuery])
    );

    useEffect(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPagedEntradas(entradas.slice(startIndex, endIndex));
    }, [entradas, page, itemsPerPage]);

    return {
        dataString,
        invitado,
        generado,
        loading,
        fechaVencimientoTexto,
        entradas,
        page,
        totalPages: Math.ceil(entradas.length / itemsPerPage),
        pagedEntradas,
        busqueda,
        handleBusqueda,
        handleSearch,
        handleChange,
        handleSubmit,
        recargar,
        setPage,
    };
}
