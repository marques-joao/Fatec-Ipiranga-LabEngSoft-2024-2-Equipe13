import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const Acessibilidade = () => {
  const [fontSize, setFontSize] = useState(16); // Tamanho padrão da fonte
  const [isBold, setIsBold] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Função para definir o tamanho da fonte com limites
  const handleFontSizeChange = (value) => {
    const clampedValue = Math.min(Math.max(value, 12), 20);
    setFontSize(clampedValue);
    setHasChanges(true); // Marca como alterado
  };

  // Função para atualizar o estado de negrito
  const handleBoldChange = (value) => {
    setIsBold(value);
    setHasChanges(true); // Marca como alterado
  };

  // Função para salvar as configurações
  const saveSettings = () => {
    setHasChanges(false);
    alert("Configurações salvas!");
  };

  return (
    <View style={styles.container}>
      {/* Ícone de acessibilidade e título */}
      <View style={styles.header}>
        <Ionicons name="accessibility-outline" size={85} color="#8DBF4D" style={styles.icon} />
        <Text style={styles.screenTitle}>Acessibilidade</Text>
      </View>

      {/* Pré-visualização */}
      <View style={styles.previewContainer}>
        <Text style={[styles.previewText, { fontSize: fontSize, fontWeight: isBold ? 'bold' : 'normal' }]}>
          Pré-visualização
        </Text>
      </View>

      {/* Controle de Tamanho da Fonte */}
      <Text style={styles.label}>Tamanho da fonte</Text>
      <View style={styles.controlRow}>
        <TouchableOpacity onPress={() => handleFontSizeChange(fontSize - 2)}>
          <Ionicons name="remove-circle-outline" size={35} color="#8DBF4D" />
        </TouchableOpacity>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={20}
          step={2}
          value={fontSize}
          onValueChange={handleFontSizeChange}
          minimumTrackTintColor="#8DBF4D"
          thumbTintColor="#8DBF4D" // Cor da bolinha
        />
        <TouchableOpacity onPress={() => handleFontSizeChange(fontSize + 2)}>
          <Ionicons name="add-circle-outline" size={35} color="#8DBF4D" />
        </TouchableOpacity>
      </View>

      {/* Negrito */}
      <View style={styles.controlRow}>
        <Text style={styles.label}>Negrito</Text>
        <Switch
          value={isBold}
          onValueChange={handleBoldChange}
          trackColor={{ false: '#767577', true: '#8DBF4D' }} // Cor do fundo do switch
          thumbColor={isBold ? '#8DBF4D' : '#f4f3f4'} // Cor do botão circular
        />
      </View>

      {/* Botão para salvar configurações, aparece apenas se houver mudanças */}
      {hasChanges && (
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity onPress={saveSettings} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30, // Espaço para descer os componentes
  },
  icon: {
    marginBottom: 25,
    marginTop: 48,
  },
  screenTitle: {
    fontSize: 36,
    color: '#8DBF4D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  previewContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#8DBF4D',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  previewText: {
    color: '#000000',
  },
  label: {
    fontSize: 18,
    color: '#000000',
    marginVertical: 10,
    textAlign: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  saveButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#8DBF4D',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Acessibilidade;
