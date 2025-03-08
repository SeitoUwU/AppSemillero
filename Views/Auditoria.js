import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';

const materials = [
    { id: '1', name: 'Plástico', image: require('../assets/plastico.png') },
    { id: '2', name: 'Papel', image: require('../assets/papel.png') },
    { id: '3', name: 'Cartón', image: require('../assets/carton.png') },
    { id: '4', name: 'Vidrio', image: require('../assets/vidrio.png') },
    { id: '5', name: 'Metal', image: require('../assets/metal.png') }
];

export default function Auditoria({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Auditoría de Materiales</Text>

                {materials.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        onPress={() => navigation.navigate('DetailAuditoria', { categoria: item.name })}
                    >
                        {/*<Image source={item.image} style={styles.image} />*/}
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1C2B31',
    },
    card: {
        width: 320, // Tarjetas más anchas
        height: 170, // Tarjetas más grandes
        backgroundColor: '#ffffff',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 15,
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 20,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
});
