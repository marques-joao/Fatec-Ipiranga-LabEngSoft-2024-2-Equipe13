import React, { useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { getData } from '../utils/storageUtils';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { ModalContentStyledContainer, InfoThermsContainer } from './../components/styles';

const PopUpSOS = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closePopUp = () => {
    setIsVisible(false);
    navigation.navigate('Menu');
  };

  const sendSOS = async () => {
    try {
        const infoUsuario = await getData();
        const idUsuario = infoUsuario.idUsuario;
        console.log(infoUsuario);

        if (idUsuario) {
            const url = `http://192.168.15.117:8080/usuarios/${idUsuario}/sos`;
            // const url = `https://vitalcare-9331c2ed71f5.herokuapp.com/usuarios/${idUsuario}/sos`;

            const response = await axios.post(url);
            console.log('SOS enviado com sucesso!', response.data);
        } else {
            console.log('ID do usuário não encontrado');
        }
    } catch (error) {
        console.log('Erro ao enviar SOS:', error);
    }

    closePopUp();
    navigation.navigate('InfoSaude');
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <ModalContentStyledContainer>
        <InfoThermsContainer style={{ height: '15%', width: '85%' }}> 
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }}>
            Deseja prosseguir com a solicitação de socorro?
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TouchableOpacity onPress={sendSOS} style={{ flex: 1, marginRight: 5 }}>
              <Text style={{ fontSize: 16, color: 'white', backgroundColor: '#8DBF4D', padding: 10, textAlign: 'center', borderRadius: 5 }}>
                Sim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closePopUp} style={{ flex: 1, marginLeft: 5 }}>
              <Text style={{ fontSize: 16, color: 'white', backgroundColor: '#722F37', padding: 10, textAlign: 'center', borderRadius: 5 }}>
                Não
              </Text>
            </TouchableOpacity>
          </View>
        </InfoThermsContainer>
      </ModalContentStyledContainer>
    </Modal>
  );
};

export default PopUpSOS;
