import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Modal,
    Platform,
    Alert,
    ActivityIndicator
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import NetInfo from '@react-native-community/netinfo';


export default function Account() {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);
    const [showLogout, setShowLogout] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const [materialId, setMaterialId] = useState(null);
    const [material, setMaterial] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        getOptions();
    }, []);

    const checkConnection = async () => {
        setLoading(true);
        const netInfo = await NetInfo.fetch();
        if (netInfo.isConnected) {
            sendImage();
        } else {
            setLoading(false);
            Alert.alert('Error', 'No tienes conexión a internet');
        }
    };

    const getOptions = async () => {
        try {
            const response = await axios.get('http://158.220.123.106:81/obtenerTiposB');
            if (response.status === 200) {
                setOptions(response.data);
            } else {
                Alert.alert('Error', response.data.message);
            }
        }
        catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    }

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const decode = await jwtDecode(token);
            return decode.username;
        } catch (error) {
            console.log(error);
        }
    }

    const sendImage = async () => {
        const userName = await getToken();
        if (verification()) {
            const imageConverted = await convertImage(imageUri);
            const response = await axios.post('http://158.220.123.106:81/subirImagen', {
                tipImagen: materialId + "",
                usuarioName: userName,
                imagen: imageConverted,
            })
            if (response.status === 201) {
                setImageUri(null);
                setMaterialId(null);
                setMaterial(null);
                setSelectedMaterial("");
                setLoading(false);
                Alert.alert('Éxito', response.data.message);
            } else {
                setLoading(false);
                Alert.alert('Error', response.data.message);
            }
        }
    };

    const verification = () => {
        if (!materialId) {
            Alert.alert('Error', 'Seleccione un tipo de material');
            return false;
        } else if (!imageUri) {
            Alert.alert('Error', 'Falta la imagen');
            return false;
        }
        return true;
    }

    const convertImage = async (uri) => {
        try {
            const image = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64
            });
            return image;
        } catch (error) {
            console.log(error);

        }
    }

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert("Se necesitan permisos para acceder a la cámara.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
            aspect: [5, 7], // Proporción aproximada para 500x700
        });

        if (!result.canceled) {
            // Redimensiona la imagen a 500x700 píxeles exactamente
            const manipResult = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 500, height: 700 } }],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );

            setImageUri(manipResult.uri);
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
                        Hola, <Text style={styles.usuario}>Bienvenido</Text>
                    </Text>

                    <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
                        <Image source={require('../assets/profile.png')} style={styles.profileImage} />
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
                            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                        ) : (
                            <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
                                <Image source={require('../assets/camara.png')} style={styles.cameraIcon} />
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
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedMaterial(itemValue);
                                if (itemValue !== "") {
                                    // Convertir ambos valores a string para asegurar una comparación correcta
                                    const selectedOption = options.find((option) =>
                                        String(option.TIPIMG_ID) === String(itemValue));

                                    if (selectedOption) {
                                        setMaterialId(selectedOption.TIPIMG_ID);
                                        setMaterial(selectedOption.TIPIMG_TIPO);
                                    } else {
                                        // Enfoque alternativo si el find no funciona
                                        // Para el primer elemento después de "Seleccione una opción"
                                        if (itemIndex > 0 && options.length >= itemIndex) {
                                            setMaterialId(options[itemIndex - 1].TIPIMG_ID);
                                            setMaterial(options[itemIndex - 1].TIPIMG_TIPO);
                                        }
                                    }
                                } else {
                                    setMaterialId("");
                                    setMaterial("");
                                }
                            }}
                            style={styles.picker}
                            dropdownIconColor="#333"
                        >
                            <Picker.Item label="Seleccione una opción..." value="" color="#000" />
                            {options.map((option) => (
                                <Picker.Item
                                    key={option.TIPIMG_ID}
                                    label={option.TIPIMG_TIPO}
                                    value={String(option.TIPIMG_ID)} // Convertir a string para consistencia
                                    color="#000"
                                />
                            ))}
                        </Picker>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.pickerButton}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={styles.pickerButtonText}>
                                    {material || "Seleccione una opción..."}
                                </Text>
                            </TouchableOpacity>

                            <Modal visible={modalVisible} transparent={true} animationType="slide">
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <Picker
                                            selectedValue={selectedMaterial}
                                            onValueChange={(itemValue) => {
                                                setSelectedMaterial(itemValue);
                                                if (itemValue !== "") {
                                                    // Convertir ambos valores a string para asegurar una comparación correcta
                                                    const selectedOption = options.find((option) =>
                                                        String(option.TIPIMG_ID) === String(itemValue));

                                                    if (selectedOption) {
                                                        setMaterialId(selectedOption.TIPIMG_ID);
                                                        setMaterial(selectedOption.TIPIMG_TIPO);
                                                    }
                                                } else {
                                                    setMaterialId("");
                                                    setMaterial("");
                                                }
                                                setModalVisible(false);
                                            }}
                                            style={{ backgroundColor: "#ffffff" }}
                                        >
                                            <Picker.Item label="Seleccione una opción..." value="" color="#000"
                                                style={{ color: "#000" }} />
                                            {options.map((option) => (
                                                <Picker.Item
                                                    key={option.TIPIMG_ID}
                                                    label={option.TIPIMG_TIPO}
                                                    value={String(option.TIPIMG_ID)} // Convertir a string para consistencia
                                                    color="#000"
                                                />
                                            ))}
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
                        <TouchableOpacity
                            style={[styles.sendButton, loading && styles.buttonDisabled]}
                            onPress={checkConnection}
                            disabled={loading}
                        >
                            {loading ? (
                                <View style={styles.loadingButtonContainer}>
                                    <ActivityIndicator size="small" color="#ffffff" />
                                    <Text style={[styles.sendButtonText, { marginLeft: 8 }]}>Enviando...</Text>
                                </View>
                            ) : (
                                <Text style={styles.sendButtonText}>Enviar</Text>
                            )}
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
        shadowOffset: { width: 0, height: 2 },
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
        shadowOffset: { width: 0, height: 2 },
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

    loadingContainer: {
        marginVertical: 15,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#03BED7',
        fontSize: 16,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    loadingButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
