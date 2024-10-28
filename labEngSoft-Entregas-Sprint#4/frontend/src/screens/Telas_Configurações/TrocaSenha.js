import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TrocaSenha = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const passwordRequirements = {
    uppercase: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    length: newPassword.length >= 6,
  };

  const isPasswordValid = passwordRequirements.uppercase && passwordRequirements.number && passwordRequirements.length;
  const arePasswordsMatching = newPassword === confirmPassword;

  const handleUpdatePassword = () => {
    if (oldPassword && newPassword && arePasswordsMatching) {
      Alert.alert('Senha atualizada com sucesso!');
    } else {
      Alert.alert('Por favor, preencha todas as informações corretamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho com ícone e título */}
      <View style={styles.header}>
        <MaterialIcons name="lock" size={64} color="#8DBF4D" />
        <Text style={styles.title}>Troca de Senha</Text>
      </View>

      {/* Conteúdo rolável abaixo do cabeçalho */}
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha Antiga"
            secureTextEntry={!showOldPassword}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
            <MaterialIcons name={showOldPassword ? 'visibility' : 'visibility-off'} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            <MaterialIcons name={showNewPassword ? 'visibility' : 'visibility-off'} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.requirementsContainer}>
          <Text style={[styles.requirementText, passwordRequirements.uppercase ? styles.valid : styles.invalid]}>
            • Pelo menos uma letra maiúscula
          </Text>
          <Text style={[styles.requirementText, passwordRequirements.number ? styles.valid : styles.invalid]}>
            • Pelo menos um número
          </Text>
          <Text style={[styles.requirementText, passwordRequirements.length ? styles.valid : styles.invalid]}>
            • Pelo menos 6 caracteres
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Repetir Senha"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <MaterialIcons name={showConfirmPassword ? 'visibility' : 'visibility-off'} size={24} />
          </TouchableOpacity>
        </View>

        {!arePasswordsMatching && confirmPassword.length > 0 && (
          <Text style={styles.errorText}>As senhas não coincidem.</Text>
        )}

        <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)} style={styles.termsContainer}>
          <MaterialIcons name={termsAccepted ? 'check-box' : 'check-box-outline-blank'} size={24} color={termsAccepted ? 'green' : 'gray'} />
          <Text style={[styles.termsText, termsAccepted ? { color: 'green' } : { color: 'gray' }]}>
            Estou ciente da troca de senha e me responsabilizo por essa ação.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, !(oldPassword && isPasswordValid && arePasswordsMatching && termsAccepted) && styles.disabledButton]} 
          onPress={handleUpdatePassword} 
          disabled={!(oldPassword && isPasswordValid && arePasswordsMatching && termsAccepted)}
        >
          <Text style={styles.buttonText}>Atualizar Senha</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#8DBF4D',
    marginTop: 15,
    marginBottom: 25,
  },
  innerContainer: {
    flexGrow: 1,
    padding: 15,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8DBF4D',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  requirementsContainer: {
    marginBottom: 15,
  },
  requirementText: {
    fontSize: 14,
    lineHeight: 18,
  },
  valid: {
    color: 'green',
  },
  invalid: {
    color: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 10,
    paddingRight: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#8DBF4D',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TrocaSenha;
