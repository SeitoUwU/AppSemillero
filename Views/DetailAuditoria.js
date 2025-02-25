import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';

const auditoriaData = [
    { id: '1', usuario: 'Juan Pérez', image: require('../assets/plastico.png'), verificada: true },
    { id: '2', usuario: 'María Gómez', image: require('../assets/papel.png'), verificada: false },
    { id: '3', usuario: 'Carlos López', image: require('../assets/carton.png'), verificada: true },
    { id: '4', usuario: 'Ana Martínez', image: require('../assets/vidrio.png'), verificada: false },
    { id: '5', usuario: 'Pedro Ramírez', image: require('../assets/metal.png'), verificada: true },
];

export default function DetalleAuditoria({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles de Auditoría</Text>

            <View style={styles.tableHeader}>
                <View style={styles.columnUsuario}><Text style={styles.headerText}>Usuario</Text></View>
                <View style={styles.columnFoto}><Text style={styles.headerText}>Foto</Text></View>
                <View style={styles.columnEstado}><Text style={styles.headerText}>Estado</Text></View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>
                {auditoriaData.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.tableRow}
                        onPress={() => navigation.navigate('Verificacion', { usuario: item.usuario, image: item.image })}
                    >
                        <View style={styles.columnUsuario}><Text style={styles.rowText}>{item.usuario}</Text></View>
                        <View style={styles.columnFoto}>
                            <Image source={item.image} style={styles.rowImage} />
                        </View>
                        <View style={styles.columnEstado}>
                            <View
                                style={[styles.statusCircle, item.verificada ? styles.verified : styles.notVerified]}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C2B31',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: '#03BED7',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    columnUsuario: { width: '40%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 },
    columnFoto: { width: '30%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 },
    columnEstado: { width: '30%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 },

    scrollView: {
        width: '90%',
        paddingBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 8,
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    rowText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    rowImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 5,
    },
    statusCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
    },
    verified: {
        backgroundColor: 'green',
    },
    notVerified: {
        backgroundColor: 'red',
    },
});
