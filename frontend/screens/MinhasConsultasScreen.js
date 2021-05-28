import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Icon, Footer, Separator } from 'native-base';
import css from '../style/css';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

function MinhasConsultasScreen ({ navigation }){
  const [consultas, setConsultas] = useState([]);
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
      const response = await api.get(`/usu/consultas/${idusuario}`)
      setConsultas(response.data)
    })
  }, [consultas]);
  
  const column = 2;

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
                  data={consultas}
                  keyExtractor={item => item.idconsultas.toString()}
                  numColumns={column}
                  renderItem={({ item }) => (

                    
                    <View style={{flex:1 ,padding:10}}>
                      <View style={{alignItems:'center'}}>
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1, borderRadius:13,}}>
                          <View style={{height:160, width:160, margin:10}}>
                            <View style={{ width:100, height:100,}}>
                              <Text style={{color: 'black', fontSize:14, margin:1}}>
                                {item.nome}
                              </Text>
                              <Text style={{color: 'grey', fontSize:15, margin:5}}>
                                {item.data}
                              </Text>
                              {item.status==='Em Aberto'?(
                              <TouchableOpacity style={{backgroundColor:'green', borderRadius:13, flexDirection:'row', height:25, width:107 }}>
                                <FontAwesome5 name="check" size={11} style={{color: '#fff',margin:4, marginLeft:8, marginTop:7}} />
                                <Text style={{color: '#fff',fontWeight:'bold',fontSize:14, textAlign:'center', marginLeft:5, marginTop:2 }}>
                                  {item.status}
                                </Text>
                              </TouchableOpacity>
                              )
                              :item.status==='Cancelado'?
                              <TouchableOpacity style={{backgroundColor:'red', borderRadius:13, flexDirection:'row', height:25, width:107 }}>
                              <Text style={{color: '#fff',fontWeight:'bold',fontSize:14, textAlign:'center', marginTop:2, marginLeft:20 }}>
                                  {item.status}
                                </Text>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity style={{backgroundColor:'blue', borderRadius:13, flexDirection:'row', height:25, width:107 }}>
                              <Text style={{color: '#fff',fontWeight:'bold',fontSize:14, textAlign:'center', marginTop:2, marginLeft:20 }}>
                                  {item.status}
                                </Text>
                              </TouchableOpacity>
                              }

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

export default MinhasConsultasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});


 

                       
