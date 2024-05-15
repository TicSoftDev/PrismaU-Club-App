import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import CardsEspacios from '../components/espacios/CardsEspacios';
import useEspacio from '../hooks/useEspacio';

export default function EspaciosScreen() {

  const { espacios, isLoading } = useEspacio();

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`h-20 w-full bg-green-500 pt-8 px-4`}>
        <Text style={tw`text-xl font-bold text-white`}>Espacios</Text>
      </View>
      <CardsEspacios espacios={espacios} isLoading={isLoading} />
    </ScrollView>
  );
}
