import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('infoUsuario', jsonValue);
    } catch (e) {
        console.log('Erro ao armazenar informacoes do usuario:', e)
    }
};

export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('infoUsuario');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Erro ao ler informacoes do usuario:', e)
    }
  };