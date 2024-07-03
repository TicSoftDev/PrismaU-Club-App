import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Svg, { Text as SvgText } from 'react-native-svg';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';
import { styles } from '../../assets/styles/Carnet';
import { servidorBack } from '../../routes/Routes';

export default function Carnet({ user, primerNombre, primerApellido, rol, data }) {
    return (
        <View style={tw`flex-1 justify-center items-center bg-white`}>
            <View style={styles.card}>
                <View style={styles.banner}>
                    <Svg height="300" width="300" viewBox="0 0 200 200">
                        <SvgText
                            fill="white"
                            stroke="none"
                            fontSize="25"
                            fontWeight="bold"
                            x="108"
                            y="100"
                            textAnchor="middle"
                            transform="rotate(-90, 108, 100)"
                        >
                            {rol}
                        </SvgText>
                    </Svg>
                </View>
                <ScrollView style={[tw`flex-1`, { width: '80%' }]} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={tw`flex-1 bg-gray-100 pt-4`}>
                        <View style={tw`flex flex-row justify-center items-center mt-4`}>
                            <Image source={imagenes.logoClub} resizeMode='contain' style={tw`h-12 w-12`} />
                            <View>
                                <Text style={tw`text-lg text-green-800`}>CLUB</Text>
                                <Text style={tw`text-xl font-bold text-green-800 -mt-2`}>SINCELEJO</Text>
                            </View>
                        </View>

                        <View style={tw`items-center mt-10 mb-6`}>
                            {user.imagen ?
                                <Image source={{ uri: servidorBack + user.imagen }} style={tw`h-36 w-36 rounded-full`} /> :
                                <Image source={imagenes.avatar} style={tw`h-36 w-36 rounded-full`} resizeMode='contain' />
                            }
                        </View>

                        <View style={[tw`p-2 ml-12`, styles.cuadro]}>
                            <Text style={tw`text-lg text-white`}>
                                {primerNombre + ' ' + primerApellido}
                            </Text>
                        </View>

                        <View style={tw`items-end mr-6`}>
                            <Text style={tw`text-lg font-bold`}>
                                {user.Codigo ? user.Codigo : 'No asignado'}
                            </Text>
                        </View>

                        <View style={tw`items-end mt-10 mr-6`}>
                            <QRCode color='black' value={data} size={100} />
                        </View>
                        <View style={tw`flex flex-row justify-end items-end mt-6 mr-4`}>
                            <Image source={imagenes.logoPrisma} style={tw`h-6 w-8 mr-1`} resizeMode='contain' />
                            <Text style={tw`text-sm text-gray-500 font-bold`}>PrismaU by TICSOFT</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
