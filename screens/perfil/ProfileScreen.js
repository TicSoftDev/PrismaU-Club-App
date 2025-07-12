import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import FormProfile from '../../components/profile/FormProfile';
import ModalDeleteAccount from '../../components/profile/ModalDeleteAccount';
import ModalPassword from '../../components/profile/ModalPassword';
import useHome from '../../hooks/useHome';
import useUsuario from '../../hooks/useUsuario';

export default function ProfileScreen() {

  const { modalVisible, password, loading, modalDeleteVisible, delet,
    toggleModalDelete, toggleModal, handleChange, handleSubmit, eliminarCuenta } = useUsuario();
  const { loadingPerfil, menuPerfil } = useHome();

  return (
    <View style={tw`flex-1 mb-12`}>
      <FormProfile toggleModal={toggleModal} eliminarCuenta={toggleModalDelete} loading={loadingPerfil} menu={menuPerfil} />
      <ModalPassword modalVisible={modalVisible} toggleModal={toggleModal} loading={loading}
        password={password} handleChange={handleChange} handleSubmit={handleSubmit} />
      <ModalDeleteAccount modal={modalDeleteVisible} toggleModal={toggleModalDelete} loading={loading}
        eliminar={eliminarCuenta} res={delet} />
    </View>
  )
} 