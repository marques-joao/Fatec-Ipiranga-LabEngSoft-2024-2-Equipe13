import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import InfoThermsConditions from '../../components/InfoThermsConditions';
import InfoThermsPrivacy from '../../components/InfoThermsPrivacy';

const SobreAplicativo = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggleTerms = () => setShowTerms(!showTerms);
  const togglePrivacy = () => setShowPrivacy(!showPrivacy);
  const toggleContact = () => setShowContact(!showContact);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MaterialIcons name="info-outline" size={70} color="#000" style={styles.icon} />
      <Text style={styles.title}>Sobre o VitalCare</Text>

      <TouchableOpacity onPress={toggleTerms} style={styles.field}>
        <Text style={styles.fieldText}>Termos de Uso</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      {showTerms && <InfoThermsConditions />}

      <TouchableOpacity onPress={togglePrivacy} style={styles.field}>
        <Text style={styles.fieldText}>Política de Privacidade</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      {showPrivacy && <InfoThermsPrivacy />}

      <TouchableOpacity onPress={toggleContact} style={styles.field}>
        <Text style={styles.fieldText}>Contato</Text>
        <View style={styles.line} />
      </TouchableOpacity>
      {showContact && (
        <View style={styles.modal}>
          <Text>Contato: vitalcareapp@gmail.com</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 40, // Espaçamento superior
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  icon: {
    marginTop: 40,
    marginBottom: 10,
    color: '#8DBF4D',
  },
  title: {
    fontSize: 37,
    color: '#8DBF4D',
    fontWeight: 'bold',
    marginBottom: 35,
  },
  field: {
    width: '100%',
    alignItems: 'left',
    marginBottom: 10,
    paddingVertical: 10,
  },
  fieldText: {
    fontSize: 18,
    color: '#000',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#8DBF4D',
    marginTop: 5,
    marginBottom: 1,
  },
  modal: {
    width: '100%', // Largura do modal igual à linha
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 1,
    border: 5,
    shadow: 'black',
    border:'grayThree',
    shadowopacity: 0.25,
    shadowradius: 3.84,
    elevation: 5,
  },
});

export default SobreAplicativo;
