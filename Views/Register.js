import React, { useState } from 'react';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
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

export default function Register({ navigation }) {
    console.log("✅ Renderizando Registro...");
    const [user, setUser] = useState({
        usuario: '',
        contrasena: '',
        confirmarContrasena: '',
    });
    const [loading, setLoading] = useState(false);

    const handledEvent = (field, value) => {
        setUser(prevUser => ({
            ...prevUser,
            [field]: value,
        }));
        console.log("Nuevo estado:", user);
    };

    const checkConnection = async () => {
        setLoading(true);
        const netInfo = await NetInfo.fetch();
        if (netInfo.isConnected) {
            checkCaracteres();
        } else {
            setLoading(false);
            Alert.alert('Error', 'No tienes conexión a internet');
        }
    };

    const checkCaracteres = () => {
        const regex = /^[0-9]*$/;
        if (!regex.test(user.usuario)) {
            setLoading(false);
            Alert.alert('Error', 'El usuario solo puede contener números');
        } else {
            checkLength();
        }
    }

    const checkLength = () => {
        if (user.usuario.length == 10 || user.usuario.length == 8 || user.usuario.length == 7) {
            register();
        } else {
            setLoading(false);
            Alert.alert('Error', 'El usuario debe tener 7, 8 o 10 caracteres');
        }
    }

    const register = async () => {
        try {
            setLoading(true);
    
            const usuario = user.usuario.trim();
            const contrasena = usuario;
            const rolUsuario = "user";  
    
            const response = await axios.post('http://158.220.123.106/ApiReciclaje/api/register', {
                username: usuario,
                password: contrasena,
                rolUsuario: rolUsuario,
            });
    
            if (response.status === 200) {
                setLoading(false);
                Alert.alert(
                    "Éxito",
                    "Registro exitoso",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate('Login')
                        }
                    ]
                );
            } else {
                setLoading(false);
                Alert.alert('Error', response.data.message || "Error en el registro");
            }
        } catch (error) {
            setLoading(false);
            console.log("Error en registro:", error);
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoiding}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.container}>
                            <Text style={styles.titulo}>
                                <Text style={styles.hola}>Hola,</Text>
                                {'\n'}
                                Captura imágenes de residuos y {'\n'}
                                contribuye a la clasificación {'\n'}
                                de materiales
                            </Text>

                            {/*<Image source={require('../assets/home.png')} style={styles.imagen} />*/}

                            <View style={styles.tituloFormularioContainer}>
                                <Text style={styles.tituloFormulario}>Crea tu cuenta</Text>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Usuario"
                                onChangeText={(value) => handledEvent('usuario', value)}
                                value={user.usuario}
                            />

                            <View style={styles.botonesContainer}>
                                <TouchableOpacity style={styles.botonRegistro} 
                                    disabled={loading}
                                    onPress={checkConnection}>
                                    {loading ? (
                                        <View style={styles.loadingButtonContainer}>
                                            <ActivityIndicator size="small" color="#ffffff" />
                                            <Text style={[styles.textoBotonRegistro, { marginLeft: 8 }]}>Registrando...</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.textoBotonRegistro}>Registrarse</Text>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Login')}
                                    style={[styles.botonLogin, loading && styles.buttonDisabled]}
                                    disabled={loading}
                                >
                                    <Text style={styles.textoBotonLogin}>Iniciar Sesión</Text>
                                </TouchableOpacity>
                            </View>
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
    },
    keyboardAvoiding: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    container: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 30,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'center',
        marginBottom: 20,
        color: '#1E1E1E',
    },
    hola: {
        fontSize: 40,
        color: '#03bed7',
        fontWeight: 'bold',
    },
    imagen: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
    },
    tituloFormularioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    tituloFormulario: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 50,
        width: '85%',
        backgroundColor: '#e1e1e1',
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 14,
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: 20,
    },
    botonRegistro: {
        backgroundColor: '#03BED7',
        padding: 12,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
    },
    textoBotonRegistro: {
        color: '#1C2B31',
        fontSize: 18,
    },
    botonLogin: {
        backgroundColor: '#1C2B31',
        padding: 12,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
    },
    textoBotonLogin: {
        color: 'white',
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
    loadingButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
