import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Verificacion({ route, navigation }) {
    const { usuario, image } = route.params;
    const [categoria, setCategoria] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleVerification = () => {
        alert('Verificación exitosa!');
        navigation.navigate('DetailAuditoria');
    };

    const handleSaveCategory = () => {
        if (categoria) {
            alert(`Categoría cambiada a: ${categoria}`);
            navigation.navigate('DetailAuditoria');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificación de Imagen</Text>

            <Text style={styles.subTitle}>Usuario: {usuario}</Text>

            <Image source={image} style={styles.image} />

            <TouchableOpacity style={styles.successButton} onPress={handleVerification}>
                <Text style={styles.buttonText1}>Verificación Exitosa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.changeCategoryButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText2}>Cambiar Categoría</Text>
            </TouchableOpacity>

            {/* Modal con Picker */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Seleccione una Categoría</Text>

                        <Picker
                            selectedValue={categoria}
                            onValueChange={(itemValue) => setCategoria(itemValue)}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            <Picker.Item label="Seleccione una opción..." value="" color="#000" />
                            <Picker.Item label="Plástico" value="plastico" color="#000" />
                            <Picker.Item label="Papel" value="papel" color="#000" />
                            <Picker.Item label="Cartón" value="carton" color="#000" />
                            <Picker.Item label="Vidrio" value="vidrio" color="#000" />
                            <Picker.Item label="Metal" value="metal" color="#000" />
                        </Picker>

                        <TouchableOpacity
                            style={styles.closeModalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeModalText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                style={[styles.saveButton, !categoria ? styles.disabledButton : null]}
                onPress={handleSaveCategory}
                disabled={!categoria}
            >
                <Text style={styles.buttonText3}>Guardar Nueva Categoría</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C2B31',
        marginBottom: 10,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 20,
    },
    successButton: {
        backgroundColor: '#03BED7',
        padding: 12,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    changeCategoryButton: {
        backgroundColor: '#1C2B31',
        padding: 12,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#fdba00',
        padding: 15,
        borderRadius: 30,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        elevation: 5,
    },
    disabledButton: {
        backgroundColor: '#B0B0B0',
    },
    buttonText1: {
        color: 'black',
        fontSize: 18,
    },
    buttonText2: {
        color: 'white',
        fontSize: 18,
    },
    buttonText3: {
        color: '#1C2B31',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    closeModalButton: {
        marginTop: 10,
        backgroundColor: '#03BED7',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    closeModalText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#000',
    },
});
