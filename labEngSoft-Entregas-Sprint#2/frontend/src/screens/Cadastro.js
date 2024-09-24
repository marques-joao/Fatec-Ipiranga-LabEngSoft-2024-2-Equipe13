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

import { View, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';

// Colors
const {darkGreen, grayThree, white} = Colors;

const Cadastro = ({navigation}) => { 

    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    // const [isCheckedTherms, setIsCheckedTherms] = useState(false);
    // const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(false);

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

                                {/* <Checkbox 
                                    label='Termos e Condições'
                                    isChecked={isCheckedTherms}
                                    setIsChecked={setIsCheckedTherms}
                                />

                                <Checkbox 
                                    label='Políticas de Privacidade'
                                    isChecked={isCheckedPrivacy}
                                    setIsChecked={setIsCheckedPrivacy}
                                /> */}

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

// const Checkbox = ({ label, isChecked, setIsChecked }) => {
//     // const [isModalVisible, setIsModalVisible] = useState(false);

//     return (
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
//             {/* Caixa de seleção */}
//             <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
//                 <MaterialIcons 
//                     name={isChecked ? 'check-box' : 'check-box-outline-blank'} 
//                     size={24} 
//                     color={darkGreen} 
//                 />
//             </TouchableOpacity>

//             {/* Label com link para abrir modal */}
//             <TouchableOpacity onPress={() => setIsModalVisible(true)}>
//                 <Text style={{ marginLeft: 10, color: blue }}>{label}</Text>
//             </TouchableOpacity>

//             {/* Modal com os Termos
//             <InfoTherms
//                 isVisible={isModalVisible}
//                 onClose={() => setIsModalVisible(false)}
//             /> */}
//         </View>
//     );
// };


// const InfoTherms = ({ isVisible, onClose }) => {
// return (
//     <Modal
//     visible={isVisible}
//     transparent={true}
//     animationType="slide"
//     onRequestClose={onClose}
//     >
//     <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center' }}>
//         <View style={{ backgroundColor: white, padding: 20, borderRadius: 10, margin: 20 }}>
//         <ScrollView style={{ maxHeight: 400 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 18 }}>TERMOS E CONDIÇÕES</Text>{'\n\n'}

//             <Text style={{ fontWeight: 'bold' }}>1. Coleta de Dados</Text>{'\n'}
//             <Text>
//             A VitalCare pode coletar as seguintes informações pessoais:
//             {'\n'}- Dados fornecidos diretamente pelo usuário ao preencher formulários (nome, e-mail, telefone);
//             {'\n'}- Dados coletados automaticamente através de cookies e tecnologias similares (endereço IP, dados de navegação);
//             {'\n'}- Informações financeiras para efetuar pagamentos ou assinaturas.
//             {'\n\n'}
//             </Text>
            
//             <Text style={{ fontWeight: 'bold' }}>2. Utilização dos Dados</Text>{'\n'}
//             <Text>
//             As informações coletadas são utilizadas para:
//             {'\n'}- Prestar e melhorar os serviços da VitalCare;
//             {'\n'}- Personalizar a experiência do usuário;
//             {'\n'}- Processar transações e enviar comunicados importantes;
//             {'\n'}- Realizar estudos e análises internas com o objetivo de melhorar nossos serviços.
//             {'\n\n'}
//             </Text>
            
//             <Text style={{ fontWeight: 'bold' }}>3. Compartilhamento de Dados</Text>{'\n'}
//             <Text>
//             VitalCare se compromete a não compartilhar suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:
//             {'\n'}- Quando houver consentimento do usuário;
//             {'\n'}- Para cumprir obrigações legais;
//             {'\n'}- Para parceiros de confiança, com a finalidade de melhorar o serviço, desde que esses parceiros sigam normas de privacidade e segurança.
//             {'\n\n'}
//             </Text>

//             <Text style={{ fontWeight: 'bold' }}>4. Armazenamento e Segurança dos Dados</Text>{'\n'}
//             <Text>
//             Os dados coletados pela VitalCare são armazenados em servidores seguros e protegidos por medidas técnicas e administrativas apropriadas para garantir sua integridade e confidencialidade. No entanto, a VitalCare não pode garantir que não haverá acessos não autorizados a esses dados.
//             {'\n\n'}
//             </Text>

//             <Text style={{ fontWeight: 'bold' }}>5. Direitos dos Usuários</Text>{'\n'}
//             <Text>
//             Você tem o direito de:
//             {'\n'}- Acessar, corrigir ou excluir suas informações pessoais;
//             {'\n'}- Solicitar a portabilidade dos seus dados;
//             {'\n'}- Retirar o consentimento para o uso dos seus dados a qualquer momento, sendo avisado sobre as consequências disso.
//             {'\n\n'}
//             </Text>

//             <Text style={{ fontWeight: 'bold' }}>6. Alterações na Política de Privacidade</Text>{'\n'}
//             <Text>
//             A VitalCare pode atualizar esta política periodicamente, e qualquer alteração será comunicada por meio do nosso site ou aplicativo. Recomendamos que você revise esta página regularmente para se manter informado.
//             {'\n\n'}
//             </Text>

//             <Text style={{ fontWeight: 'bold' }}>7. Contato</Text>{'\n'}
//             <Text>
//             Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato conosco pelo e-mail: vitalcareapp@gmail.com
//             </Text>

//         </ScrollView>

//         <TouchableOpacity onPress={onClose}>
//             <Text style={{ color: darkGreen, marginTop: 20, textAlign: 'center' }}>Fechar</Text>
//         </TouchableOpacity>
//         </View>
//     </View>
//     </Modal>
// );
// };

export default Cadastro;