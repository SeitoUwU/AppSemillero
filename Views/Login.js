import React, { useState } from 'react';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Keyboard,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    StatusBar,
    Alert,
    ActivityIndicator
} from 'react-native';

export default function Login({ navigation }) {
    const [user, setUser] = useState({
        usuario: '',
        contrasena: '',
    });
    const [loading, setLoading] = useState(false);

    const handledEvent = (field, value) => {
        setUser({
            ...user,
            [field]: value,
        })
    };

    const checkConnection = async () => {
        setLoading(true);
        const netInfo = await NetInfo.fetch();
        if (netInfo.isConnected) {
            login();
        } else {
            setLoading(false);
            Alert.alert('Error', 'No tienes conexión a internet');
        }
    };

    const login = async () => {
        try {
            const response = await axios.post('http://158.220.123.106:81/login', {
                username: user.usuario.trim(),
                password: user.contrasena.trim(),
            });
            if (response.status === 200) {
                if (response.data.rol === 'ADMIN') {
                    navigation.reset({ index: 0, routes: [{ name: 'Auditoria' }] });
                } else {
                    await AsyncStorage.setItem('userToken', response.data.token);
                    navigation.reset({ index: 0, routes: [{ name: 'Account' }] });
                }
            } else if (response.status === 401) {
                setLoading(false);
                Alert.alert('Error', response.data.message);
            } else {
                setLoading(false);
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión \n' + error.message);
        }

    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.container}>
                            <Image source={require('../assets/login.png')} style={styles.imagen} />

                            <Text style={styles.titulo}>Iniciar sesión</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Escribe tu usuario"
                                onChangeText={(value) => handledEvent('usuario', value)}
                                value={user.usuario}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Escribe tu contraseña"
                                secureTextEntry
                                onChangeText={(value) => handledEvent('contrasena', value)}
                                value={user.contrasena}
                            />

                            {!loading ? (
                                <TouchableOpacity
                                    style={[styles.botonInicio, loading && styles.buttonDisabled]}
                                    onPress={checkConnection}
                                    disabled={loading}
                                >
                                    <Text style={styles.textoBoton}>Iniciar sesión</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="large" color="#03BED7" />
                                    <Text style={styles.loadingText}>Iniciando sesión...</Text>
                                </View>
                            )}

                            <TouchableOpacity
                                style={[styles.botonRegistro, loading && styles.buttonDisabled]}
                                onPress={() => navigation.navigate('Register')}
                                disabled={loading}
                            >
                                <Text style={styles.textoBotonRegistro}>Registrarse</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
    },
    imagen: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        marginBottom: 50,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '85%',
        height: 50,
        backgroundColor: '#e1e1e1',
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    botonInicio: {
        backgroundColor: '#03BED7',
        padding: 12,
        borderRadius: 15,
        width: '85%',
        alignItems: 'center',
        marginTop: 2,
    },
    botonRegistro: {
        backgroundColor: '#1C2B31',
        padding: 12,
        borderRadius: 15,
        width: '85%',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    textoBoton: {
        color: '#1C2B31',
        fontSize: 18,
    },
    textoBotonRegistro: {
        color: '#ffffff',
        fontSize: 18,
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
});
