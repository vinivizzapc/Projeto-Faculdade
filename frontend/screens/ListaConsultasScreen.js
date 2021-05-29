import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image } from 'react-native';
import { Icon, Footer, Separator, Right, ListItem } from 'native-base';
import {Avatar} from 'react-native-paper';
import css from '../style/css';
import api from '../services/api';
import { FontAwesome5 } from '@expo/vector-icons';

function ListaConsultasScreen({ navigation }){

  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    async function listagem(){
      const response = await api.get('/consultas');
      setConsultas(response.data)
    }
    listagem();
  }, [consultas]);

  async function excluir(id) {
    await api.delete(`/consultas/${id}`);
  }

  function excluirConsultas(idconsultas) {
    Alert.alert('Excluir Consulta', 'Deseja excluir a Consulta?', [
      {
        text: 'Sim',
        onPress() {
          excluir(idconsultas)
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
        <View style={{marginLeft:10, marginTop:5}}>
          <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
        </View>
      </View> 


      <View style={{flex:1}}>
          <SafeAreaView>
              <View>
                <FlatList 
                  nEndReachedThreshold={0.1}
                  data={consultas}
                  keyExtractor={item => item.idconsultas.toString()}
                  renderItem={({ item }) => (

                    
                    <View style={{padding:10}}>

                      <View style={{ flex: 1, flexDirection: 'row',backgroundColor:'#80cbc4', margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:3,borderBottomWidth:3,}}>
                        

                        <View style={{margin:11}}>
                          <Image style={{width:50,height:50, borderWidth:1, borderRadius:3}} source={require('../assets/img/logo.png')}/>
                        </View>

                        <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{color: 'black', fontSize:18}}>
                            {item.idconsultas}
                          </Text>
                          <Text style={{color: 'black', fontSize:18}}>
                            {item.data}
                          </Text>
                          <Text style={{color: 'grey', fontSize:14}}>
                            {item.nome}
                          </Text>
                          <Text style={{color: 'grey', fontSize:14}}>
                            {item.status}
                          </Text>
                        </View>
                        <View style={{paddingLeft:15, justifyContent:'center', alignItems:'center',marginRight:13}}>
                          <TouchableOpacity  onPress={() => excluirConsultas(item.idconsultas)}>
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

export default ListaConsultasScreen;

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