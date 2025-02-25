import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Modal,
    Platform
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

export default function Account() {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);
    const [showLogout, setShowLogout] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const openCamera = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert("Se necesitan permisos para acceder a la cámara.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleLogout = () => {
        setShowLogout(false);
        navigation.replace("Login");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>
                        Hola, <Text style={styles.usuario}>Usuario</Text>
                    </Text>

                    <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
                        <Image source={require('../assets/profile.png')} style={styles.profileImage}/>
                    </TouchableOpacity>

                    {showLogout && (
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    )}
                </View>


                <View style={styles.centerContainer}>
                    <View style={styles.cameraContainer}>
                        {imageUri ? (
                            <Image source={{uri: imageUri}} style={styles.imagePreview}/>
                        ) : (
                            <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
                                <Image source={require('../assets/camara.png')} style={styles.cameraIcon}/>
                            </TouchableOpacity>
                        )}

                        {!imageUri && (
                            <TouchableOpacity style={styles.openCameraButton} onPress={openCamera}>
                                <Text style={styles.openCameraButtonText}>Abrir Cámara</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {Platform.OS === 'android' ? (
                        <Picker
                            selectedValue={selectedMaterial}
                            onValueChange={(itemValue) => setSelectedMaterial(itemValue)}
                            style={styles.picker}
                            dropdownIconColor="#333"
                        >
                            <Picker.Item label="Seleccione una opción..." value="" color="#000"/>
                            <Picker.Item label="Plástico" value="plastico" color="#000"/>
                            <Picker.Item label="Papel" value="papel" color="#000"/>
                            <Picker.Item label="Cartón" value="carton" color="#000"/>
                            <Picker.Item label="Vidrio" value="vidrio" color="#000"/>
                            <Picker.Item label="Metal" value="metal" color="#000"/>
                        </Picker>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.pickerButton}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={styles.pickerButtonText}>
                                    {selectedMaterial
                                        ? selectedMaterial.charAt(0).toUpperCase() + selectedMaterial.slice(1)
                                        : 'Seleccione una opción...'}
                                </Text>
                            </TouchableOpacity>

                            <Modal visible={modalVisible} transparent={true} animationType="slide">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <Picker
                                            selectedValue={selectedMaterial}
                                            onValueChange={(itemValue) => {
                                                setSelectedMaterial(itemValue);
                                                setModalVisible(false);
                                            }}
                                            style={{backgroundColor: "#ffffff"}}
                                        >
                                            <Picker.Item label="Seleccione una opción..." value="" color="#000"
                                                         style={{color: "#000"}}/>
                                            <Picker.Item label="Plástico" value="plastico" color="#000"
                                                         style={{color: "#000"}}/>
                                            <Picker.Item label="Papel" value="papel" color="#000"
                                                         style={{color: "#000"}}/>
                                            <Picker.Item label="Cartón" value="carton" color="#000"
                                                         style={{color: "#000"}}/>
                                            <Picker.Item label="Vidrio" value="vidrio" color="#000"
                                                         style={{color: "#000"}}/>
                                            <Picker.Item label="Metal" value="metal" color="#000"
                                                         style={{color: "#000"}}/>
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
                        </>
                    )}


                    {imageUri && (
                        <TouchableOpacity style={styles.sendButton}>
                            <Text style={styles.sendButtonText}>Enviar</Text>
                        </TouchableOpacity>
                    )}

                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        position: 'relative',
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E1E1E',
    },
    usuario: {
        color: '#03BED7',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    logoutButton: {
        position: 'absolute',
        right: 20,
        top: 60,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    logoutText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        width: 300,
        height: 300,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#1c2b31',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 20,
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cameraButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        width: 100,
        height: 100,
    },
    openCameraButton: {
        backgroundColor: '#1C2B31',
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
    },
    openCameraButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'normal',
    },
    sendButton: {
        backgroundColor: '#1C2B31',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
        marginTop: 15,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pickerContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',

    },
    pickerLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    picker: {
        height: 50,
        width: '80%',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    pickerButton: {
        height: 50,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '80%',
    },
    pickerButtonText: {
        fontSize: 16,
        color: '#333',
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
    },
    closeModalButton: {
        marginTop: 10,
        backgroundColor: '#03BED7',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeModalText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
