import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';

const FormReserva = ({
    reserva,
    showDatePicker,
    showStartTimePicker,
    showEndTimePicker,
    onDateChange,
    onStartTimeChange,
    onEndTimeChange,
    showDateSelector,
    showStartTimeSelector,
    showEndTimeSelector,
    formatDate,
    formatTime,
    handleSubmit
}) => {
    return (
        <View style={tw`px-4`}>
            <TouchableOpacity onPress={showDateSelector}>
                <Text style={tw`text-sm font-bold m-2`}>Fecha:</Text>
                <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
                    <FontAwesome5 name="calendar-alt" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                    <TextInput
                        placeholder="Seleccionar Fecha"
                        style={tw`flex-1 text-sm`}
                        value={reserva.Fecha ? formatDate(reserva.Fecha) : ''}
                        editable={false}
                    />
                </View>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={reserva.Fecha ? new Date(reserva.Fecha) : new Date()}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}

            <TouchableOpacity onPress={showStartTimeSelector}>
                <Text style={tw`text-sm font-bold m-2`}>Hora de Inicio:</Text>
                <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
                    <FontAwesome5 name="clock" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                    <TextInput
                        placeholder="Seleccionar Hora de Inicio"
                        style={tw`flex-1 text-sm`}
                        value={reserva.Inicio ? formatTime(reserva.Inicio) : ''}
                        editable={false}
                    />
                </View>
            </TouchableOpacity>
            {showStartTimePicker && (
                <DateTimePicker
                    testID="startTimePicker"
                    value={reserva.Inicio ? new Date(`1970-01-01T${reserva.Inicio}:00`) : new Date()}
                    mode="time"
                    display="default"
                    onChange={onStartTimeChange}
                />
            )}

            <TouchableOpacity onPress={showEndTimeSelector}>
                <Text style={tw`text-sm font-bold m-2`}>Hora de Fin:</Text>
                <View style={tw`flex flex-row items-center w-full h-10 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
                    <FontAwesome5 name="clock" style={tw`mr-1 px-4 text-lg text-gray-400`} />
                    <TextInput
                        placeholder="Seleccionar Hora de Fin"
                        style={tw`flex-1 text-sm`}
                        value={reserva.Fin ? formatTime(reserva.Fin) : ''}
                        editable={false}
                    />
                </View>
            </TouchableOpacity>
            {showEndTimePicker && (
                <DateTimePicker
                    testID="endTimePicker"
                    value={reserva.Fin ? new Date(`1970-01-01T${reserva.Fin}:00`) : new Date()}
                    mode="time"
                    display="default"
                    onChange={onEndTimeChange}
                />
            )}
            <TouchableOpacity onPress={handleSubmit} style={tw`flex items-center justify-center bg-green-500 rounded-lg py-2 px-8 my-4`}>
                <Text style={tw`text-white text-center uppercase font-bold`}>Reservar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FormReserva;
