import React, { useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { getData } from '../utils/storageUtils';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Constants from 'expo-constants';
//import { ModalContentStyledContainer, InfoThermsContainer } from './../components/styles';

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
            // const url = `http://192.168.15.117:8080/usuarios/${idUsuario}/sos`;
            const url = `https://vitalcare-9331c2ed71f5.herokuapp.com/usuarios/${idUsuario}/sos`;

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
    <Modal
      visible={isVisible}
      transparent={false}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }}>
                Deseja prosseguir com a solicitação de socorro?
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TouchableOpacity onPress={sendSOS} style={{ flex: 1, marginRight: 5, marginLeft: 5 }}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', backgroundColor: '#8DBF4D', padding: 10, textAlign: 'center', borderRadius: 5 }}>
                Sim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closePopUp} style={{ flex: 1, marginLeft: 5 }}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', backgroundColor: '#722F37', padding: 10, textAlign: 'center', borderRadius: 5 }}>
                Não
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',    
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%', 
    height: '20%',
    marginBottom: '95',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PopUpSOS;
