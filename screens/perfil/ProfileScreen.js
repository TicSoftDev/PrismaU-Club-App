import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import FormProfile from '../../components/profile/FormProfile';
import ModalPassword from '../../components/profile/ModalPassword';
import useUsuario from '../../hooks/useUsuario';

export default function ProfileScreen() {

  const { modalVisible, password, loading, toggleModal, handleChange, handleSubmit } = useUsuario();

  return (
    <View style={tw`flex-1`}>
      <FormProfile toggleModal={toggleModal} />
      <ModalPassword modalVisible={modalVisible} toggleModal={toggleModal} loading={loading}
        password={password} handleChange={handleChange} handleSubmit={handleSubmit} />
    </View>
  )
} 