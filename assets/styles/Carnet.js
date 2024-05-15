import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        height: '90%',
        width: '90%',
        borderRadius: 12,
        overflow: 'hidden',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 8,
    },
    banner: {
        backgroundColor: '#055D20',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
    cuadro: {
        backgroundColor: '#055D20',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        paddingStart: 20,
    },
});