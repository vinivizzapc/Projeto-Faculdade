import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { Icon, Footer } from 'native-base';
import css from '../style/css';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

function FavoritosScreen ({ navigation }){
  const [favoritos, setFavoritos] = useState([]);
  const [idusuario, setIdUsuario] = useState(0);

  function desfavoritar(id) {
    Alert.alert('Favorito', 'Deseja excluir o favorito?', [
      {
        text: 'Sim',
        async onPress() {
          await api.delete(`/favoritos/${id}`);
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  useEffect(() => {
    async function getUser(){
      const user = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(user);
      setIdUsuario(jsonValue.idusuario);
    }
    getUser();
  }, [idusuario]);

  useEffect(() => {
    async function listagem(){
      const response = await api.get(`/favoritos/${idusuario}`)
      setFavoritos(response.data);
    }
    listagem();
  }, [favoritos]);
  
  const colunas = 2;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={() => navigation.openDrawer()}/>
        </View>
        </View> 
        <View style={{flex:1}}>
        <SafeAreaView>
              <View>
                <FlatList 
                  nEndReachedThreshold={0.1}
                  data={favoritos}
                  keyExtractor={item => item.idfavoritos.toString()}
                  numColumns={colunas}
                  renderItem={({ item }) => (
                    <View style={{flex:1 ,padding:15}}>
                      <View style={{alignItems:'center' }}>
                        <LinearGradient colors={['#696969', '#808080']} style={{flex:1, borderRadius: 13 }}>
                          <View style={{height: 170, width:160, margin:10 }}>
                            <View style={{ width: 155, height: 120, borderBottomWidth: 1, borderBottomColor: 'white' }}>
                              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{color: 'white', fontSize: 14, margin:1, fontWeight: 'bold' }}>
                                  {item.tipo}
                                </Text>
                                <TouchableOpacity onPress={() => desfavoritar(item.idfavoritos)} style={{ marginLeft: 10 }}>
                                  <Ionicons name="star" size={24} color="gold" />
                                </TouchableOpacity>
                              </View>
                              <View style={{ paddingBottom: 5 }}>
                                <Image source={{ uri: item.imagem }} style={{ width: 155, height: 82 }} />
                              </View>
                            </View>
                            <View style={{ width:100, height:100 }}>
                              <Text style={{color: 'white', fontSize:14, margin:1, fontWeight: 'bold' }} >
                                {item.nome}
                              </Text>
                              <Text style={{color: 'white', fontSize:12, margin:1}} >
                                {item.descricao}
                              </Text>
                            </View>
                          </View>
                        </LinearGradient>
                      </View>
                    </View>
                  )}
                /> 
              </View>      
          </SafeAreaView>
        </View>
      <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
  );
}

export default FavoritosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
