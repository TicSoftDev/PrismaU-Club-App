import { Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import CardsFamiliares from '../../components/familiares/CardsFamiliares';
import useFamiliar from '../../hooks/useFamiliar';

export default function FamiliaresScreen() {

    const { familiares, isLoading } = useFamiliar();

    return (
        <>
            <View style={tw`h-20 w-full bg-green-500 pt-8 px-4`}>
                <Text style={tw`text-xl font-bold text-white`}>Mis Familiares</Text>
            </View>
            <CardsFamiliares familiares={familiares} isLoading={isLoading} />
        </>
    );
}
