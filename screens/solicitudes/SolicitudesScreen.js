import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import DataSolicitudes from '../../components/solicitudes/DataSolicitudes'
import useSolicitudes from '../../hooks/useSolicitudes'

const SolicitudesScreen = () => {

  const { loading, page, pagedSolicitudes, totalPages, setPage, goCrear, goDetalle } = useSolicitudes();

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex flex-row justify-between items-center h-20 w-full bg-green-500 px-4`}>
        <Text style={tw`text-xl font-bold text-white`}>Solicitudes</Text>

      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={tw`mt-5`} />
      ) : <>
        <DataSolicitudes page={page} setPage={setPage} totalPages={totalPages} pagedSolicitudes={pagedSolicitudes}
          goDetalle={goDetalle} />
        <TouchableOpacity style={tw`w-full bg-green-500 p-2`} onPress={goCrear}>
          <Text style={tw`font-bold text-white text-center uppercase`}>Nueva Solicitud</Text>
        </TouchableOpacity>
      </>}

    </View>
  )
}

export default SolicitudesScreen