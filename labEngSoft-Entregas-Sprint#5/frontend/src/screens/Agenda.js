import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View, Text, Image, Modal, TouchableOpacity, TextInput, ScrollView, Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment'; 
import styles from './../components/AgendaStyles';
import { getData } from '../utils/storageUtils';
import axios from 'axios';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
};
LocaleConfig.defaultLocale = 'pt-br';

let eventIdCounter = 1;  
let recorrenciaIdCounter = 1;

const Agenda = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [events, setEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const [selectedLembrete, setSelectedLembrete] = useState('No horário do evento');
  const [selectedRecorrencia, setSelectedRecorrencia] = useState('');
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
      setEventDetails({ 
        data: selectedDay, 
        horario: '', 
        nome: '', 
        endereco: '', 
        recorrencia: '', 
        descricao: '', 
        lembrete: selectedLembrete,
        tipoEvento: selectedColor
      });
      setSelectedColor('');
    }
    setModalVisible(true);
  }, [selectedLembrete]);

  const generateEventId = useCallback(() => {
    return eventIdCounter++;
  }, []);

  const generaterecorrenciaId = useCallback(() => {
    return recorrenciaIdCounter++;
  }, []);

  const getrecorrenciaStartDate = useCallback((recorrenciaId) => {
    for (let date in events) {
      const dayEvents = events[date];
      const recorrenciaEvent = dayEvents.find(event => event.recorrenciaId === recorrenciaId);
      if (recorrenciaEvent) {
        return recorrenciaEvent.recorrenciaStartDate || date; 
      }
    }
    return selectedDay; 
  }, [events, selectedDay]);

  const saveEvent = useCallback(async () => {
    if (!eventDetails.nome || !selectedColor || !eventDetails.horario) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    let updatedEvents = events[selectedDay] ? [...events[selectedDay]] : [];

    const newEvent = {
      ...eventDetails,
      id: eventDetails.id || generateEventId(),  
      color: selectedColor,
    };

    const existingEventIndex = updatedEvents.findIndex(event => event.id === newEvent.id);

    if (existingEventIndex > -1) {
      updatedEvents[existingEventIndex] = newEvent;
    } else {
      updatedEvents.push(newEvent);
    }

    if (eventDetails.recorrencia) {
      const recorrenciaId = eventDetails.recorrenciaId || generaterecorrenciaId(); 
      const recorrenciaStartDate = eventDetails.recorrenciaStartDate || getrecorrenciaStartDate(recorrenciaId);
      newEvent.recorrenciaId = recorrenciaId;
      newEvent.recorrenciaStartDate = recorrenciaStartDate;

      Object.keys(events).forEach(day => {
        const dayEvents = events[day]?.filter(event => event.recorrenciaId !== recorrenciaId) || [];
        setEvents(prevEvents => ({ ...prevEvents, [day]: dayEvents }));
      });

      const recorrenciaMap = {
        '1 dia': 1,
        '1 semana': 7,
        '2 semanas': 14,
        '1 mês': 30,
        '1 ano': 365,
      };

      const recorrenciaDays = recorrenciaMap[eventDetails.recorrencia];

      for (let i = 0; i < recorrenciaDays; i++) {
        const newDate = moment(recorrenciaStartDate).add(i, 'days').format('YYYY-MM-DD');
        let recurringEvents = events[newDate] ? [...events[newDate]] : [];
        recurringEvents = recurringEvents.filter(event => event.recorrenciaId !== recorrenciaId);
        recurringEvents.push({ ...newEvent, id: generateEventId(), recorrenciaId, recorrenciaStartDate });

        setEvents(prevEvents => ({ ...prevEvents, [newDate]: recurringEvents }));
      }
    }

    setEvents(prevEvents => ({ ...prevEvents, [selectedDay]: updatedEvents }));
    setModalVisible(false); 

  }, [eventDetails, selectedDay, selectedColor, events, generateEventId, generaterecorrenciaId, getrecorrenciaStartDate]);


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
    if (event?.recorrenciaId) {
      Alert.alert(
        "Excluir Evento",
        "Deseja excluir apenas este evento ou toda a recorrência?",
        [
          { text: "Evento Atual", onPress: () => deleteEvent(id) },
          { text: "Excluir Recorrência", onPress: () => {
              const recorrenciaId = event.recorrenciaId;
              Object.keys(events).forEach((day) => {
                let updatedEvents = events[day]?.filter(event => event.recorrenciaId !== recorrenciaId) || [];
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
    setEventDetails({ ...eventDetails, horario: moment(currentTime).format('HH:mm') });
  }, [selectedTime, eventDetails]);

  const renderedEvents = useMemo(() => {
    return events[selectedDay]?.sort((a, b) => moment(a.horario, 'HH:mm').diff(moment(b.horario, 'HH:mm')))
      .map((event) => (
        <TouchableOpacity key={event.id} onPress={() => openEventModal(event)}>
          <View style={[styles.eventBlock, { backgroundColor: event.color }]}>
            <Text style={styles.eventText}>
              {event.horario} - {event.nome}: {event.descricao}
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
            selectedColor: '#8DBF4D',
          },
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = { 
              marked: events[date]?.length > 0, 
              dotColor: '#8DBF4D', 
              selected: selectedDay === date, 
              selectedColor: selectedDay === date ? '#8DBF4D' : undefined, 
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
            value={eventDetails.nome}
            onChangeText={(text) => setEventDetails({ ...eventDetails, nome: text })}
          />

          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={styles.input}
          >
            <Text style={styles.timeInputText}>
              {eventDetails.horario || 'Horário do Evento'}
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
            value={eventDetails.endereco}
            onChangeText={(text) => setEventDetails({ ...eventDetails, endereco: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={eventDetails.descricao}
            onChangeText={(text) => setEventDetails({ ...eventDetails, descricao: text })}
          />

          <Text style={styles.inputLabel}>Lembrete</Text>
          <Picker
            selectedValue={selectedLembrete}
            onValueChange={(itemValue) => setSelectedLembrete(itemValue)}
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
            selectedValue={selectedRecorrencia}
            onValueChange={(itemValue) => {
              setEventDetails({ ...eventDetails, recorrencia: itemValue, isrecorrenciaEdited: true });
              setSelectedRecorrencia(itemValue);
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
