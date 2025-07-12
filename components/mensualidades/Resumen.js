import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

export default function Resumen({ stats }) {
    return (
        <View style={tw`bg-white mx-4 mt-2 rounded-lg shadow-sm`}>
            <View style={tw`p-4`}>
                <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Resumen</Text>
                <View style={tw`flex-row justify-between mb-3`}>
                    <View style={tw`items-center`}>
                        <Text style={tw`text-2xl font-bold text-green-600`}>{stats.pagadas}</Text>
                        <Text style={tw`text-sm text-gray-600`}>Pagadas</Text>
                    </View>
                    <View style={tw`items-center`}>
                        <Text style={tw`text-2xl font-bold text-red-600`}>{stats.pendientes}</Text>
                        <Text style={tw`text-sm text-gray-600`}>Pendientes</Text>
                    </View>
                    <View style={tw`items-center`}>
                        <Text style={tw`text-2xl font-bold text-blue-600`}>{stats.total}</Text>
                        <Text style={tw`text-sm text-gray-600`}>Total</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
