import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StyledContainer, InnerContainer, FormTitleContent, StyledButton, ButtonText } from './styles';
import { Calendar } from 'react-native-calendars'; // Pacote de calendário para Expo

const Agenda = () => {
  const [selectedDay, setSelectedDay] = useState(''); // Estado para armazenar o dia selecionado
  const [events, setEvents] = useState({
    '2024-07-22': [
      {
        time: '13:00',
        title: 'Consulta (Ortopedista) - Dr. Marcelo Pereira Souza / Hospital Cruz Azul - Cambuci',
      },
    ],
    // Outros eventos podem ser adicionados aqui
  });

  return (
    <StyledContainer>
      <InnerContainer>
        {/* Título da página */}
        <FormTitleContent>Agenda</FormTitleContent>

        {/* Calendário */}
        <Calendar
          onDayPress={(day) => {
            setSelectedDay(day.dateString); // Definir o dia selecionado
          }}
          markedDates={{
            [selectedDay]: {
              selected: true,
              marked: true,
              selectedColor: '#8DBF4D', // Cor de seleção
            },
            '2024-07-22': { marked: true, dotColor: '#DB4437' }, // Exemplo de evento no dia 22
            // Adicionar mais datas marcadas conforme necessário
          }}
          theme={{
            arrowColor: '#8DBF4D', // Cor das setas
            todayTextColor: '#8DBF4D', // Cor do dia de hoje
            textSectionTitleColor: '#4285F4', // Cor do título de seção
            selectedDayBackgroundColor: '#6A8F39', // Cor de fundo do dia selecionado
          }}
        />

        {/* Detalhes do dia selecionado */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            {selectedDay ? `Eventos para ${selectedDay}` : 'Selecione um dia'}
          </Text>

          <ScrollView>
            {events[selectedDay] ? (
              events[selectedDay].map((event, index) => (
                <View key={index} style={{ marginVertical: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{event.time}</Text>
                  <Text>{event.title}</Text>
                </View>
              ))
            ) : (
              <Text>Sem eventos para este dia</Text>
            )}
          </ScrollView>
        </View>

        {/* Botão de adicionar eventos */}
        <StyledButton>
          <ButtonText>Adicionar Evento</ButtonText>
        </StyledButton>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Agenda;
