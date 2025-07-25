import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { servidorBack } from '../../routes/Routes';

export default function DataResult({ data }) {

    let rol;
    if (data.credenciales) {
        rol = data.credenciales.Rol == 2 ? 'Asociado' : data.credenciales.Rol == 3 ? 'Adherente' : (data.credenciales.Rol == 4 || data.credenciales.Rol == 6) ? 'Empleado' : "Familiar";
    }

    return (
        <View style={tw`flex-1 justify-center items-center bg-white px-4 pb-5`}>
            <View style={tw`mx-auto max-w-lg w-full bg-white rounded-lg shadow-md overflow-hidden`}>
                <ScrollView contentContainerStyle={tw`flex-grow`}>
                    {
                        data.credenciales ?
                            <View>
                                <View style={tw`flex-row items-center justify-between rounded-t-lg mx-auto max-w-lg w-full p-3 shadow-md ${data.user.Estado == 0 ? "bg-red-600" : data.user.Estado == 1 ? "bg-green-500" : data.user.Estado == 2 ? "bg-yellow-500" : "bg-purple-500"} shadow`}>
                                    <View style={tw`flex-row items-center`}>
                                        <FontAwesome5 name="eye" size={20} color="white" style={tw`mr-2 ml-2`} />
                                        <Text style={tw`text-lg text-white font-semibold mr-2`}>ESTADO:</Text>
                                        <Text style={tw`text-lg text-white font-semibold`}>{data.user.Estado == 0 ? 'Inactivo' : data.user.Estado == 1 ? 'Activo' : data.user.Estado == 2 ? 'Retirado' : 'En Mora'}</Text>
                                    </View>
                                </View>
                                <View style={tw`flex flex-row justify-center items-center mt-4`}>
                                    <Image source={imagenes.logoClub} resizeMode='contain' style={tw`h-10 w-10`} />
                                    <View>
                                        <Text style={tw`text-lg text-green-800`}>CLUB</Text>
                                        <Text style={tw`text-xl font-bold text-green-800 -mt-2`}>SINCELEJO</Text>
                                    </View>
                                </View>
                                <View style={tw`items-center mt-5`}>
                                    <View style={[tw`rounded-full bg-green-500 items-center justify-center shadow-md`, { width: 135, height: 135 }]}>
                                        {data.user.imagen ?
                                            <Image source={{ uri: servidorBack + data.user.imagen }} style={tw`h-32 w-32 rounded-full`} /> :
                                            <Image source={imagenes.avatar} style={tw`h-32 w-32 rounded-full`} resizeMode='contain' />
                                        }
                                    </View>
                                </View>
                                <View style={tw`flex flex-col justify-center items-center mb-6`}>
                                    <Text style={tw`mt-4 text-3xl font-bold text-green-700`}>{data.user.Nombre}</Text>
                                    <Text style={tw`text-lg text-green-700`}>{data.user.Apellidos}</Text>
                                    <Text style={tw`text-xl font-bold text-green-700 mt-5`}>{data.user.TipoDocumento} {data.user.Documento}</Text>
                                </View>
                                {
                                    (data.credenciales.Rol == 2 || data.credenciales.Rol == 3) && (data.user.familiar.length > 0) &&
                                    <View>
                                        <Text style={tw`text-lg text-green-700 px-5 font-bold mb-2`}>Familiares</Text>
                                        {
                                            data.user.familiar.map((item, index) => (
                                                <View key={item.id || index}
                                                    style={tw`flex-row items-center p-4 mb-3 rounded-xl bg-white}`}
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
                                                                {item.Parentesco}
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
                                            ))
                                        }
                                    </View>
                                }
                                {
                                    (data.credenciales.Rol == 5) &&
                                    <View>
                                        <View style={tw`flex-row items-center px-3 py-5 bg-white shadow`}>
                                            <FontAwesome5 name="user" size={24} color="green" style={tw`mr-6 ml-2`} />
                                            <View style={tw`flex-1`}>
                                                <Text style={tw`text-lg font-semibold`}>{data.user.relacionado.Nombre} {data.user.relacionado.Apellidos}</Text>
                                                <View style={tw`flex-row justify-between items-center mr-10`}>
                                                    <Text style={tw`text-sm text-gray-600`}>{data.user.relacionado.Documento}</Text>
                                                    <Text style={tw`text-sm text-gray-600`}>{data.user.asociado ? 'Asociado' : 'Adherente'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {
                                            data.user.relacionado.familiares.map((item, index) => (
                                                item.id != data.user.id &&
                                                <View key={index} style={tw`flex-row items-center p-3 bg-white shadow`}>
                                                    <FontAwesome5 name="user" size={24} color="green" style={tw`mr-6 ml-2`} />
                                                    <View style={tw`flex-1`}>
                                                        <Text style={tw`text-lg font-semibold`}>{item.Nombre} {item.Apellidos}</Text>
                                                        <View style={tw`flex-row justify-between items-center mr-10`}>
                                                            <Text style={tw`text-sm text-gray-600`}>{item.Documento}</Text>
                                                            <Text style={tw`text-sm text-gray-600`}>{item.Parentesco}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                    </View>
                                }
                                <View style={tw`flex-row items-center justify-between rounded-b-lg p-3 ${data.user.Estado == 0 ? "bg-red-600" : data.user.Estado == 1 ? "bg-green-500" : data.user.Estado == 2 ? "bg-yellow-500" : "bg-purple-500"} shadow`}>
                                    <View style={tw`flex-row`}>
                                        <FontAwesome5 name="user-cog" size={24} color="white" style={tw`mr-2 ml-2`} />
                                        <Text style={tw`text-lg text-white font-semibold`}>{rol}</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            <View>
                                <View style={tw`flex flex-row justify-center items-center mt-4`}>
                                    <Image source={imagenes.logoClub} resizeMode='contain' style={tw`h-10 w-10`} />
                                    <View>
                                        <Text style={tw`text-lg text-green-800`}>CLUB</Text>
                                        <Text style={tw`text-xl font-bold text-green-800 -mt-2`}>SINCELEJO</Text>
                                    </View>
                                </View>
                                <View style={tw`items-center mt-5`}>
                                    <View style={[tw`rounded-full bg-green-500 items-center justify-center shadow-md`, { width: 135, height: 135 }]}>
                                        <Image source={imagenes.avatar} style={tw`h-32 w-32 rounded-full`} resizeMode='contain' />
                                    </View>
                                </View>
                                <View style={tw`flex flex-col justify-center items-center mb-6`}>
                                    <Text style={tw`mt-4 text-3xl font-bold text-green-700`}>{data.Nombre}</Text>
                                    <Text style={tw`text-lg text-green-700`}>{data.Apellidos}</Text>
                                    <Text style={tw`text-xl font-bold text-green-700 mt-5`}>{data.TipoDocumento} {data.Documento}</Text>
                                </View>
                                <View>
                                    <Text style={tw`text-lg text-green-700 px-5 font-bold mb-2`}>Invitado por</Text>
                                    <View style={tw`flex-row items-center p-3 bg-white shadow`}>
                                        <FontAwesome5 name="user" size={24} color="green" style={tw`mr-6 ml-2`} />
                                        <View style={tw`flex-1`}>
                                            <Text style={tw`text-lg font-semibold`}>{data.usuario_info.Nombre} {data.usuario_info.Apellidos}</Text>
                                            <View style={tw`flex-row justify-between items-center mr-10`}>
                                                <Text style={tw`text-sm text-gray-600`}>{data.usuario_info.Documento}</Text>
                                                <Text style={tw`text-sm text-gray-600`}>{data.usuario_info.Parentesco}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={tw`flex-row items-center justify-between rounded-b-lg p-3 bg-green-500 shadow`}>
                                    <View style={tw`flex-row`}>
                                        <FontAwesome5 name="user-cog" size={24} color="white" style={tw`mr-2 ml-2`} />
                                        <Text style={tw`text-lg text-white font-semibold`}>Invitado</Text>
                                    </View>
                                </View>
                            </View>
                    }
                </ScrollView>
            </View>
        </View>
    );
}
