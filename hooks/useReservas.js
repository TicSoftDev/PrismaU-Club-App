import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Routes } from '../routes/Routes';
import { createReserva, deleteReserva, getReservas } from '../services/ReservasService';
import { alertSucces, alertWarning } from '../utilities/toast/Toast';

const useReservas = () => {
    const itemsPerPage = 6;
    const navigate = useNavigation();
    const { token, credenciales } = useAuthContext();
    const [reservas, setReservas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pagedReservas, setPagedReservas] = useState([]);
    const [selectedEspacio, setSelectedEspacio] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [reserva, setReserva] = useState({
        user_id: credenciales.id,
        espacio_id: "",
        Fecha: "",
        Inicio: "",
        Fin: "",
    });

    const recargar = () => {
        setReserva({
            user_id: credenciales.id,
            espacio_id: "",
            Fecha: "",
            Inicio: "",
            Fin: "",
        });
        setShowDatePicker(false);
        setShowStartTimePicker(false);
        setShowEndTimePicker(false);
        setSelectedEspacio(null);
    };

    const goReservar = () => {
        navigate.navigate(Routes.RESERVAR);
    };

    const handleChange = (value, name) => {
        setReserva(prevReserva => ({
            ...prevReserva,
            [name]: value
        }));
    };

    const handleSelectEspacio = (espacio) => {
        setSelectedEspacio(espacio);
        handleChange(espacio.id, 'espacio_id');
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            handleChange(selectedDate.toISOString().split('T')[0], 'Fecha'); // YYYY-MM-DD
        }
    };

    const onStartTimeChange = (event, selectedTime) => {
        setShowStartTimePicker(false);
        if (selectedTime) {
            handleChange(selectedTime.toTimeString().split(' ')[0].substring(0, 5), 'Inicio'); // HH:MM
        }
    };

    const onEndTimeChange = (event, selectedTime) => {
        setShowEndTimePicker(false);
        if (selectedTime) {
            handleChange(selectedTime.toTimeString().split(' ')[0].substring(0, 5), 'Fin'); // HH:MM
        }
    };

    const showDateSelector = () => {
        setShowDatePicker(true);
    };

    const showStartTimeSelector = () => {
        setShowStartTimePicker(true);
    };

    const showEndTimeSelector = () => {
        setShowEndTimePicker(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) {
            return '';
        }
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) {
            return '';
        }
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const consultarReservas = async () => {
        try {
            setIsLoading(true);
            const data = await getReservas(token, credenciales.id);
            setIsLoading(false);
            setReservas(data);
        } catch (error) {
            setIsLoading(false);
            alertWarning('Get Reservas', error.message);
        }
    };

    useEffect(() => {
        consultarReservas();
    }, []);

    useEffect(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPagedReservas(reservas.slice(startIndex, endIndex));
    }, [reservas, page]);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const data = await createReserva(token, reserva);
            setIsLoading(false);
            if (data.status) {
                alertSucces('Espacio Reservado correctamente');
                recargar();
                navigate.navigate(Routes.RESERVAS);
            } else if (data.status === false && data.message === 'No Disponible') {
                alertWarning('No completado', 'No hay disponibilidad en este horario');
            } else if (data.status === false && data.message === 'Reservado') {
                alertWarning('No completado', 'Ya ha sido reservado este espacio');
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 422) {
                const mensaje = error.response.data.errors.Fin[0] === "The fin field must be a date after inicio." ? "La hora inicial debe ser mayor a la final" : "Error en los datos";
                alertWarning('No completado', mensaje);
            } else {
                alertWarning('Reservar Espacio', error.message);
            }
        }
    }

    const cancelarReserva = async (id) => {
        try {
            const data = await deleteReserva(token, id);
            if (data.status) {
                alertSucces('Reserva cancelada');
                await consultarReservas();
            } else {
                alertWarning('No completado', 'No se pudo cancelar');
            }
        } catch (error) {
            alertWarning('No completado', error.message);
        }
    };

    return {
        reservas,
        isLoading,
        totalPages: Math.ceil(reservas.length / itemsPerPage),
        page,
        pagedReservas,
        reserva,
        selectedEspacio,
        showDatePicker,
        showStartTimePicker,
        showEndTimePicker,
        setPage,
        goReservar,
        handleChange,
        handleSelectEspacio,
        onDateChange,
        onStartTimeChange,
        onEndTimeChange,
        showDateSelector,
        showStartTimeSelector,
        showEndTimeSelector,
        formatDate,
        formatTime,
        handleSubmit,
        cancelarReserva,
        consultarReservas
    };
};

export default useReservas;
