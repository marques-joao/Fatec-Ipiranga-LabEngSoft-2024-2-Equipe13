//import React from 'react';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Configuracao = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');

const [accessibilityModalVisible, setAccessibilityModalVisible] = useState(false);

  // Função para abrir o modal de acessibilidade
  const handleAccessibilityPress = () => {
    setAccessibilityModalVisible(true);
  };
  
  // Ajustar tamanhos de acordo com as dimensões da tela
  const titleFontSize = width * 0.09;
  const buttonTextFontSize = width * 0.045;
  const imageMarginBottom = height * 0.03; // Margem inferior da imagem
  const titleMarginTop = height * 0.01; // Margem superior do título
  const buttonsMarginTop = height * 0.06; // Margem superior dos botões

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={require('../../assets/Configuração.png')} 
          style={[styles.image, { marginBottom: imageMarginBottom }]}
        />
        <Text style={[styles.title, { fontSize: titleFontSize, marginTop: titleMarginTop }]}>Configurações</Text>
        
        <View style={[styles.innerContainer, { marginTop: buttonsMarginTop }]}>
          <TouchableOpacity 
            style={[styles.configButton, { width: width * 0.9 }]} 
            onPress={() => navigation.navigate('Perfil')}
          >
            <Ionicons name="person-outline" size={24} color="#fff" style={styles.icon} />
            <Text style={[styles.buttonText, { fontSize: buttonTextFontSize }]}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.configButton, { width: width * 0.9 }]}
            onPress={() => navigation.navigate('SobreAplicativo')}
          >
            <MaterialIcons name="info-outline" size={24} color="#fff" style={styles.icon} />
            <Text style={[styles.buttonText, { fontSize: buttonTextFontSize }]}>Sobre o Aplicativo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.configButton, { width: width * 0.9 }]}
            onPress={() => navigation.navigate('Conta')}
          >
            <Ionicons name="wallet-outline" size={24} color="#fff" style={styles.icon} />
            <Text style={[styles.buttonText, { fontSize: buttonTextFontSize }]}>Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.configButton, { width: width * 0.9 }]}
            onPress={handleAccessibilityPress}
          >
            <Ionicons name="accessibility-outline" size={24} color="#fff" style={styles.icon} />
            <Text style={[styles.buttonText, { fontSize: buttonTextFontSize }]}>Acessibilidade</Text>
          </TouchableOpacity>

        {/* Modal de Recurso Indisponível para Acessibilidade */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={accessibilityModalVisible}
        onRequestClose={() => setAccessibilityModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Este recurso atualmente está indisponível, pois faz parte de uma implementação futura.</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAccessibilityModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  </ScrollView>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFF', 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  title: {
    fontWeight: 'bold',
    color: '#8DBF4D',
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: -10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 60,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  configButton: {
    flexDirection: 'row',
    paddingVertical: 18,
    backgroundColor: '#8DBF4D',
    borderRadius: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 13, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '93%',
    padding: 22,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'justify',
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#808080',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },

});
export default Configuracao;
