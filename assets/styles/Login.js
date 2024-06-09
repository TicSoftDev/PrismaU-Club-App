import { StyleSheet } from "react-native";

export const stylesLogin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        justifyContent: 'flex-start',
        width: 100,
        height: 100,
    },
    titulo: {
        marginStart: 15,
        fontSize: 45,
        color: '#34433D',
        fontWeight: 'bold',
    },
    subtitulo: {
        fontSize: 20,
        color: 'gray',
        marginBottom: 10
    },
    boton: {
        marginTop: 30,
        width: '80%',
        height: 50,
        backgroundColor: '#098221',
        borderRadius: 25,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgb(212, 217, 215)',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 10,
        paddingStart: 25,
        width: '80%',
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        fontSize: 15
    },
    inputIcon: {
        marginRight: 20,
        color: 'gray',
    },
    textInput: {
        flex: 1, 
    },
    olvidar: {
        marginTop: 20,
        alignItems: 'left',
        cursor: 'pointer',
    },
    textOlvidar: {
        fontSize: 15,
        color: 'gray',
        fontWeight: 'bold',

    }
})