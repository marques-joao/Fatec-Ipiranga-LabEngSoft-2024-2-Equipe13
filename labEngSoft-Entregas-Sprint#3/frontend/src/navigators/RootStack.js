import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Welcome from '../screens/Welcome';

import { Colors } from '../components/styles';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: Colors.darkGreen,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        padding: 20
                    }
                }}
                initialRouteName='Login'
            >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Cadastro' component={Cadastro} />
                <Stack.Screen options={{headerTintColor: Colors.white}} name='Welcome' component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;