import React, { useState } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  StyledContainer,
  StyledTextInput,
  StyledButton,
  ButtonText,
  StyledInputLabel,
  Line
} from './../components/styles';

import axios from 'axios';

const DadosSaude = ({ navigation, route }) => {
  // const { idUsuario } = route.params;
  const idUsuario = 1;

  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [alergias, setAlergias] = useState([]);
  const [doencas, setDoencas] = useState([]);
  const [oxigenacao, setOxigenacao] = useState('');
  const [batimento, setBatimento] = useState('');
  const [acionamentoSOS, setAcionamentoSOS] = useState({
    data: '07/10/2024',
    motivo: 'Queda de pressão'
  });
  const [ist, setIst] = useState([]);
  const [medicamentos, setMedicamentos] = useState('');

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

  const addSelection = (selectedOptions, setSelectedOptions, option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSave = async () => {

    // const url = `http://192.168.15.117:8080/saude/${idUsuario}`;

    // const dadosSaude = {
    //   tipoSanguineo,
    //   alergias,
    //   doencas,
    //   oxigenacao,
    //   batimento,
    //   ist,
    //   medicamentos
    // };

    // try {
    //   const response = await axios.post(url, dadosSaude);

    //   console.log('Dados salvos com sucesso!', response.data);
    // } catch (error) {
    //   console.log('Erro ao salvar os dados de saúde:', error);
    // }

    navigation.navigate('Menu');

  };

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
        <StyledTextInput
          multiline={true}
          value={alergias.join(', ')}
          editable={false}
        />

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
        <StyledTextInput
          multiline={true}
          value={doencas.join(', ')}
          editable={false}
        />

        <StyledInputLabel style={styles.questionText}>Oxigenação Sanguínea (%)</StyledInputLabel>
        <TextInput
          placeholder="Digite a oxigenação sanguínea"
          keyboardType="numeric"
          value={oxigenacao}
          onChangeText={(text) => setOxigenacao(text.slice(0, 3))} // Limitar a 3 caracteres
          style={styles.textInput}
        />

        <StyledInputLabel style={styles.questionText}>Batimento Cardíaco (BPM)</StyledInputLabel>
        <TextInput
          placeholder="Digite o batimento cardíaco"
          keyboardType="numeric"
          value={batimento}
          onChangeText={(text) => setBatimento(text.slice(0, 3))} // Limitar a 3 caracteres
          style={styles.textInput}
        />

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
        <StyledTextInput
          multiline={true}
          value={ist.join(', ')}
          editable={false}
          />

        <StyledInputLabel style={styles.questionText}>Medicamentos Tomados</StyledInputLabel>
        <StyledTextInput
          placeholder="Digite os medicamentos e dosagens separados por vírgula"
          multiline={true}
          value={medicamentos}
          onChangeText={setMedicamentos}
        />

          {/* <StyledInputLabel style={[styles.questionText, styles.highlightedSection]}>Acionamento do SOS</StyledInputLabel>
          <Text style={styles.sosText}>Último acionamento: {acionamentoSOS.data}</Text>
          <Text style={styles.sosText}>Motivo: {acionamentoSOS.motivo}</Text>
  
          <View style={styles.extraSpace} /> */}

        <Line />

        <StyledButton onPress={handleSave}>
          <ButtonText>Salvar Dados</ButtonText>
        </StyledButton>
      </ScrollView>
    </StyledContainer>
  );
};

// Estilos adicionais
const styles = StyleSheet.create({
  formTitle: {
    fontSize: 36, // Aumentar ainda mais o tamanho da fonte
    color: '#8DBF4D',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center' // Centralizar o título
  },
  image: {
    width: '60%', // Diminuir mais o tamanho da imagem
    height: 120, // Altura ajustada
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center' // Centralizar a imagem
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
    backgroundColor: '#8DBF4D', // Fundo verde para o Picker
    borderRadius: 8,
    marginBottom: 10
  },
  picker: {
    color: 'white', // Texto branco dentro do Picker
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
