import React from 'react'
import FormSolicitud from '../../components/solicitudes/FormSolicitud'
import useSolicitudes from '../../hooks/useSolicitudes'
import ContainerFormulario from '../../utilities/ContainerForm/ContainerFormulario'
import DataSolicitudes from '../../components/solicitudes/DataSolicitudes'
import tw from 'tailwind-react-native-classnames'
import { Text } from 'react-native'
import { View } from 'react-native'

const SolicitudesScreen = () => {

  const { titulo, loading, solicitudes, page, pagedSolicitudes, solicitud, totalPages,
    handleChange, handleSubmit, setPage } = useSolicitudes();

  return (
    <>
      <View style={tw`h-20 w-full bg-green-500 pt-8 px-4`}>
        <Text style={tw`text-xl font-bold text-white`}>Solicitudes</Text>
      </View>
      <DataSolicitudes page={page} setPage={setPage} totalPages={totalPages} pagedSolicitudes={pagedSolicitudes} />
      {/* <FormSolicitud loading={loading} solicitud={solicitud} handleChange={handleChange} handleSubmit={handleSubmit} /> */}
    </>
  )
}

export default SolicitudesScreen