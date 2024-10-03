import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { StyledContainer, StyledTextInput, StyledInputLabel, Line } from './../components/styles';

const InfoSaude = ({ route }) => {
  // Verificando se os parâmetros estão disponíveis antes de tentar usá-los
  const {
    tipoSanguineo = '',
    alergias = [],
    doencas = [],
    oxigenacao = '',
    batimento = '',
    acionamentoSOS = { data: '', motivo: '' },
    ist = [],
    medicamentos = ''
  } = route.params || {};

  return (
    <StyledContainer>
      <ScrollView>
        {/* Título e imagem */}
        <Text style={styles.formTitle}>Informações de Saúde</Text>
        <Image source={require('../assets/DadosSaude.png')} style={styles.image} />

        {/* Tipo Sanguíneo */}
        <StyledInputLabel style={styles.questionText}>Tipo Sanguíneo:</StyledInputLabel>
        <Text style={styles.infoText}>{tipoSanguineo}</Text>

        {/* Alergias */}
        <StyledInputLabel style={styles.questionText}>Alergias:</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={alergias.join(', ')}
          editable={false}
          style={styles.textArea}
        />

        {/* Doenças */}
        <StyledInputLabel style={styles.questionText}>Doenças:</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={doencas.join(', ')}
          editable={false}
          style={styles.textArea}
        />

        {/* Oxigenação Sanguínea */}
        <StyledInputLabel style={styles.questionText}>Oxigenação Sanguínea (%):</StyledInputLabel>
        <Text style={styles.infoText}>{oxigenacao}</Text>

        {/* Batimento Cardíaco */}
        <StyledInputLabel style={styles.questionText}>Batimento Cardíaco (BPM):</StyledInputLabel>
        <Text style={styles.infoText}>{batimento}</Text>

        {/* Acionamento do SOS */}
        <StyledInputLabel style={[styles.questionText, styles.highlightedSection]}>Acionamento do SOS</StyledInputLabel>
        <Text style={styles.sosText}>Último acionamento: {acionamentoSOS.data}</Text>
        <Text style={styles.sosText}>Motivo: {acionamentoSOS.motivo}</Text>

        {/* IST */}
        <StyledInputLabel style={styles.questionText}>IST:</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={ist.join(', ')}
          editable={false}
          style={styles.textArea}
        />

        {/* Medicamentos Tomados */}
        <StyledInputLabel style={styles.questionText}>Medicamentos Tomados:</StyledInputLabel>
        <StyledTextInput
          multiline={true}
          value={medicamentos}
          editable={false}
          style={styles.textArea}
        />

        <Line />
      </ScrollView>
    </StyledContainer>
  );
};

// Estilos adicionais
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
