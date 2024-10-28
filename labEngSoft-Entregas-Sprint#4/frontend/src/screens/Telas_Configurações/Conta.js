// TelaConta.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaConta({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [subscriptionModalVisible, setSubscriptionModalVisible] = useState(false);

  // Função para confirmar a exclusão da conta
  const handleDeleteAccount = () => {
    setModalVisible(false);
    navigation.replace('Login'); // Navega para a tela de Login
  };

  return (
    <View style={styles.container}>
      {/* Ícone e título centralizados */}
      <View style={styles.header}>
        <Ionicons name="wallet-outline" size={68} color="#8DBF4D" style={styles.icon} />
        <Text style={styles.title}>Gerenciar Conta</Text>
      </View>

      {/* Botão para Gerenciar Assinatura */}
      <TouchableOpacity style={styles.button} onPress={() => setSubscriptionModalVisible(true)}>
        <Text style={styles.buttonText}>Gerenciar Assinatura</Text>
      </TouchableOpacity>

      {/* Botão para Deletar Conta */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Deletar Conta</Text>
      </TouchableOpacity>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tem certeza que deseja deletar a conta? Essa ação não pode ser desfeita!</Text>

            {/* Botão para confirmar a exclusão */}
            <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleDeleteAccount}>
              <Text style={styles.modalButtonText}>Deletar Conta</Text>
            </TouchableOpacity>

            {/* Botão para cancelar a ação */}
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar Ação</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Recurso Indisponível para Gerenciar Assinatura */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={subscriptionModalVisible}
        onRequestClose={() => setSubscriptionModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Este recurso atualmente está indisponível, pois faz parte de uma implementação futura.</Text>

            {/* Botão para fechar o modal */}
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setSubscriptionModalVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Estilos da Tela e Modal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  icon: {
    marginBottom: 8,
    marginTop: 40,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#8DBF4D',
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#8DBF4D',
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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
  confirmButton: {
    backgroundColor: '#722F37',
  },
  cancelButton: {
    backgroundColor: '#808080',
  },
});
