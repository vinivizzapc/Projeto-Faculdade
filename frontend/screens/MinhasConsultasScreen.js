import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Icon, Footer, Separator } from 'native-base';
import { Modalize } from 'react-native-modalize';
import css from '../style/css';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';


function MinhasConsultasScreen ({ navigation }){
  const [consultas, setConsultas] = useState([]);
  const [idusuario, setIdUsuario] = useState(0);
  const modalizeRef = useRef(null);

  function onOpen(){
    modalizeRef.current?.open();
  }

  function onClose(){
    modalizeRef.current?.close();
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
    setTimeout(
      async function listagem(){
        const response = await api.get(`/usu/consultas/${idusuario}`)
        setConsultas(response.data)
    })
  }, [consultas]);
  
  

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
                  renderItem={({ item }) => (
                  
                    
                    <View style={{flex:1 ,padding:10}}>
                      <View style={{alignItems:'center'}}>
                        <View  style={{flex:1,  backgroundColor:'#cfd8dc', borderBottomWidth:2, borderLeftWidth:2, borderRightWidth:2, borderTopWidth:2, borderColor:'#008B8B'}}>
                          <View style={{height:350, width:300, margin:10}}>
                            <View style={{ justifyContent:'center', alignItems:'center'}}>
                            <View style={{alignItems:'center',margin:0.5}}>
                              <Image style={{width:300,height:100, borderWidth: 1.5, borderRadius: 10,}} source={{ uri: item.imagem }}/>
                            </View>
                              <Text style={{color: 'black', fontSize:17, margin:1, fontWeight:'bold'}}>
                                {item.tipoConsulta}
                              </Text>
                              <Text style={{color: 'black', fontSize:13, margin:1, fontWeight:'bold'}}>
                                {item.tipo}
                              </Text>
                              <Text style={{color: 'grey', fontSize:17, margin:1, fontWeight:'bold'}}>
                                {item.nome}
                              </Text>
                              <Text style={{color: 'grey', fontSize:16, margin:3, fontWeight:'bold'}}>
                                {item.data}
                              </Text>
                              <Text style={{color: 'grey', fontSize:16, margin:3, fontWeight:'bold'}}>
                                {item.endereco}
                              </Text>

                              {item.status==='Agendado'?(
                                <TouchableOpacity style={{backgroundColor:'green', borderRadius:9, flexDirection:'row', height:27, width:150, textAlign:'center', alignItems:'center' }}>
                                  <FontAwesome name="clock-o" size={11} style={{color: '#fff',margin:4, marginLeft:8, marginTop:7}} />
                                  <Text style={{color: '#fff',fontWeight:'bold',fontSize:14, marginLeft:5 }}>
                                    Status: {item.status}
                                  </Text>
                                </TouchableOpacity>
                                )
                                :item.status==='Cancelado'?
                                <TouchableOpacity style={{backgroundColor:'red', borderRadius:9, flexDirection:'row', height:27, width:150, textAlign:'center', alignItems:'center' }}>
                                  <MaterialIcons name="cancel" size={11} style={{color: '#fff',margin:4, marginLeft:8, marginTop:7}} />
                                  <Text style={{color: '#fff',fontWeight:'bold',fontSize:14}}>
                                    Status: {item.status}
                                  </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{backgroundColor:'blue', alignItems:'center', textAlign:'center', borderRadius:9, flexDirection:'row', height:27, width:150 }}>
                                  <FontAwesome5 name="check" size={11} style={{color: '#fff',margin:4, marginLeft:8, marginTop:7}} />
                                  <Text style={{color: '#fff',fontWeight:'bold', marginLeft:5 ,fontSize:14}}>
                                    Status: {item.status}
                                  </Text>
                                </TouchableOpacity>
                                  }
                                  <Text style={{color: 'black',fontWeight:'bold',fontSize:10.9, textAlign:'center', marginTop:6, marginBottom:8 }}>
                                    "(Se não puder comparecer Clique no Botão Abaixo)"
                                  </Text>
                                <TouchableOpacity onPress={onOpen} style={{backgroundColor:'#008B8B',  flexDirection:'row', height:50, width:200, marginTop:10, alignItems:'center'}}>
                                  <Text style={{flex: 1,color: '#fff',fontWeight:'bold',fontSize:18, textAlign:'center', alignItems:'center'}}>
                                    DETALHES
                                  </Text>
                                </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    
                    
                  )}
                /> 
              </View>      
          </SafeAreaView>
        </View>
        <Modalize ref={modalizeRef} snapPoint={450} modalHeight={470}>
          </Modalize>
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






