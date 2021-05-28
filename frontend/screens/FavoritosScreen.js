import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Icon, Footer } from 'native-base';
import css from '../style/css';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

function FavoritosScreen ({ navigation }){
  const [favoritos, setFavoritos] = useState([]);
  const [idusuario, setIdUsuario] = useState(0);


  useEffect(() => {
    async function getUser(){
      const user = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(user);
      setIdUsuario(jsonValue.idusuario);
    }
    getUser();
  }, [idusuario]);

  useEffect(() => {
    setTimeout(
    async function listagem(){
      const response = await api.get(`/favoritos/${idusuario}`)
      setFavoritos(response.data)
    })
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
                    <View style={{flex:1 ,padding:10}}>
                      <View style={{alignItems:'center'}}>
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1, borderRadius:13,}}>
                          <View style={{height: 160, width:160, margin:10}}>
                            <View style={{ width: 155, height: 100, borderBottomWidth: 1, borderBottomColor: '#000' }}>
                              <Text style={{color: 'black', fontSize: 14, margin:1}}>
                                {item.tipo}
                              </Text>
                              <Image source={{ uri: 'https://setorsaude.com.br/wp-content/uploads/2018/08/Os-melhores-hospitais-dos-EUA.jpg' }} style={{ width: 155, height: 70 }} />
                            </View>
                            <View style={{ width:100, height:100, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={{color: 'black', fontSize:14, margin:1}} >
                                {item.nome}
                              </Text>
                              <TouchableOpacity>
                                <Ionicons name="star" size={30} color="gold" />
                              </TouchableOpacity>
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
