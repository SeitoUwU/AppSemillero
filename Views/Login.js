import { View, Text, Image } from "react-native";

import imgLogin from '../assets/login.png';

function Login() {
    return (
        <View style={styles.container}>
            <Image source={imgLogin} />
            <Text>Login</Text>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
}

export default Login;