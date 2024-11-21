import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, StyleSheet } from 'react-native';
import { getData } from '../utils/storageUtils';
import { StyledContainer, StyledTextInput, StyledInputLabel, Line } from './../components/styles';
import axios from 'axios';

const InfoSaude = () => {

  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [alergias, setAlergias] = useState(['']);
  const [doencas, setDoencas] = useState(['']);
  const [oxigenacao, setOxigenacao] = useState('');
  const [batimento, setBatimento] = useState('');
  const [ist, setIst] = useState(['']);
  const [medicamentos, setMedicamentos] = useState(['']);
  const [dataAcionamentoSOS, setDataAcionamentoSOS] = useState('');
  const [motivoAcionamentoSOS, setmotivoAcionamentoSOS] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const infoUsuario = await getData();
  
        if (infoUsuario && infoUsuario.idUsuario) {
          const idUsuario = infoUsuario.idUsuario;
          const url = `http://192.168.15.117:8080/saude/usuarios/${idUsuario}`;
          
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
            setMedicamentos(usuario.medicamento?.medicamentos ?? []); 
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
          value={medicamentos.join(', ')}
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
