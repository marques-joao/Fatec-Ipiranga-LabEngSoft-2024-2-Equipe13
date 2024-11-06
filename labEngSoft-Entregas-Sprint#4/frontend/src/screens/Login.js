import React from 'react';

import { storeData } from '../utils/storageUtils'
import { StatusBar } from 'expo-status-bar';
// Forms
import { Formik } from 'formik';
// Icons
import { MaterialIcons, Fontisto } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    PageSubTitle,
    StyledFormArea,
    LeftIcon,
    Colors,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    ForgotPassword,
    ForgotPasswordContent,
    FormContainer,
    FormTitle,
    FormTitleContent
} from './../components/styles'

import { ActivityIndicator, View } from 'react-native';
import { useState } from 'react';

// Teclado impedindo visualização do input
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// API
import axios from 'axios';

// Colors
const {darkGreen, white, grayThree} = Colors;

const Login = ({ navigation }) => { 

    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    // const [googleSubmitting, setGoogleSubmitting] = useState(false);

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);

        const url = 'http://192.168.15.117:8080/usuarios/login';

        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            const {data, message, status} = result;
            
            if (status != 'SUCCESS') {
                handleMessage(message, status);
            } else {
                storeData(data);
                navigation.navigate('Menu');
                console.log(message);
            }
            
            setSubmitting(false);
            
        })
        .catch((error) => {
            console.log(error.response.data);
            console.log(credentials);
            setSubmitting(false);
            handleMessage('Ocorreu um erro interno. Volte mais tarde!');
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (

        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style='auto' />
                <InnerContainer>
                    <PageTitle>Acessar Conta</PageTitle>
                    <PageSubTitle>SEJA BEM-VINDO!</PageSubTitle>

                    <FormContainer>
                        <FormTitle>
                            <FormTitleContent>VitalCare</FormTitleContent>
                        </FormTitle>

                        <Formik
                            initialValues={{email: '', senha: ''}}
                            onSubmit={(values, {setSubmitting}) => {
                                if (values.email == '' || values.senha == '') {
                                    handleMessage('Por favor, preencha todos os campos!');
                                    setSubmitting(false);
                                } else {
                                    handleLogin(values, setSubmitting);
                                }
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
                                <MyTextInput 
                                    label='Endereço de e-mail'
                                    icon='person'
                                    placeholder='exemplo@email.com'
                                    placeholderTextColor={grayThree}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType='email-address'
                                />

                                <MyTextInput 
                                    label='Senha'
                                    icon='lock'
                                    placeholder='• • • • • • • •'
                                    placeholderTextColor={grayThree}
                                    onChangeText={handleChange('senha')}
                                    onBlur={handleBlur('senha')}
                                    value={values.senha}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                
                                <ForgotPassword>
                                    <ForgotPasswordContent>Esqueci minha senha</ForgotPasswordContent>
                                </ForgotPassword>

                                <MsgBox type={messageType}>{message}</MsgBox>

                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Login</ButtonText>
                                    </StyledButton>
                                )}

                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size='large' color={white} />
                                    </StyledButton>
                                )}

                                <Line />

                                <StyledButton google={true}>
                                        <Fontisto name='google' color={white} size={25}/>
                                        <ButtonText google={true}>Continuar com Google</ButtonText>
                                </StyledButton>

                                {/* {!googleSubmitting && (
                                    <StyledButton google={true}>
                                        <Fontisto name='google' color={white} size={25}/>
                                        <ButtonText google={true}>Continuar com Google</ButtonText>
                                    </StyledButton>
                                )} */}

                                {/* {googleSubmitting && (
                                    <StyledButton google={true} disabled={true}>
                                        <ActivityIndicator size='large' color={white} />
                                    </StyledButton>
                                )} */}

                                <ExtraView>
                                    <ExtraText>Não possui uma conta?</ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Cadastro')} >
                                        <TextLinkContent>Cadastre-se!</TextLinkContent>
                                    </TextLink>
                                </ExtraView>

                            </StyledFormArea>
                        )}

                        </Formik>
                    </FormContainer>

                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>

    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <MaterialIcons name={icon} size={30} color={darkGreen} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)} >
                    <MaterialIcons name={hidePassword ? 'visibility' : 'visibility-off'} size={30} color={grayThree} />
                </RightIcon>
            )}            
        </View>
    )
}

export default Login;