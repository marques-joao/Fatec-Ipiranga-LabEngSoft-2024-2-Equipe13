import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // Estilização da tela principal (Agenda)
  container: { 
    flex: 1, 
    paddingHorizontal: width * 0.05,  // Padding proporcional à largura
    paddingTop: height * 0.05,  // Padding superior proporcional à altura
    backgroundColor: '#f2f2f2',  // Fundo claro
  },
  titleContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: height * 0.03,  // Margem inferior ajustada
    marginTop: height * 0.02, 
  },
  titleImage: { 
    width: width * 0.15,  // Proporcional à largura
    height: width * 0.15, 
  },
  titleText: { 
    fontSize: width * 0.07,  // Proporcional à largura
    fontWeight: 'bold', 
    color: '#8DBF4D',
    marginLeft: 10,  // Espaço entre o ícone e o texto
  },
  calendar: { 
    width: width * 0.9,  // Calendário centralizado e proporcional à tela
    alignSelf: 'center',
    marginBottom: height * 0.02,  // Margem inferior ajustada
  },
  selectedDayContainer: {
    backgroundColor: '#8DBF4D', 
    padding: height * 0.01,  // Proporcional à altura
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  selectedDayText: { 
    color: 'white', 
    fontSize: width * 0.045,  // Tamanho de fonte proporcional
    fontWeight: 'bold' 
  },
  addButton: {
    backgroundColor: '#8DBF4D',
    padding: height * 0.02,  // Padding proporcional
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: height * 0.02,  // Margem vertical ajustada
  },
  addButtonText: {
    color: 'white',
    fontSize: width * 0.045,  // Tamanho de fonte proporcional
    fontWeight: 'bold',
  },

  // Estilização do Modal de Eventos (com ajustes)
  modalContainer: { 
    justifyContent: 'center', 
    backgroundColor: '#8DBF4D',  // Fundo verde para o modal
    padding: width * 0.04,  // Diminui o padding para melhor ajuste em telas pequenas
    borderRadius: 10,
    width: width * 0.90,  // Proporcional à largura da tela (reduzido)
    height: height * 0.92,
    marginTop: height * 0.03,  // Ajusta a margem superior
    alignSelf: 'center',
  },
  modalTitle: { 
    fontSize: width * 0.078,  // Tamanho de fonte menor
    color: '#fff', 
    textAlign: 'center', 
    marginBottom: height * 0.028,  // Ajusta a margem inferior
    fontWeight: 'bold',  // Negrito para o título
  },
  input: { 
    backgroundColor: '#fff', 
    padding: height * 0.012,  // Reduz o padding dos inputs
    marginBottom: height * 0.008,  // Margem inferior ajustada
    borderRadius: 5, 
    fontSize: width * 0.038,  // Tamanho de fonte ajustado
  },
  inputLabel: { 
    fontSize: width * 0.04,  // Tamanho de fonte ajustado
    color: '#fff', 
    marginBottom: height * 0.008 
    
  },
  picker: { 
    backgroundColor: '#fff', 
    borderRadius: 5, 
    marginBottom: height * 0.020,  // Margem inferior ajustada
    width: '100%',
    paddingHorizontal: 8,  // Padding ajustado para o Picker
  },
  saveButton: { 
    backgroundColor: '#fff', 
    padding: height * 0.014,  // Padding ajustado
    borderRadius: 10, 
    marginTop: height * 0.004 
  },
  saveButtonText: { 
    color: '#8DBF4D', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: width * 0.04,  // Tamanho de fonte ajustado
  },
  deleteButton: { 
    backgroundColor: '#722F37', 
    padding: height * 0.014,  // Padding ajustado
    borderRadius: 10, 
    marginTop: height * 0.008 
  },
  deleteButtonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: width * 0.04,  // Tamanho de fonte ajustado
  },
  cancelButton: { 
    backgroundColor: '#722F37',  // Cor do botão Cancelar
    padding: height * 0.014,  // Padding ajustado
    borderRadius: 10, 
    marginTop: height * 0.008 
  },
  cancelButtonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: width * 0.04,  // Tamanho de fonte ajustado
  },

  // Estilização dos Eventos Criados
  eventBlock: {
    padding: height * 0.012,  // Ajusta o padding para o bloco de evento
    borderRadius: 10,
    marginVertical: height * 0.008,  // Ajusta a margem entre os eventos
    backgroundColor: '#fff',  // Fundo branco
    elevation: 3,  // Sombras para elevação
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  eventText: {
    color: '#fff',  // Cor do texto do evento
    fontWeight: 'bold',
    fontSize: width * 0.038,  // Tamanho de fonte ajustado
  },
  eventTimeText: {
    fontSize: width * 0.035,  // Tamanho de fonte ajustado para o horário
    color: '#666',  // Cor mais clara para o horário
  },
});
