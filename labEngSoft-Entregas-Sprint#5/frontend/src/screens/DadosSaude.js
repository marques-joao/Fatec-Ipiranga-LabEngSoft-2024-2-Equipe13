import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import {
  StyledContainer,
  StyledTextInput,
  StyledButton,
  ButtonText,
  StyledInputLabel,
  Line
} from './../components/styles';
import { getData } from '../utils/storageUtils';

import axios from 'axios';

const DadosSaude = ({ navigation }) => {

  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [alergias, setAlergias] = useState([]);
  const [doencas, setDoencas] = useState([]);
  const [oxigenacao, setOxigenacao] = useState('');
  const [batimento, setBatimento] = useState('');
  const [acionamentoSOS, setAcionamentoSOS] = useState('');
  const [dataAcionamentoSOS, setDataAcionamentoSOS] = useState('');
  const [ist, setIst] = useState([]);
  const [medicamentos, setMedicamentos] = useState('');

  const [editAlergias, setEditAlergias] = useState(false);
  const [editDoencas, setEditDoencas] = useState(false);
  const [editOxigenacao, setEditOxigenacao] = useState(false);
  const [editBatimento, setEditBatimento] = useState(false);
  const [editIst, setEditIst] = useState(false);
  const [editMedicamentos, setEditMedicamentos] = useState(false);

  const opcoesTipoSanguineo = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  const opcoesAlergias = [
    'Soja', 'Trigo', 'Ovo', 'Amendoim', 'Peixes e mariscos', 'Lactose', 'Analgésicos',
    'Antibióticos', 'Anti-inflamatórios', 'Anestésicos', 'Anticonvulsivantes',
    'Sedativo-hipnóticos', 'Urticária aquagênica', 'Urticária colinérgica',
    'Lucite', 'Poeira', 'Rinite', 'Sinusite', 'Asma', 'Não possuo alergias'
  ];
  const opcoesDoencas = [
    'Diabetes tipo 1', 'Diabetes tipo 2', 'Alzheimer', 'Hipertensão', 'AIDS', 
    'Câncer', 'Depressão', 'Transtorno de Ansiedade', 'AVC', 'Mal de Parkinson',
    'Colesterol Alto', 'Taquicardia', 'Não possuo doenças ou patologias'
  ];
  const opcoesIST = [
    'Herpes genital', 'Cancro mole (cancroide)', 'HPV', 'Doença Inflamatória Pélvica (DIP)', 
    'Donovanose', 'Gonorreia e infecção por Clamídia', 'Linfogranuloma venéreo (LGV)', 
    'Sífilis', 'Infecção pelo HTLV', 'Tricomoníase', 'Soropositivo', 'Não possuo IST'
  ];

  const opcoesMotivo = [
    'Queda', 'AVC', 'Dores Fortes no Peito', 'Ataque Cardíaco', 'Manifestação de Doença Crônica',
    'Manifestação de Alergia', 'Acidente Doméstico', 'Dificuldade para Respirar', 'Confusão Mental'
  ];

  const addSelection = (selectedOptions, setSelectedOptions, option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSave = async () => {
    try {
      const infoUsuario = await getData();
      const idUsuario = infoUsuario.idUsuario;

      if (idUsuario) {
        // const url = `http://192.168.15.117:8080/saude/${idUsuario}`;
        const url = `https://vitalcare-9331c2ed71f5.herokuapp.com/saude/${idUsuario}`;

        const listaMedicamentos = medicamentos.split(',').map(med => med.trim());

        const dadosSaude = {
          tipoSanguineo,
          alergias,
          doencas,
          oxigenacao,
          batimento,
          ist,
          medicamentos: listaMedicamentos
        };

        const response = await axios.post(url, dadosSaude);
        console.log('Dados de saúde salvos com sucesso!', response.data);
      } else {
        console.log('ID do usuário não encontrado');
      }
    } catch (error) {
        console.log('Erro ao adicionar dados de saúde:', error);
    }

    navigation.navigate('Menu');

  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const infoUsuario = await getData();
  
        if (infoUsuario && infoUsuario.idUsuario) {
          const idUsuario = infoUsuario.idUsuario;
          // const url = `http://192.168.15.117:8080/saude/usuarios/${idUsuario}`;
          const url = `https://vitalcare-9331c2ed71f5.herokuapp.com/saude/usuarios/${idUsuario}`;
          
          const response = await axios.get(url);
          
          const usuarioData = response.data; 
          
          if (Array.isArray(usuarioData) && usuarioData.length > 0) {
            const usuario = usuarioData[usuarioData.length - 1];
  
            setTipoSanguineo(usuario.tipoSanguineo ?? '');
            setAlergias(usuario.alergia?.alergias ?? []);
            setDoencas(usuario.doenca?.doencas ?? []); 
            setOxigenacao(usuario.oxigenacao ?? '');
            setBatimento(usuario.batimento ?? '');
            setIst(usuario.ist?.ists ?? []); 
            setMedicamentos(usuario.medicamento?.medicamentos?.join(', ') ?? '');
          } else {
            console.log('Nenhum dado encontrado para o usuário.');
          }
        }
      } catch (e) {
        console.log('Erro ao ler informacoes do usuario:', e);  
      }
    };
  
    fetchUsuario();
  }, []);

  return (
    <StyledContainer>
      <ScrollView>
        <Text style={styles.formTitle}>Dados de Saúde</Text>
        <Image source={require('../assets/DadosSaude.png')} style={styles.image} />

        <StyledInputLabel style={styles.questionText}>Qual seu tipo sanguíneo?</StyledInputLabel>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoSanguineo}
            onValueChange={(itemValue) => setTipoSanguineo(itemValue)}
            style={styles.picker}
            dropdownIconColor="white"
          >
            <Picker.Item label="Clique aqui para selecionar" value="" style={styles.pickerItem} />
            {opcoesTipoSanguineo.map((tipo, index) => (
              <Picker.Item key={index} label={tipo} value={tipo} />
            ))}
          </Picker>
        </View>

        <StyledInputLabel style={styles.questionText}>Tem alguma alergia?</StyledInputLabel>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue=""
            onValueChange={(itemValue) => addSelection(alergias, setAlergias, itemValue)}
            style={styles.picker}
            dropdownIconColor="white"
          >
            <Picker.Item label="Clique aqui para selecionar" value="" style={styles.pickerItem} />
            {opcoesAlergias.map((alergia, index) => (
              <Picker.Item key={index} label={alergia} value={alergia} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <StyledTextInput style={styles.inputChild}
            multiline={true}
            value={alergias.join(', ')}
            editable={editAlergias}
            onChangeText={(value) => setAlergias(value.split(',').map((item) => item.trim()))}
          />
          <TouchableOpacity style={styles.inputChild} onPress={() => setEditAlergias(!editAlergias)}>
            <MaterialIcons name="edit" size={24} color="#8DBF4D" />
          </TouchableOpacity>
        </View>

        <StyledInputLabel style={styles.questionText}>Histórico de Doença</StyledInputLabel>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue=""
            onValueChange={(itemValue) => addSelection(doencas, setDoencas, itemValue)}
            style={styles.picker}
            dropdownIconColor="white"
          >
            <Picker.Item label="Clique aqui para selecionar" value="" style={styles.pickerItem} />
            {opcoesDoencas.map((doenca, index) => (
              <Picker.Item key={index} label={doenca} value={doenca} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <StyledTextInput style={styles.inputChild}
            multiline={true}
            value={doencas.join(', ')}
            editable={editDoencas}
            onChangeText={(value) => setDoencas(value.split(',').map((item) => item.trim()))}
          />
          <TouchableOpacity style={styles.inputChild} onPress={() => setEditDoencas(!editDoencas)}>
            <MaterialIcons name="edit" size={24} color="#8DBF4D" />
          </TouchableOpacity>
        </View>

        <StyledInputLabel style={styles.questionText}>Oxigenação Sanguínea (%)</StyledInputLabel>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite a oxigenação sanguínea"
            keyboardType="numeric"
            value={oxigenacao}
            onChangeText={(text) => setOxigenacao(text.slice(0, 3))}
            style={[styles.textInput, styles.inputChild]}
            editable={editOxigenacao}
          />
          <TouchableOpacity style={styles.inputChild} onPress={() => setEditOxigenacao(!editOxigenacao)}>
            <MaterialIcons name="edit" size={24} color="#8DBF4D" />
          </TouchableOpacity>
        </View>

        <StyledInputLabel style={styles.questionText}>Batimento Cardíaco (BPM)</StyledInputLabel>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite o batimento cardíaco"
            keyboardType="numeric"
            value={batimento}
            onChangeText={(text) => setBatimento(text.slice(0, 3))}
            style={[styles.textInput, styles.inputChild]}
            editable={editBatimento}
          />
          <TouchableOpacity style={styles.inputChild} onPress={() => setEditBatimento(!editBatimento)}>
            <MaterialIcons name="edit" size={24} color="#8DBF4D" />
          </TouchableOpacity>
        </View>

        <StyledInputLabel style={styles.questionText}>IST</StyledInputLabel>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue=""
            onValueChange={(itemValue) => addSelection(ist, setIst, itemValue)}
            style={styles.picker}
            dropdownIconColor="white"
            >
            <Picker.Item label="Clique aqui para selecionar" value="" style={styles.pickerItem} />
            {opcoesIST.map((istItem, index) => (
              <Picker.Item key={index} label={istItem} value={istItem} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <StyledTextInput style={styles.inputChild}
            multiline={true}
            value={ist.join(', ')}
            editable={editIst}
            onChangeText={(value) => setIst(value.split(',').map((item) => item.trim()))}
          />
          <TouchableOpacity style={styles.inputChild} onPress={() => setEditIst(!editIst)}>
            <MaterialIcons name="edit" size={24} color="#8DBF4D" />
          </TouchableOpacity>
        </View>

        <StyledInputLabel style={styles.questionText}>Medicamentos Tomados</StyledInputLabel>
        <View style={styles.inputContainer}>
          <StyledTextInput style={styles.inputChild}
            placeholder="Digite os medicamentos e dosagens separados por vírgula"
            multiline={true}
            value={medicamentos}
            onChangeText={setMedicamentos}
            editable={editMedicamentos}
          />
          <TouchableOpacity style={styles.inputChild} onPress={() => setEditMedicamentos(!editMedicamentos)}>
            <MaterialIcons name="edit" size={24} color="#8DBF4D" />
          </TouchableOpacity>
        </View>

        <StyledInputLabel style={styles.questionText}>Acionamento do SOS</StyledInputLabel>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={acionamentoSOS}
            onValueChange={(itemValue) => setAcionamentoSOS(itemValue)}
            style={styles.picker}
            dropdownIconColor="white"
          >
          <Picker.Item label="Clique aqui para selecionar" value="" style={styles.pickerItem} />
            {opcoesMotivo.map((motivo, index) => (
              <Picker.Item key={index} label={motivo} value={motivo} />
            ))}
          </Picker>
        </View>
        <Text style={styles.sosText}>Último acionamento: {dataAcionamentoSOS}</Text>
        <Text style={styles.sosText}>Motivo: {acionamentoSOS}</Text>
        
          <View style={styles.extraSpace} />

        <Line />

        <StyledButton onPress={handleSave}>
          <ButtonText>Salvar Dados</ButtonText>
        </StyledButton>
      </ScrollView>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  formTitle: {
    fontSize: 36,
    color: '#8DBF4D',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputChild: {
    marginHorizontal: 4,
    width: '90%'
  },
  image: {
    width: '60%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center' 
  },
  questionText: {
    fontSize: 18,
    color: '#8DBF4D',
    fontWeight: 'bold',
    marginTop: 10
  },
  pickerItem: {
    fontSize: 14
  },
  pickerContainer: {
    backgroundColor: '#8DBF4D', 
    borderRadius: 8,
    marginBottom: 10
  },
  picker: {
    color: 'white', 
  },
  highlightedSection: {
    backgroundColor: '#e0f7e9',
    padding: 10,
    borderRadius: 8
  },
  sosText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5
  },
  extraSpace: {
    marginVertical: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  }
});

export default DadosSaude;
