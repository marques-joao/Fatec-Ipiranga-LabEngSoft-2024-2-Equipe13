import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  Alert 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getData } from '../../utils/storageUtils';

const Perfil = ({ navigation }) => {

  // Estados das informações do perfil
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeEmergencia, setNomeEmergencia] = useState('');
  const [telefoneEmergencia, setTelefoneEmergencia] = useState('');

  // Estados de edição dos campos do perfil
  const [editNome, setEditNome] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editNomeEmergencia, setEditNomeEmergencia] = useState(false);
  const [editTelefoneEmergencia, setEditTelefoneEmergencia] = useState(false);

  // Estados para gerenciar contatos de emergência adicionais
  const [contatosEmergencia, setContatosEmergencia] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [novoContatoNome, setNovoContatoNome] = useState('');
  const [novoContatoTelefone, setNovoContatoTelefone] = useState('');

  // Estado para controlar a exibição do botão "Salvar"
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const infoUsuario = await getData();
  
        if (infoUsuario) {
          setNome(infoUsuario.nome);
          setEmail(infoUsuario.email);
          setSenha('• • • • • • • •');
          setTelefoneEmergencia(infoUsuario.contatoEmergencia);
        }
      } catch (e) {
        console.log('Erro ao ler informacoes do usuario:', e); 
      }

    };

    fetchUsuario();
  }, []);

  // Função para adicionar um novo contato de emergência
  const adicionarContatoEmergencia = () => {
    if (contatosEmergencia.length < 2) {
      setModalVisible(true);
    } else {
      Alert.alert('Aviso', 'O número limite de contatos de emergência já foi atingido.');
    }
  };

  // Função para salvar o novo contato de emergência
  const salvarContatoEmergencia = () => {
    if (novoContatoNome.trim() === '' || novoContatoTelefone.trim() === '') {
      console.log(contatosEmergencia);
      Alert.alert('Erro', 'Por favor, preencha os campos de nome e telefone.');
      return;
    }

    // const maskedTelefone = novoContatoTelefone.replace(/(\d{4})(\d{4})/, '****$2');
    // setContatosEmergencia([...contatosEmergencia, { nome: novoContatoNome, telefone: maskedTelefone, isEditing: false }]);
    // setModalVisible(false);
    // setNovoContatoNome('');
    // setNovoContatoTelefone('');
    // setShowSaveButton(true);
  };

  // Função para deletar um contato de emergência com restrição de um contato mínimo
  const deletarContatoEmergencia = (index) => {
    if (contatosEmergencia.length === 0 && index === 0) {
      Alert.alert('Aviso', 'Você precisa ter pelo menos um contato de emergência salvo.');
    } else {
      Alert.alert(
        'Excluir Contato',
        'Você tem certeza que deseja excluir este contato?',
        [
          { text: 'Não', style: 'cancel' },
          { 
            text: 'Sim', 
            onPress: () => {
              const novosContatos = [...contatosEmergencia];
              if (index === 0) {
                setNomeEmergencia('');
                setTelefoneEmergencia('');
              } else {
                novosContatos.splice(index - 1, 1);
              }
              setContatosEmergencia(novosContatos);
              setShowSaveButton(true);
            }
          },
        ]
      );
    }
  };

  // Função para monitorar as alterações dos campos e ativar o botão "Salvar"
  const handleFieldChange = (value, fieldSetter) => {
    fieldSetter(value);
    setShowSaveButton(true);
  };

  // Função para salvar as alterações dos campos do perfil
  const salvarAlteracoes = () => {
    setEditNome(false);
    setEditNomeEmergencia(false);
    setEditTelefoneEmergencia(false);
    setShowSaveButton(false);
    setEditEmail(false);
    Alert.alert('Sucesso', 'Alterações salvas com sucesso!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Ícone de perfil */}
      <Ionicons name="person-outline" size={100} color="#8DBF4D" style={styles.profileIcon} />

      <Text style={styles.sectionTitle}>Informações do Perfil</Text>

      {/* Campo Nome */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={(value) => handleFieldChange(value, setNome)}
          placeholder="Nome"
          editable={editNome}
        />
        <TouchableOpacity onPress={() => setEditNome(true)}>
          <MaterialIcons name="edit" size={24} color="#8DBF4D" />
        </TouchableOpacity>
      </View>

      {/* Campo Email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(value) => handleFieldChange(value, setEmail)}
          placeholder="E-mail"
          editable={editEmail} 
        />
        <TouchableOpacity onPress={() => setEditEmail(true)}>
          <MaterialIcons name="edit" size={24} color="#8DBF4D" />
        </TouchableOpacity>
      </View>

      {/* Campo Senha */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={senha}
          placeholder="Senha"
          editable={false} // Não é editável diretamente
        />
        <TouchableOpacity onPress={() => navigation.navigate('TrocaSenha')}>
          <MaterialIcons name="edit" size={24} color="#8DBF4D" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Contato de Emergência</Text>

      {/* Primeiro contato de emergência */}
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nomeEmergencia}
            onChangeText={(value) => handleFieldChange(value, setNomeEmergencia)}
            placeholder="Nome do Contato de Emergência"
            editable={editNomeEmergencia}
          />
          <TouchableOpacity onPress={() => deletarContatoEmergencia(0)}>
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditNomeEmergencia(true)}>
            <MaterialIcons name="edit" size={24} color="#8DBF4D" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={telefoneEmergencia}
            onChangeText={(value) => handleFieldChange(value, setTelefoneEmergencia)}
            placeholder="Telefone do Contato de Emergência"
            editable={editTelefoneEmergencia}
          />
          <TouchableOpacity onPress={() => setEditTelefoneEmergencia(true)}>
            <MaterialIcons name="edit" size={24} color="#8DBF4D" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Renderizar contatos adicionais */}
      {contatosEmergencia.map((contato, index) => (
        <View key={index + 1}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={contato.nome}
              onChangeText={(value) => {
                const novosContatos = [...contatosEmergencia];
                novosContatos[index].nome = value;
                setContatosEmergencia(novosContatos);
                setShowSaveButton(true);
              }}
              placeholder="Nome"
              editable={contato.isEditing}
            />
            <TouchableOpacity onPress={() => deletarContatoEmergencia(index + 1)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              const novosContatos = [...contatosEmergencia];
              novosContatos[index].isEditing = true;
              setContatosEmergencia(novosContatos);
              setShowSaveButton(true);
            }}>
              <MaterialIcons name="edit" size={24} color="#8DBF4D" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={contato.telefone}
              onChangeText={(value) => {
                const novosContatos = [...contatosEmergencia];
                novosContatos[index].telefone = value;
                setContatosEmergencia(novosContatos);
                setShowSaveButton(true);
              }}
              placeholder="Telefone"
              editable={contato.isEditing}
            />
          </View>
        </View>
      ))}

      {/* Botão de adicionar novo contato */}
      <TouchableOpacity onPress={adicionarContatoEmergencia} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Novo Contato de Emergência</Text>
      </TouchableOpacity>

      {/* Modal para adicionar novo contato */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Contato de Emergência</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome do Contato"
              value={novoContatoNome}
              onChangeText={setNovoContatoNome}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Telefone"
              value={novoContatoTelefone}
              onChangeText={setNovoContatoTelefone}
              keyboardType="phone-pad"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={salvarContatoEmergencia} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Botão de salvar alterações gerais */}
      {showSaveButton && (
        <TouchableOpacity onPress={salvarAlteracoes} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFF',
  },
  profileIcon: {
    marginBottom: 20,
    marginTop:60,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8DBF4D',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8DBF4D',
    borderRadius: 10,
    padding: 10,
    width: '90%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#8DBF4D',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8DBF4D',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#8DBF4D',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#8DBF4D',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#8DBF4D',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Perfil;
