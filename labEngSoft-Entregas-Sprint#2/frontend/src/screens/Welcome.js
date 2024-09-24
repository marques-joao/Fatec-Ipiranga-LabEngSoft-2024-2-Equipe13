import React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    InnerContainer,
    PageTitle,
    PageSubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    Avatar,
    WelcomeImage
} from '../components/styles'

const Welcome = ({navigation, route}) => { 
    const {nome, email} = route.params;

    return (
        <>
            <StatusBar style='light' />
            <InnerContainer>
                <WelcomeImage resizeMode='cover' source={require('./../../src/assets/welcome.png')} />
                <WelcomeContainer>
                    <PageTitle welcome={true}>VitalCare: Porque saúde é viver bem</PageTitle>
                    <PageSubTitle welcome={true}>{nome || 'João Marques'}</PageSubTitle>
                    <PageSubTitle welcome={true}>{email || 'joao@email.com'}</PageSubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode='cover' source={require('./../../src/assets/logo-vitalcare.png')} />
                        
                        <Line />
                        
                        <StyledButton onPress={() => {navigation.navigate('Login')}}>
                            <ButtonText>Sair</ButtonText>
                        </StyledButton>

                    </StyledFormArea>
                </WelcomeContainer>

            </InnerContainer>
        </>
    );
};

export default Welcome;