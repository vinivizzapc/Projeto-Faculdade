import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { Icon, Footer } from 'native-base';
import css from '../style/css';
import api from '../services/api';

export default function DetalhesMapa({ route, navigation }) {

  const { localSelecionado, user } = route.params;
  const [favoritado, setFavoritado] = useState('');
  
  useEffect(() => {
    setInterval(
      async function verificarFavorito() {
        const idLocal = localSelecionado.idlocais;
        const response = await api.get(`/favorito/${user}/${idLocal}`);
        setFavoritado(response.data.msg);
      }, 2000
    )
    
  }, [favoritado]);
  
  async function favoritar(local, usuario) {
    const favorito = {
      idUsuario: usuario,
      idLocal: local
    }

    const response = await api.post('/favoritos', favorito)

    if (response.data != null) {
      Alert.alert('Favoritos', 'Local favoritado com sucesso!', [
        { text: 'Entendido' }
      ]);
    }
  }

  async function desfavoritar(local, usuario) {
    const favorito = {
      idUsuario: usuario,
      idLocal: local
    }

    const response = await api.post('/favoritoDelete', favorito)

    if (response.data != null) {
      Alert.alert('Favoritos', 'Local desfavoritado com sucesso!', [
        { text: 'Entendido' }
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
      <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={() => navigation.openDrawer()}/>
        </View>
      </View> 
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text>{localSelecionado.tipo}</Text>
        <Text>{localSelecionado.nome}</Text>
        <Text>{localSelecionado.descricao}</Text>
        <Text>{localSelecionado.cep}</Text>
        <Text>{localSelecionado.endereco}</Text>
        <Image style={styles.imagem} source={{ uri: localSelecionado.imagem }} />
        {
          favoritado == 'Não é favorito' ? (
            <TouchableOpacity onPress={() => favoritar(localSelecionado.idlocais, user)} style={{ marginLeft: 10 }}>
              <Text>Favoritar</Text>
            </TouchableOpacity>
          ) 
          : 
          (
            <TouchableOpacity onPress={() => desfavoritar(localSelecionado.idlocais, user)} style={{ marginLeft: 10 }}>
              <Text>Desfavoritar</Text>
            </TouchableOpacity>
          )
        }
        
        <TouchableOpacity onPress={() => { navigation.navigate('AgendarConsulta', { screen: 'AgendarConsulta', params: { local: localSelecionado } }) }} style={{ marginLeft: 10 }}>
          <Text>Agendar</Text>
        </TouchableOpacity>
      </View>
      <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagem: {
    width: 100,
    height: 100
  }
});
