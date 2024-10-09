import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { ModalContentStyledContainer, InfoThermsContainer } from './../components/styles';
import axios from 'axios';

const PopUpSOS = ({ navigation, route }) => {
  const [isVisible, setIsVisible] = useState(true);
  // const { idUsuario } = route.params;
  const idUsuario = 1;

  const closePopUp = () => {
    setIsVisible(false);
    navigation.navigate('Menu');
  };

  const sendSOS = async () => {

    const url = `http://192.168.15.117:8080/usuarios/${idUsuario}/sos`;

    try {
      const response = await axios.post(url);

      console.log('SOS enviado com sucesso!', response.data);
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
