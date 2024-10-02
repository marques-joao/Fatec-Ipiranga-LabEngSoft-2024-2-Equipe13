import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
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

  const renderMenuButton = (title, iconSource, onPress) => (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', margin: 10 }}>
      <Image source={iconSource} style={{ width: 50, height: 50 }} />
      <Text style={{ marginTop: 5 }}>{title}</Text>
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
          <ExtraView>
            {renderMenuButton('Agenda', require('../assets/Agenda.png'), () => {})}
            {renderMenuButton('Relatórios', require('../assets/Relatorio.png'), () => {})}
          </ExtraView>
          <ExtraView>
            {renderMenuButton('Dados de Saúde', require('../assets/DadosSaude.png'), () => {})}
            {renderMenuButton('Maps', require('../assets/Maps.png'), () => {})}
          </ExtraView>
          <ExtraView>
            {renderMenuButton('Configurações', require('../assets/Configuração.png'), () => {})}
            {renderMenuButton('SOS', require('../assets/SOS.png'), () => {})}
          </ExtraView>
        </InnerContainer>
      </InnerContainer>
    </StyledContainer>
  );
};

export default MenuScreen;