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
import axios from 'axios';

const Perfil = ({ navigation }) => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeEmergencia, setNomeEmergencia] = useState('');
  const [telefoneEmergencia, setTelefoneEmergencia] = useState('');

  const [editNome, setEditNome] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editNomeEmergencia, setEditNomeEmergencia] = useState(false);
  const [editTelefoneEmergencia, setEditTelefoneEmergencia] = useState(false);

  const [contatosEmergencia, setContatosEmergencia] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [novoContatoNome, setNovoContatoNome] = useState('');
  const [novoContatoTelefone, setNovoContatoTelefone] = useState('');

  const [showSaveButton, setShowSaveButton] = useState(false);

  const fetchUsuario = async () => {
    try {
      const infoUsuario = await getData();
      const idUsuario = infoUsuario.idUsuario;

      if (idUsuario) {
        const url = `http://192.168.15.117:8080/usuarios/${idUsuario}`;
        const response = await axios.get(url)
        
        const dadosUsuario = response.data;
        console.log(dadosUsuario)
        setNome(dadosUsuario.nome);
        setEmail(dadosUsuario.email);
        setSenha(dadosUsuario.senha);
        setTelefoneEmergencia(dadosUsuario.contatoEmergencia);
        setNomeEmergencia(dadosUsuario.nomeContatoEmergencia);
      }
    } catch (e) {
      console.log('Erro ao ler informacoes do usuario:', e); 
    }

  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const adicionarContatoEmergencia = () => {
    if (contatosEmergencia.length < 2) {
      setModalVisible(true);
    } else {
      Alert.alert('Aviso', 'O número limite de contatos de emergência já foi atingido.');
    }
  };

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

  const handleFieldChange = (value, fieldSetter) => {
    fieldSetter(value);
    setShowSaveButton(true);
  };

  const salvarAlteracoes = async () => {

    try {
      const infoUsuario = await getData();
      const idUsuario = infoUsuario.idUsuario;
  
      if (idUsuario) {
        const url = `http://192.168.15.117:8080/usuarios/atualizar/${idUsuario}`;
  
        const dadosUsuario = {
          nomeCompleto: nome,
          email: email,
          senha: senha,
          contatoEmergencia: telefoneEmergencia,
          nomeContatoEmergencia: nomeEmergencia
        }
    
        console.log(dadosUsuario);

        const response = await axios.put(url, dadosUsuario);
        console.log('Dados atualizados com sucesso!', response.data);

        fetchUsuario();
  
        setEditNome(false);
        setEditNomeEmergencia(false);
        setEditTelefoneEmergencia(false);
        setShowSaveButton(false);
        setEditEmail(false);

        Alert.alert('Sucesso', 'Alterações salvas com sucesso!');

      } else {
        console.log('Usuário não encontrado!');
      }

      
    } catch (e) {
      console.log('Erro ao ler informacoes do usuario:', e); 
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="person-outline" size={100} color="#8DBF4D" style={styles.profileIcon} />

      <Text style={styles.sectionTitle}>Informações do Perfil</Text>

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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={senha}
          placeholder="Senha"
          secureTextEntry={true}
          editable={false} 
        />
        <TouchableOpacity onPress={() => navigation.navigate('TrocaSenha')}>
          <MaterialIcons name="edit" size={24} color="#8DBF4D" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Contato de Emergência</Text>

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

      <TouchableOpacity onPress={adicionarContatoEmergencia} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Novo Contato de Emergência</Text>
      </TouchableOpacity>

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
