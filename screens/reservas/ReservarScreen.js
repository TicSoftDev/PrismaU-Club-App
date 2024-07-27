import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import CardsEspacios from '../../components/reservas/CardsEspacios';
import FormReserva from '../../components/reservas/FormReserva';
import useEspacio from '../../hooks/useEspacio';
import useReservas from '../../hooks/useReservas';

export default function ReservarScreen() {
  const { isLoading, page, totalPages, pagedEspacios, setPage } = useEspacio();
  const {
    selectedEspacio,
    reserva,
    showDatePicker,
    showStartTimePicker,
    showEndTimePicker,
    showDateSelector,
    showEndTimeSelector,
    showStartTimeSelector,
    onDateChange,
    onStartTimeChange,
    onEndTimeChange,
    formatDate,
    formatTime,
    handleSelectEspacio,
    handleSubmit
  } = useReservas();

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#098221" />
        <Text style={tw`mt-2 text-lg text-gray-700`}>Cargando...</Text>
      </View>
    );
  }

  if (!isLoading && (!pagedEspacios || pagedEspacios.length === 0)) {
    return (
      <View style={tw`justify-center items-center flex-1 bg-white mt-20`}>
        <Text style={tw`text-lg text-gray-700`}>No hay espacios registrados.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`bg-white pb-4`}>
      <View style={tw`h-20 w-full bg-green-500 pt-8 px-4`}>
        <Text style={tw`text-xl font-bold text-white`}>Reservar Espacio</Text>
      </View>
      <>
        <CardsEspacios
          espacios={pagedEspacios}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          onSelect={handleSelectEspacio}
        />
        {selectedEspacio && (
          <View style={tw`flex-row items-center p-4 bg-gray-300 mx-4 rounded`}>
            <Text style={tw`text-base font-bold mr-2`}>Seleccionado:</Text>
            <Text>{selectedEspacio.Descripcion}</Text>
          </View>
        )}
        <FormReserva
          reserva={reserva}
          formatDate={formatDate}
          formatTime={formatTime}
          showDatePicker={showDatePicker}
          showStartTimePicker={showStartTimePicker}
          showEndTimePicker={showEndTimePicker}
          onDateChange={onDateChange}
          onStartTimeChange={onStartTimeChange}
          onEndTimeChange={onEndTimeChange}
          showDateSelector={showDateSelector}
          showEndTimeSelector={showEndTimeSelector}
          showStartTimeSelector={showStartTimeSelector}
          handleSubmit={handleSubmit}
        />
      </>
    </ScrollView>
  );
}
