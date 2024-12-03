import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';

export default function BuscadorEntrada({ busqueda, handleBusqueda }) {

    return (
        <View style={tw`flex flex-col items-center justify-center py-5`}>
            <View style={tw`flex flex-row items-center border rounded-xl p-2 border-gray-300`}>
                <Icon name="id-card-o" size={20} color="#000" style={tw`ml-2 mr-4 text-gray-500`} />
                <TextInput
                    style={tw`text-lg flex-1`}
                    placeholder="Nombre, identificación o fecha"
                    value={busqueda}
                    onChangeText={(text) => handleBusqueda(text)}
                />
            </View>
        </View>
    );
}
