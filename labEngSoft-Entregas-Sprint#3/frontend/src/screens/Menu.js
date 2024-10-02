import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar navegação
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  PageSubTitle,
  ExtraView,
  Avatar,
} from './../components/styles';

const MenuScreen = () => {
  const [userName, setUserName] = useState('João Vitor');
  const [userRole, setUserRole] = useState('Cuidador');
  const navigation = useNavigation(); // Inicializando a navegação

  const renderMenuButton = (title, iconSource, onPress) => (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', margin: 20 }}>
      {/* Aumentando a imagem para 80x80 */}
      <Image source={iconSource} style={{ width: 80, height: 80 }} />
      {/* Aumentando o tamanho da fonte para 18 */}
      <Text style={{ marginTop: 10, fontSize: 18, textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <StyledContainer>
      <InnerContainer>
        {/* Cabeçalho do perfil */}
        <ExtraView>
          <Avatar source={require('../assets/logo-vitalcare.png')} />
        </ExtraView>
        <PageTitle>{userName}</PageTitle>
        <PageSubTitle>{userRole}</PageSubTitle>

        {/* Ícones do Menu */}
        <InnerContainer>
          {/* Usando flexDirection 'row' para formar duas colunas */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Centralizando e alinhando os itens em duas colunas */}
            <View style={{ width: '50%', alignItems: 'center' }}>
              {renderMenuButton('Agenda', require('../assets/Agenda.png'), () => {})}
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              {renderMenuButton('Relatórios', require('../assets/Relatorio.png'), () => {})}
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              {renderMenuButton('Dados de Saúde', require('../assets/DadosSaude.png'), () => {})}
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              {renderMenuButton('Maps', require('../assets/Maps.png'), () => {})}
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              {renderMenuButton('Configurações', require('../assets/Configuração.png'), () => {})}
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              {renderMenuButton('SOS', require('../assets/SOS.png'), () => navigation.navigate('PopUpSOS'))}
            </View>
          </View>
        </InnerContainer>
      </InnerContainer>
    </StyledContainer>
  );
};

export default MenuScreen;
