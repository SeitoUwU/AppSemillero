import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';

export default function Register({navigation}) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.titulo}>
            <Text style={styles.hola}>
              Hola,
            </Text>
            {'\n'}
            Captura imágenes de residuos y {'\n'}
            contribuye a la clasificación {'\n'}
            de materiales
          </Text>

          <Image source={require('../assets/home.png')} style={styles.imagen}/>

          <View style={styles.tituloFormularioContainer}>
            <Text style={styles.tituloFormulario}>Crea tu cuenta</Text>
          </View>

          <TextInput style={styles.input} placeholder="Usuario" onChangeText={setUsuario}/>
          <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry onChangeText={setContrasena}/>
          <TextInput style={styles.input} placeholder="Confirmar contraseña" secureTextEntry
                     onChangeText={setConfirmarContrasena}/>

          <View style={styles.botonesContainer}>
            <TouchableOpacity style={styles.botonRegistro}>
              <Text style={styles.textoBotonRegistro}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.botonLogin}>
              <Text style={styles.textoBotonLogin}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>

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
  titulo: {
    fontSize: 14,
    fontWeight: "normal",
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#1E1E1E'
  },
  hola: {
    fontSize: 40,
    color: '#03bed7',
    fontWeight: 'bold',
  },
  imagen: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15
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