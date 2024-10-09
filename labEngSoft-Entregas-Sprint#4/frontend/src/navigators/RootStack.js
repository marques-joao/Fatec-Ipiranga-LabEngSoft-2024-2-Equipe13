import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Menu from '../screens/Menu';
import DadosSaude from '../screens/DadosSaude';
import PopUpSOS from '../screens/PopUpSOS';
import InfoSaude from '../screens/InfoSaude';
// import Agenda from '../screens/Agenda';

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
                <Stack.Screen name='Menu' component={Menu} />
                <Stack.Screen name='DadosSaude' component={DadosSaude} />
                <Stack.Screen name='PopUpSOS' component={PopUpSOS} />
                <Stack.Screen name='InfoSaude' component={InfoSaude} />
                {/* <Stack.Screen name='Agenda' component={Agenda} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;