import { format, parse } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";

const zonaHoraria = "America/Bogota";

export const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(valor);
};

export const formatearFechaMes = (valor) => {
    const zonedDate = toZonedTime(valor, zonaHoraria);
    const month = format(zonedDate, 'MMMM yyyy', { locale: es });
    return month.charAt(0).toUpperCase() + month.slice(1);
};

export const formatearFecha = (valor) => {
    const zonedDate = toZonedTime(valor, zonaHoraria);
    return format(zonedDate, 'dd/MM/yyyy', { locale: es });
}

export const formatearFechaCorta = (valor) => {
    const zonedDate = toZonedTime(valor, zonaHoraria);
    return format(zonedDate, 'MMMM yyyy', { locale: es });
}

export const formatearHora = (valor) => {
    const parsedDate = parse(valor, 'HH:mm:ss', new Date());
    return format(parsedDate, 'hh:mm a');
}

export const normalizeText = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export const formatearFechaCompleta = (valor) => {
    const zonedDate = toZonedTime(valor, zonaHoraria);
    const fechaFormateada = format(zonedDate, "d 'de' MMMM 'de' yyyy h:mm a", { locale: es });
    return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
};
