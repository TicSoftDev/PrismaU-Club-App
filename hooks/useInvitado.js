import { useFocusEffect } from "@react-navigation/native";
import { addHours } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { es } from "date-fns/locale";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { createInvitado, getEntradas } from "../services/InvitadosService";
import { alertSucces, alertWarning } from "../utilities/toast/Toast";

export default function useInvitado() {
    const itemsPerPage = 20;
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

    const filterBusqueda = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const nombreCompleto = dato.Nombre + " " + dato.Apellidos;
            const documento = normalizeText(dato.Documento);
            const nombreNormalizado = normalizeText(nombreCompleto);
            const fecha = new Date(dato.fecha).toISOString().split('T')[0];
            return palabrasBusqueda.every(palabra =>
                nombreNormalizado.includes(palabra) || documento.includes(palabra) || fecha.includes(palabra)
            );
        });
    };

    const listadoFiltrado = filterBusqueda(entradas, busqueda);

    useEffect(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPagedEntradas(listadoFiltrado.slice(startIndex, endIndex));
    }, [entradas, page, itemsPerPage, busqueda]);

    const totalPages = Math.ceil(listadoFiltrado.length / itemsPerPage);

    return {
        dataString,
        invitado,
        generado,
        loading,
        fechaVencimientoTexto,
        entradas,
        page,
        totalPages,
        lista: pagedEntradas.slice(page * itemsPerPage, (page + 1) * itemsPerPage),
        busqueda,
        handleBusqueda,
        handleChange,
        handleSubmit,
        recargar,
        setPage,
    };
}
