import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View, Text, Image, Modal, TouchableOpacity, TextInput, ScrollView, Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment'; // Moment.js para manipulação de datas
import styles from './../components/AgendaStyles'; // Estilização da Agenda

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
};
LocaleConfig.defaultLocale = 'pt-br';

let eventIdCounter = 1;  // ID incremental para eventos
let recurrenceIdCounter = 1;  // ID incremental para recorrências

const Agenda = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [events, setEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const [selectedReminder, setSelectedReminder] = useState('No horário do evento');
  const [selectedRecurrence, setSelectedRecurrence] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    setSelectedDay(today);
  }, []);

  const formatSelectedDay = (date) => {
    if (!date) return '';
    return moment(date).format('DD/MM/YYYY');
  };

  const onDayPress = useCallback((day) => {
    setSelectedDay(day.dateString);
  }, []);

  const openEventModal = useCallback((existingEvent = null) => {
    if (existingEvent) {
      setEventDetails(existingEvent);
      setSelectedColor(existingEvent.color || '');
    } else {
      setEventDetails({ hour: '', title: '', address: '', recurrence: '', description: '', reminder: selectedReminder });
      setSelectedColor('');
    }
    setModalVisible(true);
  }, [selectedReminder]);

  // Gera um ID único para eventos
  const generateEventId = useCallback(() => {
    return eventIdCounter++;
  }, []);

  // Gera um ID único para recorrências
  const generateRecurrenceId = useCallback(() => {
    return recurrenceIdCounter++;
  }, []);

  // Obtém a data original da recorrência (ou cria uma nova para eventos recém-criados)
  const getRecurrenceStartDate = useCallback((recurrenceId) => {
    for (let date in events) {
      const dayEvents = events[date];
      const recurrenceEvent = dayEvents.find(event => event.recurrenceId === recurrenceId);
      if (recurrenceEvent) {
        return recurrenceEvent.recurrenceStartDate || date;  // Usa a data salva ou a primeira ocorrência
      }
    }
    return selectedDay;  // Se não houver recorrência anterior, usa o dia atual
  }, [events, selectedDay]);

  const saveEvent = useCallback(() => {
    if (!eventDetails.title || !selectedColor || !eventDetails.hour) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    let updatedEvents = events[selectedDay] ? [...events[selectedDay]] : [];

    const newEvent = {
      ...eventDetails,
      id: eventDetails.id || generateEventId(),  // Gera ID único se o evento for novo
      color: selectedColor,
    };

    // Verifica se o evento já existe (para edição) ou se é novo (para ser adicionado)
    const existingEventIndex = updatedEvents.findIndex(event => event.id === newEvent.id);

    if (existingEventIndex > -1) {
      // Substitui o evento existente
      updatedEvents[existingEventIndex] = newEvent;
    } else {
      // Adiciona um novo evento
      updatedEvents.push(newEvent);
    }

    // Gerenciamento de recorrência
    if (eventDetails.recurrence) {
      const recurrenceId = eventDetails.recurrenceId || generateRecurrenceId();  // Gera ID para a recorrência
      const recurrenceStartDate = eventDetails.recurrenceStartDate || getRecurrenceStartDate(recurrenceId);  // Usa a data de origem da recorrência
      newEvent.recurrenceId = recurrenceId;
      newEvent.recurrenceStartDate = recurrenceStartDate;  // Salva a data de origem da recorrência

      // Remove eventos antigos da mesma recorrência (se houver)
      Object.keys(events).forEach(day => {
        const dayEvents = events[day]?.filter(event => event.recurrenceId !== recurrenceId) || [];
        setEvents(prevEvents => ({ ...prevEvents, [day]: dayEvents }));
      });

      // Cria eventos recorrentes baseados na data de origem
      const recurrenceMap = {
        '1 dia': 1,
        '1 semana': 7,
        '2 semanas': 14,
        '1 mês': 30,
        '1 ano': 365,
      };

      const recurrenceDays = recurrenceMap[eventDetails.recurrence];

      // Gera eventos para todos os dias de acordo com a recorrência escolhida, partindo da data original
      for (let i = 0; i < recurrenceDays; i++) {
        const newDate = moment(recurrenceStartDate).add(i, 'days').format('YYYY-MM-DD');
        let recurringEvents = events[newDate] ? [...events[newDate]] : [];
        // Remove qualquer evento antigo da mesma recorrência
        recurringEvents = recurringEvents.filter(event => event.recurrenceId !== recurrenceId);
        // Adiciona o evento recorrente para cada dia do intervalo
        recurringEvents.push({ ...newEvent, id: generateEventId(), recurrenceId, recurrenceStartDate });

        setEvents(prevEvents => ({ ...prevEvents, [newDate]: recurringEvents }));
      }
    }

    // Atualiza o dia selecionado com o novo ou editado evento
    setEvents(prevEvents => ({ ...prevEvents, [selectedDay]: updatedEvents }));

    setModalVisible(false); // Fecha o modal ao salvar
  }, [eventDetails, selectedDay, selectedColor, events, generateEventId, generateRecurrenceId, getRecurrenceStartDate]);

  const deleteEvent = useCallback((id) => {
    let updatedEvents = events[selectedDay]?.filter(event => event.id !== id) || [];
    setEvents({ ...events, [selectedDay]: updatedEvents });

    if (updatedEvents.length === 0) {
      const updatedMarkedDates = { ...events };
      delete updatedMarkedDates[selectedDay];
      setEvents(updatedMarkedDates);
    }

    setModalVisible(false);
  }, [events, selectedDay]);

  const deleteRecurringEvent = useCallback((id) => {
    const event = events[selectedDay]?.find(event => event.id === id);
    if (event?.recurrenceId) {
      Alert.alert(
        "Excluir Evento",
        "Deseja excluir apenas este evento ou toda a recorrência?",
        [
          { text: "Evento Atual", onPress: () => deleteEvent(id) },
          { text: "Excluir Recorrência", onPress: () => {
              const recurrenceId = event.recurrenceId;
              Object.keys(events).forEach((day) => {
                let updatedEvents = events[day]?.filter(event => event.recurrenceId !== recurrenceId) || [];
                setEvents(prevEvents => ({ ...prevEvents, [day]: updatedEvents }));
              });
              setModalVisible(false);
            }
          },
          { text: "Cancelar", style: "cancel" }
        ]
      );
    } else {
      deleteEvent(id);
    }
  }, [events, selectedDay, deleteEvent]);

  const onTimeChange = useCallback((event, selectedDate) => {
    const currentTime = selectedDate || selectedTime;
    setShowTimePicker(false);
    setSelectedTime(currentTime);
    setEventDetails({ ...eventDetails, hour: moment(currentTime).format('HH:mm') });
  }, [selectedTime, eventDetails]);

  const renderedEvents = useMemo(() => {
    // Ordena eventos pelo horário, caso exista mais de um no mesmo dia
    return events[selectedDay]?.sort((a, b) => moment(a.hour, 'HH:mm').diff(moment(b.hour, 'HH:mm')))
      .map((event) => (
        <TouchableOpacity key={event.id} onPress={() => openEventModal(event)}>
          <View style={[styles.eventBlock, { backgroundColor: event.color }]}>
            <Text style={styles.eventText}>
              {event.hour} - {event.title}: {event.description}
            </Text>
          </View>
        </TouchableOpacity>
    ));
  }, [events, selectedDay, openEventModal]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require('../assets/Agenda.png')} style={styles.titleImage} />
        <Text style={styles.titleText}>Agenda</Text>
      </View>

      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDay]: { 
            selected: true, 
            selectedColor: '#8DBF4D', // Garante que o círculo verde apareça sempre
          },
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = { 
              marked: events[date]?.length > 0, 
              dotColor: '#8DBF4D', 
              selected: selectedDay === date, // Garante que o dia selecionado seja destacado
              selectedColor: selectedDay === date ? '#8DBF4D' : undefined, // Aplica a cor somente no dia selecionado
            };
            return acc;
          }, {}),
        }}
        theme={{
          arrowColor: '#8DBF4D',
          selectedDayBackgroundColor: '#8DBF4D',
          todayTextColor: '#8DBF4D',
          monthTextColor: '#8DBF4D',
        }}
        style={styles.calendar}
      />

      <View style={styles.selectedDayContainer}>
        {selectedDay ? (
          <Text style={styles.selectedDayText}>{formatSelectedDay(selectedDay)}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => openEventModal()}>
        <Text style={styles.addButtonText}>Adicionar Evento</Text>
      </TouchableOpacity>

      <ScrollView style={styles.eventList}>
        {renderedEvents}
      </ScrollView>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Eventos</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do evento"
            value={eventDetails.title}
            onChangeText={(text) => setEventDetails({ ...eventDetails, title: text })}
          />

          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={styles.input}
          >
            <Text style={styles.timeInputText}>
              {eventDetails.hour || 'Horário do Evento'}
            </Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime || new Date()}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={onTimeChange}
              style={{ height: 150 }}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={eventDetails.address}
            onChangeText={(text) => setEventDetails({ ...eventDetails, address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={eventDetails.description}
            onChangeText={(text) => setEventDetails({ ...eventDetails, description: text })}
          />

          <Text style={styles.inputLabel}>Lembrete</Text>
          <Picker
            selectedValue={selectedReminder}
            onValueChange={(itemValue) => setSelectedReminder(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="No horário do evento" value="No horário do evento" />
            <Picker.Item label="5 minutos antes" value="5 minutos antes" />
            <Picker.Item label="10 minutos antes" value="10 minutos antes" />
            <Picker.Item label="15 minutos antes" value="15 minutos antes" />
            <Picker.Item label="1 hora antes" value="1 hora antes" />
            <Picker.Item label="1 dia antes" value="1 dia antes" />
          </Picker>

          <Text style={styles.inputLabel}>Recorrência</Text>
          <Picker
            selectedValue={selectedRecurrence}
            onValueChange={(itemValue) => {
              setEventDetails({ ...eventDetails, recurrence: itemValue, isRecurrenceEdited: true });
              setSelectedRecurrence(itemValue);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Sem recorrência" value="" />
            <Picker.Item label="1 dia" value="1 dia" />
            <Picker.Item label="1 semana" value="1 semana" />
            <Picker.Item label="2 semanas" value="2 semanas" />
            <Picker.Item label="1 mês" value="1 mês" />
            <Picker.Item label="1 ano" value="1 ano" />
          </Picker>

          <Text style={styles.inputLabel}>Classificação do Evento</Text>
          <Picker
            selectedValue={selectedColor}
            onValueChange={(itemValue) => {
              setEventDetails({ ...eventDetails, color: itemValue });
              setSelectedColor(itemValue);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Classifique seu evento" value="" />
            <Picker.Item label="🟩 - Remédios" value="#8DBF4D" />
            <Picker.Item label="🟦 - Consultas" value="#4D79BF" />
            <Picker.Item label="🟪 - Exames" value="#8D4DBF" />
            <Picker.Item label="🟧 - Exercícios Físicos" value="#FFA500" />
            <Picker.Item label="🟨 - Outros" value="#FFD700" />
          </Picker>

          <TouchableOpacity onPress={saveEvent} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
          {eventDetails.id && (
            <TouchableOpacity onPress={() => deleteRecurringEvent(eventDetails.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Excluir Evento</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.cancelButton, { backgroundColor: '#722F37' }]}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Agenda;
