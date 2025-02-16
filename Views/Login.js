import { View, Text } from "react-native";

function Login() {
    return (
        <View style={styles.container}>
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