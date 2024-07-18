import React from 'react';
import CodigoInvitacion from '../../components/invitados/CodigoInvitacion';
import FormInvitacion from '../../components/invitados/FormInvitacion';
import useInvitado from '../../hooks/useInvitado';

export default function InvitacionScreen() {

  const { invitado, dataString, generado, loading, fechaVencimientoTexto, handleChange, handleSubmit, recargar } = useInvitado();
  return (
    <>
      {
        !generado ?
          <FormInvitacion invitado={invitado} handleChange={handleChange}
            handleSubmit={handleSubmit} loading={loading} />
          :
          <CodigoInvitacion dataString={dataString} recargar={recargar}
            fechaVencimiento={fechaVencimientoTexto} />
      }
    </>
  )
}