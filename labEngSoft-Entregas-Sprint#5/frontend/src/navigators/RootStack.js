import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Menu from '../screens/Menu';
import DadosSaude from '../screens/DadosSaude';
import PopUpSOS from '../screens/PopUpSOS';
import InfoSaude from '../screens/InfoSaude';
import Agenda from '../screens/Agenda';
import Configuracao from '../screens/Telas_Configurações/Configuracao';
import Perfil from '../screens/Telas_Configurações/Perfil';
import TrocaSenha from '../screens/Telas_Configurações/TrocaSenha';
import SobreAplicativo from '../screens/Telas_Configurações/SobreAplicativo';
import Conta from '../screens/Telas_Configurações/Conta';
import Acessibilidade from '../screens/Telas_Configurações/Acessibilidade';

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
                <Stack.Screen name='Agenda' component={Agenda} />
                <Stack.Screen name='Configuracao' component={Configuracao} />
                <Stack.Screen name='Perfil' component={Perfil} />
                <Stack.Screen name='TrocaSenha' component={TrocaSenha} />
                <Stack.Screen name='SobreAplicativo' component={SobreAplicativo} />
                <Stack.Screen name='Conta' component={Conta} />
                <Stack.Screen name='Acessibilidade' component={Acessibilidade} />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;