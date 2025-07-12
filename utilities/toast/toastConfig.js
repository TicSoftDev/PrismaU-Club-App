import { StyleSheet, Text, View } from 'react-native';

export const toastConfig = {
    success: ({ text1, text2, ...rest }) => (
        <View style={[styles.container, { borderLeftColor: 'green' }]}>
            <Text style={[styles.text1, { color: 'green' }]}>{text1}</Text>
            <Text style={styles.text2}>{text2}</Text>
        </View>
    ),

    info: ({ text1, text2, ...rest }) => (
        <View style={[styles.container, { borderLeftColor: '#3093f0' }]}>
            <Text style={[styles.text1, { color: '#3093f0' }]}>{text1}</Text>
            <Text style={styles.text2}>{text2}</Text>
        </View>
    ),

    error: ({ text1, text2, ...rest }) => (
        <View style={[styles.container, { borderLeftColor: 'red' }]}>
            <Text style={[styles.text1, { color: 'red' }]}>{text1}</Text>
            <Text style={styles.text2}>{text2}</Text>
        </View>
    ),
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 12,
        borderLeftWidth: 5,
        borderRadius: 8,
        marginHorizontal: 20,
        marginVertical: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 14,
        marginTop: 4,
        color: 'black',
        flexWrap: 'wrap',
    },
});
