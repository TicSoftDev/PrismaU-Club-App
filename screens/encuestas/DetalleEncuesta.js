import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Button, Card, Divider, ProgressBar, RadioButton } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import useEncuestas from '../../hooks/useEncuestas';

const DetalleEncuesta = () => {
    const route = useRoute();
    const { id } = route.params;
    const { encuesta, currentQuestionIndex, checked, setChecked, handleAnswer, consultarEncuesta } = useEncuestas();

    useEffect(() => {
        consultarEncuesta(id);
    }, [id]);

    if (!encuesta) {
        return <Text style={tw`text-center mt-4`}>Cargando encuesta...</Text>;
    }

    return (
        <ScrollView contentContainerStyle={tw`flex-1 p-4 bg-gray-100`}>
            <Card style={tw`mb-4`}>
                <Card.Content>
                    <Text style={tw`text-xl font-bold mb-2`}>{encuesta.Titulo}</Text>
                    <ProgressBar progress={(currentQuestionIndex + 1) / encuesta.preguntas.length} color="#4CAF50" style={tw`h-4 rounded`} />
                </Card.Content>
            </Card>

            <Card style={tw`mb-4`}>
                <Card.Content>
                    <Text style={tw`text-lg font-bold mb-4`}>{encuesta.preguntas[currentQuestionIndex].Pregunta}</Text>
                    <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                        {encuesta.preguntas[currentQuestionIndex].respuestas.map((respuesta) => (
                            <TouchableOpacity key={respuesta.id} onPress={() => setChecked(respuesta.id)}>
                                <Card style={[tw`mb-2`, { borderColor: checked === respuesta.id ? '#4CAF50' : '#e0e0e0', borderWidth: 2 }]}>
                                    <Card.Content style={tw`flex-row items-center`}>
                                        <RadioButton value={respuesta.id} color="#4CAF50" />
                                        <Text style={tw`ml-2`}>{respuesta.Respuesta}</Text>
                                    </Card.Content>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </RadioButton.Group>
                </Card.Content>
            </Card>
            <Button mode="contained" onPress={handleAnswer} style={tw`mt-4 bg-green-500 font-bold text-lg`} disabled={!checked}>
                Siguiente
            </Button>
        </ScrollView>
    );
};

export default DetalleEncuesta;
