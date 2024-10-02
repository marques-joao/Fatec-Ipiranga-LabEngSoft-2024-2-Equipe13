import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { ModalContentStyledContainer, InfoThermsContainer } from './../components/styles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PopUpSOS = () => {
  const [isVisible, setIsVisible] = useState(true); // Modal é exibido quando a tela é carregada
  const navigation = useNavigation(); // Navegação para voltar ao Menu.js

  // Função para fechar o PopUp e voltar ao Menu
  const closePopUp = () => {
    setIsVisible(false);
    navigation.navigate('Menu'); // Navega de volta para a tela Menu.js
  };

  // Função para acionar a API de socorro
  const sendSOS = async () => {
    try {
      const response = await axios.post('https://api.exemplo.com/sendSOS', {
        message: 'Socorro! Por favor, entre em contato com este número!',
      });
      console.log('SOS enviado com sucesso!', response.data);
    } catch (error) {
      console.log('Erro ao enviar SOS:', error);
    }
    closePopUp(); // Fecha o PopUp após enviar a solicitação
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <ModalContentStyledContainer>
        {/* Ajustando altura e largura */}
        <InfoThermsContainer style={{ height: '15%', width: '85%' }}> 
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }}>
            Deseja prosseguir com a solicitação de socorro?
          </Text>

          {/* Botões "Sim" e "Não" lado a lado */}
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
