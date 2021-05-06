import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image } from 'react-native';
import { Icon, Footer, Separator, Right, ListItem } from 'native-base';
import {Avatar} from 'react-native-paper';
import css from '../style/css';
import api from '../services/api';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';

function ListPrevencoesScreen({ navigation }){

  const [prevencoes, setPrevencoes] = useState([]);

  useEffect(() => {
    async function listagem(){
      const response = await api.get('/prevencoes');
      setPrevencoes(response.data)
    }
    listagem();
  }, [prevencoes]);

  async function excluir(id) {
    await api.delete(`/prevencoes/${id}`);
  }

  function excluirPrevencao(idPrevencao) {
    Alert.alert('Excluir Prevenção', 'Deseja excluir a prevenção?', [
      {
        text: 'Sim',
        onPress() {
          excluir(idPrevencao)
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
      <View style={css.containerHeader}>
        <View style={{marginLeft:10}}>
          <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
        </View>
        <View style={{marginRight:10}}>
          <Ionicons name="add-sharp" size={30} color="black" onPress={() => navigation.navigate('InserirPrevencoes')}/>
        </View>
      </View> 


      <View style={{flex:1}}>
          <SafeAreaView>
            <ScrollView>
              <View>
                <FlatList 
                  nEndReachedThreshold={0.1}
                  data={prevencoes}
                  keyExtractor={item => item.idPrevencao.toString()}
                  renderItem={({ item }) => (

                    
                    <View style={{padding:10}}>

                        <Separator style={styles.itemDivisao}>
                          <View style={styles.divisaoItem}>
                                <Text style={styles.divisao}>{item.tipo}</Text>
                          </View>
                        </Separator>

                      <View style={{ flex: 1,flexDirection: 'row',backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:3,borderBottomWidth:3,}}>
                        

                        <View style={{margin:11}}>
                          <Image style={{width:50,height:50, borderWidth:1, borderRadius:3}} source={require('../assets/img/logo.png')}/>
                        </View>

                        <View style={{flex:1,justifyContent:'center'}}>
                          <Text style={{color: 'black', fontSize:18}}>
                            pedro
                          </Text>
                          <Text style={{color: 'grey', fontSize:14}}>
                            {item.texto}
                          </Text>
                        </View>


                        <View style={{paddingLeft:10, justifyContent:'center', alignItems:'center'}}>
                          <TouchableOpacity  onPress={() => excluirPrevencao(item.idPrevencao)}>
                            <FontAwesome5 name="edit" size={24} style={{color: 'orange'}} />
                          </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft:15, justifyContent:'center', alignItems:'center',marginRight:13}}>
                          <TouchableOpacity  onPress={() => excluirPrevencao(item.idPrevencao)}>
                            <FontAwesome5 name="trash" size={24} style={{color: 'red'}} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    
                  )}
                /> 
              </View>      
            </ScrollView>
          </SafeAreaView>
        </View>
        <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
  );
}

export default ListPrevencoesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  divisao:{
    fontSize:17,
    fontWeight: 'bold',    
    paddingVertical:6.5
  },
  divisaoItem:{
    width: 500,
    height:35,
    
  },
  itemDivisao:{
    padding: 4,
    marginBottom:7,
    borderRadius: 5, 
  },
});