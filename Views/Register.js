import React, { useState } from 'react';
import axios from 'axios';
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
    Alert
} from 'react-native';

export default function Register({ navigation }) {
    const [user, setUser] = useState({
        usuario: null,
        contrasena: null,
        confirmarContrasena: null,
    });

    const handledEvent = (field, value) => {
        setUser({
            ...user,
            [field]: value,
              
        })
        console.log(user);
    }

    const handledConfirmPassword = () => {
        if (user.contrasena !== user.confirmarContrasena) {
            Alert.alert('Las contraseñas no coinciden');
            console.log(user);
        } else {
            register();
        }
    }

    const register = async () => {
        try {
            const response = await axios.post('http://localhost:3000/register', {
                username: user.usuario,
                password: user.contrasena,
            });
            if (response.status === 201) {
                Alert.alert(response.data.message);
                navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
            
        }
    }

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

                            <Image source={require('../assets/home.png')} style={styles.imagen} />

                            <View style={styles.tituloFormularioContainer}>
                                <Text style={styles.tituloFormulario}>Crea tu cuenta</Text>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Usuario"
                                onChangeText={(value) => handledEvent('usuario', value)}
                                value={user.usuario}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                secureTextEntry
                                onChangeText={(value) => handledEvent('contrasena', value)}
                                value={user.contrasena}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmar contraseña"
                                secureTextEntry
                                onChangeText={(value) => handledEvent('confirmarContrasena', value)}
                                value={user.confirmarContrasena}
                            />

                            <View style={styles.botonesContainer}>
                                <TouchableOpacity style={styles.botonRegistro} onPress={handledConfirmPassword}>
                                    <Text style={styles.textoBotonRegistro}>Registrarse</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Login')}
                                    style={styles.botonLogin}
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
});
