import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, FlatList, SafeAreaView } from 'react-native';
import { Icon, Footer } from 'native-base';
import css from '../style/css';
import api from '../services/api';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

function ListAgendasScreen({ navigation }){

  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    async function listagem(){
      const response = await api.get('/loc/agendas');
      setAgendas(response.data)
    }
    listagem();
  }, [agendas]);

  async function excluir(id) {
    await api.delete(`/loc/agenda/${id}`);
  }

  function excluirAgenda(id) {
    Alert.alert('Excluir Horario', 'Deseja excluir o Horario?', [
      {
        text: 'Sim',
        onPress() {
          excluir(id)
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
          <Ionicons name="add-sharp" size={30} color="black" onPress={() => navigation.navigate('InserirAgendas')}/>
        </View>
      </View> 
        
        <View style={{flex: 1}}>
          <SafeAreaView>
              <View>
                <FlatList 
                  nEndReachedThreshold={0.1}
                  data={agendas}
                  keyExtractor={item => item.idagenda.toString()}
                  renderItem={({ item }) => (
                    
                    <View style={{ flex: 1,flexDirection: 'row',backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:3,borderBottomWidth:3, height:70,}}>
                        
                        <View style={{flex:1,justifyContent:'center', marginLeft:20}}>
                        {
                          agendas.status == 0 ? (
                            <Text style={{color: 'red', fontSize:18,fontWeight:'bold'}}>
                              Encerrado
                            </Text>
                          ) 
                          :
                            <Text style={{color: 'black', fontSize:18, fontWeight:'bold'}}>
                              Em aberto
                            </Text>
                        }
                        </View>
                        <View style={{paddingLeft:10, justifyContent:'center', alignItems:'center' }}>
                          <TouchableOpacity  onPress={() => excluirUsuario(item.idagenda)}>
                            <FontAwesome5 name="edit" size={25} style={{color: 'orange'}} />
                          </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft:15, justifyContent:'center', alignItems:'center',marginRight:13}}>
                          <TouchableOpacity  onPress={() => excluirAgenda(item.idagenda)}>
                            <FontAwesome5 name="trash" size={25} style={{color: 'red'}} />
                          </TouchableOpacity>
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

export default ListAgendasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});