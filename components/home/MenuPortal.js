import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';

export default function MenuPortal({ menus }) {

    const navigation = useNavigation();

    return (
        <View style={tw`flex-row justify-between flex-wrap`}>
            {menus.map((menu, index) => (
                <TouchableOpacity style={tw`items-center w-1/4`} onPress={() => navigation.navigate(menu.Route)} key={index}>
                    <View style={tw`w-16 h-16 bg-${menu.Color} justify-center rounded-lg items-center`}>
                        <FontAwesome5 name={menu.Icon} size={25} color="#ffffff" />
                    </View>
                    <Text style={[tw`mt-1 font-bold`, { fontSize: Platform.OS === 'ios' ? 10 : 13 }]}>{menu.Name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}