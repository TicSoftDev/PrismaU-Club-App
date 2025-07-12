import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Forbiden from '../../components/global/Forbiden';
import DataReservas from '../../components/reservas/DataReservas';
import { useAuthContext } from '../../context/AuthContext';
import useReservas from '../../hooks/useReservas';

const ReservasScreen = () => {

  const { isLoading, page, pagedReservas, totalPages, setPage, goReservar, cancelarReserva, consultarReservas } = useReservas();
  const { user } = useAuthContext();
  useFocusEffect(
    useCallback(() => {
      consultarReservas();
    }, [])
  );

  return (
    <View style={tw`flex-1 bg-gray-100 mb-12`}>
      <View style={tw`flex flex-row justify-between items-center h-20 w-full bg-green-500 px-4`}>
        <Text style={tw`text-xl font-bold text-white`}>Reservas</Text>
      </View>
      {
        user.Estado == 1 ?
          <>
            <DataReservas page={page} setPage={setPage} totalPages={totalPages} reservas={pagedReservas} isLoading={isLoading}
              cancelar={cancelarReserva} />
            <TouchableOpacity onPress={goReservar} style={tw`w-full bg-green-500 p-2`}>
              <Text style={tw`font-bold text-white text-center uppercase`}>Reservar Espacio</Text>
            </TouchableOpacity>
          </>
          :
          <Forbiden estado={user.Estado} />
      }
    </View>
  );
};

export default ReservasScreen;
