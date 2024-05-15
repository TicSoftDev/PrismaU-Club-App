import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'tailwind-react-native-classnames';
import useFamiliar from '../hooks/useFamiliar';
import CardsFamiliares from '../components/familiares/CardsFamiliares';

export default function FamiliaresScreen() {

    const { familiares, isLoading } = useFamiliar();
    return (
        <>
            <View style={tw`h-20 w-full bg-green-500 pt-8 px-4`}>
                <Text style={tw`text-xl font-bold text-white`}>Familiares</Text>
            </View>
            <CardsFamiliares familiares={familiares} isLoading={isLoading} />
        </>
    );
}
