import { ActivityIndicator, Image, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { servidorBack } from '../../routes/Routes';

export default function CardsFamiliares({ familiares, isLoading }) {

    if (isLoading) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#098221" />
                <Text style={tw`mt-2 text-lg text-gray-700`}>Cargando...</Text>
            </View>
        )
    }

    return (
        <View style={tw`flex-1 bg-white`}>
            {
                !familiares || familiares.length === 0 ?
                    <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
                        <Image source={imagenes.search} style={tw`w-60 h-60`} resizeMode='contain' />
                        <Text style={tw`text-lg text-gray-700 text-center mt-4`}>No hay familiares registrados.</Text>
                        <Text style={tw`text-sm text-gray-500 text-center mt-2`}>Agrega familiares para verlos aquí</Text>
                    </View>
                    :
                    <View style={tw`p-4`}>
                        <View style={tw`flex-row items-center justify-between mb-6`}>
                            <Text style={tw`text-xl text-gray-800`}>Listado</Text>
                            <View style={tw`bg-green-100 px-3 py-1 rounded-full`}>
                                <Text style={tw`text-sm font-medium text-green-700`}>
                                    {familiares.length} {familiares.length === 1 ? 'familiar' : 'familiares'}
                                </Text>
                            </View>
                        </View>

                        {familiares.map((item, index) => (
                            <View
                                key={item.id || index}
                                style={tw`flex-row items-center p-4 mb-3 rounded-xl bg-white shadow-sm border border-gray-100`}
                            >
                                <View style={tw`mr-4`}>
                                    <Image
                                        source={item.imagen ? { uri: servidorBack + item.imagen } : imagenes.avatar}
                                        style={tw`w-16 h-16 rounded-full border-2 border-gray-300`}
                                        resizeMode='cover'
                                    />
                                </View>
                                <View style={tw`flex-1`}>
                                    <Text style={tw`text-lg font-semibold text-gray-800 mb-1`}>
                                        {item.Nombre} {item.Apellidos}
                                    </Text>
                                    <View style={tw`flex-row items-center`}>
                                        <FontAwesome5 name="heart" size={12} color="#10B981" style={tw`mr-2`} />
                                        <Text style={tw`text-sm text-gray-600 capitalize`}>
                                            {item.Parentesco || 'Esposo (a)'}
                                        </Text>
                                    </View>
                                    <View style={tw`flex-row items-center mt-1`}>
                                        <FontAwesome5 name="id-card-alt" size={12} color="#6B7280" style={tw`mr-2`} />
                                        <Text style={tw`text-xs text-gray-500`}>
                                            {item.Documento}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
            }
        </View>
    )
}