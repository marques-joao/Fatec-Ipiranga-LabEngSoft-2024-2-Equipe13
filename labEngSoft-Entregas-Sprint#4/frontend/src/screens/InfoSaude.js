import React, { useState } from 'react';
import { ScrollView, Text, Image, StyleSheet } from 'react-native';
import { StyledContainer, StyledTextInput, StyledInputLabel, Line } from './../components/styles';

const InfoSaude = ({ navigation, route }) => {
  const {
    tipoSanguineo = 'A+',
    alergias = ['Lactose, Ovo'],
    doencas = ['Diabetes Tipo 1'],
    oxigenacao = '98',
    batimento = '87',
    // acionamentoSOS = { data: '', motivo: '' },
    ist = ['HPV'],
    medicamentos = 'Losartana 50mg'
  } = route.params || {};

  const [dataAcionamentoSOS, setDataAcionamentoSOS] = useState('');
  const [motivoAcionamentoSOS, setmotivoAcionamentoSOS] = useState('');

  return (
    <StyledContainer>
      <ScrollView>
        <Text style={styles.formTitle}>Informações de Saúde</Text>
        <Image source={require('../assets/DadosSaude.png')} style={styles.image} />

        {/* <StyledInputLabel style={styles.questionText}>Tipo Sanguíneo:</StyledInputLabel>
        <Text style={styles.infoText}>{tipoSanguineo}</Text> */}

        <StyledInputLabel style={styles.questionText}>Tipo Sanguíneo:</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={tipoSanguineo}
          editable={false}
          style={styles.textArea}
        />

        <StyledInputLabel style={styles.questionText}>Alergias:</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={alergias.join(', ')}
          editable={false}
          style={styles.textArea}
        />

        <StyledInputLabel style={styles.questionText}>Doenças:</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={doencas.join(', ')}
          editable={false}
          style={styles.textArea}
        />

        {/* <StyledInputLabel style={styles.questionText}>Oxigenação Sanguínea (%):</StyledInputLabel>
        <Text style={styles.infoText}>{oxigenacao}</Text> */}

        <StyledInputLabel style={styles.questionText}>Oxigenação Sanguínea (%):</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={oxigenacao}
          editable={false}
          style={styles.textArea}
        />

        {/* <StyledInputLabel style={styles.questionText}>Batimento Cardíaco (BPM):</StyledInputLabel>
        <Text style={styles.infoText}>{batimento}</Text> */}

        <StyledInputLabel style={styles.questionText}>Batimento Cardíaco (BPM):</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={batimento}
          editable={false}
          style={styles.textArea}
        />

        <StyledInputLabel style={styles.questionText}>IST:</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={ist.join(', ')}
          editable={false}
          style={styles.textArea}
        />

        <StyledInputLabel style={styles.questionText}>Medicamentos Tomados:</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={medicamentos}
          editable={false}
          style={styles.textArea}
        />

        <StyledInputLabel style={[styles.questionText, styles.highlightedSection]}>Acionamento do SOS</StyledInputLabel>
        {/* <Text style={styles.sosText}>Último acionamento: {acionamentoSOS.data}</Text>
        <Text style={styles.sosText}>Motivo: {acionamentoSOS.motivo}</Text> */}
        <StyledTextInput
          placeholder="Digite a data do último acionamento"
          multiline={true}
          value={dataAcionamentoSOS}
          onChangeText={setDataAcionamentoSOS}
        />

        <StyledTextInput
          placeholder="Digite o motivo do último acionamento"
          multiline={true}
          value={motivoAcionamentoSOS}
          onChangeText={setmotivoAcionamentoSOS}
        />

        <Line />
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
  infoText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#e0f7e9',
    borderRadius: 8
  },
  textArea: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0f7e9',
    marginBottom: 10
  },
  highlightedSection: {
    padding: 1,
    borderRadius: 8,
  },
  sosText: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#e0f7e9',
  }
});

export default InfoSaude;
