import React from 'react';
import { Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import CodigoInvitacion from '../../components/invitados/CodigoInvitacion';
import FormInvitacion from '../../components/invitados/FormInvitacion';
import { useAuthContext } from '../../context/AuthContext';
import useInvitado from '../../hooks/useInvitado';
import Forbiden from '../../components/global/Forbiden';

export default function InvitacionScreen() {

  const { invitado, dataString, generado, loading, fechaVencimientoTexto, invitacion,
    handleChange, handleSubmit, recargar } = useInvitado();
  const { user } = useAuthContext();

  return (
    <>
      {
        !generado ?
          user.Estado == 1 ?
            <FormInvitacion invitado={invitado} handleChange={handleChange}
              handleSubmit={handleSubmit} loading={loading} />
            :
            <Forbiden estado={user.Estado} />
          :
          <CodigoInvitacion dataString={dataString} recargar={recargar}
            fechaVencimiento={fechaVencimientoTexto} invitacion={invitacion} />
      }
    </>
  )
}