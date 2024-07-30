import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Routes } from '../routes/Routes';
import { getEncuesta, getEncuestas, responderEncuesta } from '../services/EncuestasService';
import { alertSucces, alertWarning } from '../utilities/toast/Toast';

function useEncuestas() {

    const itemsPerPage = 6;
    const { token, credenciales } = useAuthContext();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [encuentas, setEncuestas] = useState([]);
    const [page, setPage] = useState(0);
    const [pagedEncuestas, setPagedEncuestas] = useState([]);
    const [encuesta, setEncuesta] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [respuestas, setRespuestas] = useState([]);
    const [checked, setChecked] = useState('');

    const goDetalle = (id) => {
        navigation.navigate(Routes.ENCUESTA, { id });
    }

    const consultarEncuestas = async () => {
        try {
            setLoading(true);
            const data = await getEncuestas(token, credenciales.id);
            setLoading(false);
            setEncuestas(data);
        } catch (error) {
            setLoading(false);
            console.log(error.message);
            alertWarning(error.message);
        }
    }

    useEffect(() => {
        consultarEncuestas();
    }, []);

    useEffect(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPagedEncuestas(encuentas.slice(startIndex, endIndex));
    }, [encuentas, page, itemsPerPage]);

    const consultarEncuesta = async (id) => {
        try {
            setLoading(true);
            const data = await getEncuesta(token, id);
            setLoading(false);
            setEncuesta(data);
        } catch (error) {
            setLoading(false);
            console.log(error.message);
            alertWarning(error.message);
        }
    }

    const handleAnswer = async () => {
        setRespuestas([
            ...respuestas,
            { pregunta_id: encuesta.preguntas[currentQuestionIndex].id, respuesta_id: checked }
        ]);
        setChecked('');
        if (currentQuestionIndex < encuesta.preguntas.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const finalRespuestas = {
                user_id: credenciales.id,
                respuestas: respuestas.concat({
                    pregunta_id: encuesta.preguntas[currentQuestionIndex].id,
                    respuesta_id: checked
                })
            };
            console.log(finalRespuestas);
            const data = await responderEncuesta(token, finalRespuestas);
            console.log(data);
            if (data.status) {
                alertSucces('Respuestas enviadas');
            } else {
                alertWarning(data.message);
            }
        }
    };

    return {
        loading,
        encuentas,
        page,
        totalPages: Math.ceil(encuentas.length / itemsPerPage),
        pagedEncuestas,
        encuesta,
        rol: credenciales.Rol,
        currentQuestionIndex,
        respuestas,
        checked,
        consultarEncuestas,
        setPage,
        goDetalle,
        consultarEncuesta,
        handleAnswer,
        setChecked
    }
}

export default useEncuestas