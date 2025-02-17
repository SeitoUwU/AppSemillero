import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

export default function Login({navigation}) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleLogin = () => {
        navigation.replace('Account');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Image source={require('../assets/login.png')} style={styles.imagen}/>

                <Text style={styles.titulo}>
                    Iniciar sesión
                </Text>

                <TextInput style={styles.input} placeholder={'Escribe tu usuario'} onChangeText={setUsuario}>

                </TextInput>

                <TextInput style={styles.input} placeholder={'Escribe tu contraseña'} onChangeText={setContrasena}>

                </TextInput>

                <TouchableOpacity style={styles.botonInicio} onPress={handleLogin}>
                    <Text style={{color: '#1C2B31', fontSize: 18}}>Iniciar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonRegistro} onPress={() => navigation.navigate('Register')}>
                    <Text style={{color: '#ffffff', fontSize: 18}}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
    },
    imagen: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 150
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    input: {
        width: "85%",
        height: 50,
        backgroundColor: '#e1e1e1',
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15
    },
    botonInicio: {
        backgroundColor: '#03BED7',
        padding: 12,
        borderRadius: 15,
        width: '85%',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30
    },
    botonRegistro: {
        backgroundColor: '#1C2B31',
        padding: 12,
        borderRadius: 15,
        width: '85%',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30
    }
});