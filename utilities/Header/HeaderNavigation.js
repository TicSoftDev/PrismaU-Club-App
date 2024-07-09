import { View, Text, Image } from 'react-native'
import React from 'react'
import imagenes from '../../assets/img/imagenes'
import tw from 'tailwind-react-native-classnames'

export default function HeaderNavigation() {
    return (
        <View style={tw`flex flex-row`}>
            <Image
                style={{ width: 25, height: 25, }}
                source={imagenes.logoPrisma} />
            <Text style={tw`ml-2 text-xl font-bold`}>PrismaU</Text>
            
        </View>
    );
}