import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { getData } from '../utils/storageUtils';
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  ExtraView,
  Avatar,
} from './../components/styles';

const Menu = ({ navigation }) => {

  const [nome, setNome] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const infoUsuario = await getData();
       
        if (infoUsuario && infoUsuario.nome) {
          let nomeCompleto = infoUsuario.nome;
          nomeCompleto = nomeCompleto.split(' ');

          setNome(nomeCompleto[0]);
        }
      } catch (e) {
        console.log('Erro ao ler informacoes do usuario:', e);  
      }
    };

    fetchUsuario();
  
  }, []);

  const renderMenuButton = (title, iconSource, onPress) => (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', margin: 20 }}>
      <Image source={iconSource} style={{ width: 65, height: 65 }} />
      <Text style={{ marginTop: 10, fontSize: 16, textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <StyledContainer>

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <InnerContainer>
          <ExtraView>
            <Avatar source={require('../assets/logo-vitalcare.png')} />
          </ExtraView>
          <PageTitle>{nome}</PageTitle>

          <InnerContainer>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              <View style={{ width: '50%', alignItems: 'center' }}>
                {renderMenuButton('Agenda', require('../assets/Agenda.png'), () => navigation.navigate('Agenda'))}
              </View>
              <View style={{ width: '50%', alignItems: 'center' }}>
                {renderMenuButton('Relatórios', require('../assets/Relatorio.png'), () => {})}
              </View>
              <View style={{ width: '50%', alignItems: 'center' }}>
                {renderMenuButton('Dados de Saúde', require('../assets/DadosSaude.png'), () => navigation.navigate('DadosSaude'))}
              </View>
              <View style={{ width: '50%', alignItems: 'center' }}>
                {renderMenuButton('Maps', require('../assets/Maps.png'), () => {})}
              </View>
              <View style={{ width: '50%', alignItems: 'center' }}>
                {renderMenuButton('Configurações', require('../assets/Configuração.png'), () => navigation.navigate('Configuracao'))}
              </View>
              <View style={{ width: '50%', alignItems: 'center' }}>
                {renderMenuButton('SOS', require('../assets/SOS.png'), () => navigation.navigate('PopUpSOS'))}
              </View>
            </View>
          </InnerContainer>
        </InnerContainer>
      </ScrollView>
    </StyledContainer>
  );
};

export default Menu;
