import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function Account() {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);
    const [showLogout, setShowLogout] = useState(false);

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
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
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.titulo}>
                        Hola, <Text style={styles.usuario}>Usuario</Text>
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

    /* ESTILOS DE LA CÁMARA */
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
        backgroundColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
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
});
