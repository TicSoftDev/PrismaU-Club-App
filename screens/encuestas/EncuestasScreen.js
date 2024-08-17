import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import DataEncuestas from '../../components/encuestas/DataEncuestas';
import Forbiden from '../../components/global/Forbiden';
import { useAuthContext } from '../../context/AuthContext';
import useEncuestas from '../../hooks/useEncuestas';

const EncuestasScreen = () => {

  const { loading, page, pagedEncuestas, totalPages, setPage, consultarEncuestas, goDetalle } = useEncuestas();
  const { user } = useAuthContext();
  useFocusEffect(
    useCallback(() => {
      consultarEncuestas();
    }, [])
  );

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex flex-row justify-between items-center h-20 w-full bg-green-500 px-4`}>
        <Text style={tw`text-xl font-bold text-white`}>Encuestas</Text>
      </View>
      {
        user.Estado == 1 ?
          loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={tw`mt-5`} />
          ) :
            <DataEncuestas page={page} setPage={setPage} totalPages={totalPages} pagedEncuestas={pagedEncuestas} goDetalle={goDetalle} />
          :
          <Forbiden estado={user.Estado} />
      }
    </View>
  )
}

export default EncuestasScreen