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

  function editarPrevencao(prevencao) {
    prevencao.edit = true;
    navigation.navigate('InserirPrevencoes', {
      screen: 'InserirPrevencoes',
      params: { prevencao: prevencao }
    });
  }

  function criarPrevencao(){
    var prevencao = new Object();
    prevencao.edit = false;
    prevencao.tipo = "higiene";
    navigation.navigate('InserirPrevencoes', {
      screen: 'InserirPrevencoes',
      params: { prevencao: prevencao }
    });
  }

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
          <Ionicons name="add-sharp" size={30} color="black" onPress={() => criarPrevencao()}/>
        </View>
      </View> 


      <View style={{flex:1}}>
          <SafeAreaView>
              <View>
                <FlatList 
                  nEndReachedThreshold={0.1}
                  data={prevencoes}
                  keyExtractor={item => item.idPrevencao.toString()}
                  renderItem={({ item }) => (

                    
                    <View style={{padding:5}}>

                      <View style={{ flex: 1,flexDirection: 'row',backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:3,borderBottomWidth:3,}}>
                        

                        <View style={{margin:11}}>
                          <Image style={{width:50,height:50, borderWidth:1, borderRadius:3}} source={{ uri: item.imagem }}/>
                        </View>

                        <View style={{flex:1,justifyContent:'center'}}>
                          <Text style={{color: 'black', fontSize:18}}>
                            {item.texto}
                          </Text>
                          <Text style={{color: 'grey', fontSize:14}}>
                            {item.tipo}
                          </Text>
                        </View>


                        <View style={{paddingLeft:10, justifyContent:'center', alignItems:'center'}}>
                          <TouchableOpacity  onPress={() => editarPrevencao(item)}>
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
    borderWidth:3,
    borderBottomColor:'#cfd8dc',
    borderRightColor:'#cfd8dc',
    borderTopColor: 'white',
    borderLeftColor: 'white',
  },
});