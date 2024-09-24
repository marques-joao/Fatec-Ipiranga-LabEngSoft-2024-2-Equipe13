import React from 'react';
import { StatusBar } from 'expo-status-bar';
// Forms
import { Formik } from 'formik';
// Icons
import { MaterialIcons } from '@expo/vector-icons';

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
    FormContainer,
    FormTitle,
    FormTitleContent,
} from './../components/styles'

import { View, ActivityIndicator, TouchableOpacity, Text, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import { Modal } from '../components/Modal';
import InfoTherms from '../components/InfoThermsPrivacy';
import InfoThermsConditions from '../components/InfoThermsConditions';
import InfoThermsPrivacy from '../components/InfoThermsPrivacy';

// Colors
const {darkGreen, grayThree, white, black} = Colors;

const Cadastro = ({navigation}) => { 

    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    const [isCheckedTherms, setIsCheckedTherms] = useState(false);
    const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(false);

    const [isModalVisibleConditions, setIsModalVisibleConditions] = useState(false);
    const [isModalVisiblePrivacy, setIsModalVisiblePrivacy] = useState(false);

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleRegister = (credentials, setSubmitting) => {
        handleMessage(null);

        const url = 'http://192.168.15.117:8080/usuarios/cadastro';

        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            const {status, message, data} = result;

            if (status != 'SUCCESS') {
                handleMessage(message, status);
            } else {
                navigation.navigate('Welcome', {... data});
            }

            setSubmitting(false);
            
        })
        .catch((error) => {
            console.log(error.response.data);
            setSubmitting(false);
            handleMessage('Ocorreu um erro. Verifique sua conexão com a internet e tente novamente.');
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
                    <PageTitle>Cadastro</PageTitle>
                    <PageSubTitle>SEJA BEM-VINDO!</PageSubTitle>

                    <FormContainer>
                        <FormTitle>
                            <FormTitleContent>VitalCare</FormTitleContent>
                        </FormTitle>

                        <Formik
                            initialValues={{nomeCompleto: '', email: '', senha: '', confirmaSenha: ''}}
                            onSubmit={(values, {setSubmitting}) => {
                                if (values.email == '' || values.senha == '' || values.nomeCompleto == '' || values.confirmaSenha == '') {
                                    handleMessage('Por favor, preencha todos os campos!');
                                    setSubmitting(false);
                                } else if (values.senha !== values.confirmaSenha) {
                                    handleMessage('As senhas não coincidem');
                                    setSubmitting(false);
                                } else {
                                    handleRegister(values, setSubmitting);
                                }
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
                                <MyTextInput 
                                    label='Nome completo'
                                    icon='person'
                                    placeholder='Exemplo da Silva'
                                    placeholderTextColor={grayThree}
                                    onChangeText={handleChange('nomeCompleto')}
                                    onBlur={handleBlur('nomeCompleto')}
                                    value={values.nomeCompleto}
                                />

                                <MyTextInput 
                                    label='Endereço de e-mail'
                                    icon='email'
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

                                <MyTextInput 
                                    label='Confirmar senha'
                                    icon='lock'
                                    placeholder='• • • • • • • •'
                                    placeholderTextColor={grayThree}
                                    onChangeText={handleChange('confirmaSenha')}
                                    onBlur={handleBlur('confirmaSenha')}
                                    value={values.confirmaSenha}
                                    secureTextEntry={hideConfirmPassword}
                                    isPassword={true}
                                    hidePassword={hideConfirmPassword}
                                    setHidePassword={setHideConfirmPassword}
                                />

                                <CheckboxConditions 
                                    label='Termos e Condições'
                                    isChecked={isCheckedTherms}
                                    setIsChecked={setIsCheckedTherms}
                                    isModalVisibleConditions={isModalVisibleConditions}
                                    setIsModalVisibleConditions={setIsModalVisibleConditions}
                                />

                                <CheckboxPrivacy 
                                    label='Políticas de Privacidade'
                                    isChecked={isCheckedPrivacy}
                                    setIsChecked={setIsCheckedPrivacy}
                                    isModalVisiblePrivacy={isModalVisiblePrivacy}
                                    setIsModalVisiblePrivacy={setIsModalVisiblePrivacy}
                                />

                                <MsgBox type={messageType}>{message}</MsgBox>

                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Cadastrar</ButtonText>
                                </StyledButton>}

                                {isSubmitting && <StyledButton disabled={true} >
                                    <ActivityIndicator size='large' color={white} />
                                </StyledButton>}

                                <Line />

                                <ExtraView>
                                    <ExtraText>Já possui uma conta?</ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Login')} >
                                        <TextLinkContent>Login</TextLinkContent>
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
};

const CheckboxConditions = ({ label, isChecked, setIsChecked, isModalVisibleConditions, setIsModalVisibleConditions}) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            {/* Caixa de seleção */}
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                <MaterialIcons 
                    name={isChecked ? 'check-box' : 'check-box-outline-blank'} 
                    size={24} 
                    color={darkGreen} 
                />
            </TouchableOpacity>

            {/* Label com link para abrir modal */}
            <TouchableOpacity onPress={() => setIsModalVisibleConditions(!isModalVisibleConditions)}>
                <Text style={{ marginLeft: 10, color: black }}>{label}</Text>
            </TouchableOpacity>

            {isModalVisibleConditions && (
                <Modal
                    isOpen={isModalVisibleConditions}
                >
                    <InfoThermsConditions />
                    <Pressable
                                onPress={() => setIsModalVisibleConditions(false)}
                                style={{
                                    backgroundColor: 'red',
                                    padding: 5,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    width: '40%',
                                    height: '5%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Text style={{ color: white, fontWeight: 'bold' }}>Fechar</Text>
                    </Pressable>

                </Modal>
            )}  

        </View>
    );
};

const CheckboxPrivacy = ({ label, isChecked, setIsChecked, isModalVisiblePrivacy, setIsModalVisiblePrivacy}) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            {/* Caixa de seleção */}
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                <MaterialIcons 
                    name={isChecked ? 'check-box' : 'check-box-outline-blank'} 
                    size={24} 
                    color={darkGreen} 
                />
            </TouchableOpacity>

            {/* Label com link para abrir modal */}
            <TouchableOpacity onPress={() => setIsModalVisiblePrivacy(!isModalVisiblePrivacy)}>
                <Text style={{ marginLeft: 10, color: black }}>{label}</Text>
            </TouchableOpacity>

            {isModalVisiblePrivacy && (
                <Modal
                    isOpen={isModalVisiblePrivacy}
                >
                    <InfoThermsPrivacy />
                    <Pressable
                                onPress={() => setIsModalVisiblePrivacy(false)}
                                style={{
                                    backgroundColor: 'red',
                                    padding: 5,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    width: '40%',
                                    height: '5%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Text style={{ color: white, fontWeight: 'bold' }}>Fechar</Text>
                    </Pressable>

                </Modal>
            )}  

        </View>
    );
};

export default Cadastro;