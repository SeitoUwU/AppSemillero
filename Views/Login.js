import React, { useState } from 'react';
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
    StatusBar
} from 'react-native';

export default function Login({ navigation }) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleLogin = () => {
        navigation.replace('Account');
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
                                onChangeText={setUsuario}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Escribe tu contraseña"
                                secureTextEntry
                                onChangeText={setContrasena}
                            />

                            <TouchableOpacity style={styles.botonInicio} onPress={handleLogin}>
                                <Text style={styles.textoBoton}>Iniciar sesión</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.botonRegistro}
                                onPress={() => navigation.navigate('Register')}
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
});
