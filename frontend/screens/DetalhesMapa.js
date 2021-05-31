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

      <View style={{flex:1, padding:10}}>
        <View style={{alignItems:'center'}}>   
          <View style={styles.viewPrincipal}>
          <Image style={styles.imagem} source={{ uri: localSelecionado.imagem }} />
            <Text style={styles.txtBlack}>{localSelecionado.tipo}</Text>
            <Text style={styles.txtBlack}>{localSelecionado.nome}</Text>
            <Text style={styles.txtGrey}>{localSelecionado.descricao}</Text>
            <Text style={styles.txtGrey}>{localSelecionado.cep}</Text>
            <Text style={styles.txtGrey}>{localSelecionado.endereco}</Text>
            
            <View style={{flex:1, flexDirection:'row', marginTop:50}}>
              {
                favoritado == 'Não é favorito' ? (
                  <View style={{margin:20}}>
                    <TouchableOpacity onPress={() => favoritar(localSelecionado.idlocais, user)} style={styles.btnDesfavoritar}>
                      <Text style={styles.txtBtn}>FAVORITAR</Text>
                    </TouchableOpacity>
                  </View>
                ) 
                : 
                (
                  <View style={{margin:20}}>
                    <TouchableOpacity onPress={() => desfavoritar(localSelecionado.idlocais, user)} style={styles.btnDesfavoritar}>
                      <Text style={styles.txtBtn}>DESFAVORITAR</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
              <View style={{margin:20}}>
                <TouchableOpacity onPress={() => { navigation.navigate('AgendarConsulta', { screen: 'AgendarConsulta', params: { local: localSelecionado } }) }} style={styles.btnAgendar}>
                  <Text style={styles.txtBtn}>AGENDAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
  },
  btnDesfavoritar:{
    backgroundColor:'#e53935',
    width:100,
    height:35,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  },
  btnAgendar:{
    backgroundColor:'#008B8B',
    width:100,
    height:35,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  },
  txtBtn:{
    fontWeight:'bold',
    fontSize:12
  },
  txtGrey:{
    color: 'grey', 
    fontSize:17, 
    margin:1, 
    fontWeight:'bold', 
    margin:5
  },
  txtBlack:{
    color: 'black', 
    fontSize:17, 
    margin:1, 
    fontWeight:'bold', 
    margin:5
  },
  viewPrincipal:{
    margin:10,
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor:'#cfd8dc', 
    borderBottomWidth:2, 
    borderLeftWidth:5, 
    borderRightWidth:2, 
    borderTopWidth:2, 
    borderColor:'#008B8B',
    height:400, 
    width:300,
  }

});