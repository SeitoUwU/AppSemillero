import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Views/Login';
import Register from './Views/Register';
import Account from './Views/Account';
import Auditoria from './Views/Auditoria';
import DetalleAuditoria from "./Views/DetailAuditoria";
import Verificacion from "./Views/Verificacion";

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                <Stack.Screen name="Account" component={Account} options={{headerShown: false}}/>
                <Stack.Screen name="Auditoria" component={Auditoria} options={{headerShown: false}}/>
                <Stack.Screen name="DetailAuditoria" component={DetalleAuditoria} options={{headerShown: false}}/>
                <Stack.Screen name="Verificacion" component={Verificacion} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
