import React, {useRef,useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image } from 'react-native';
import { Icon, Footer, Separator, Right, ListItem, Header } from 'native-base';
import { Modalize } from 'react-native-modalize';
import { LinearGradient } from 'expo-linear-gradient';
import css from '../style/css';
import api from '../services/api';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

function ListLocaisScreen({ navigation }){


  const modalizeRef = useRef(null);
  function onOpen(){
    modalizeRef.current?.open();
  }

  function onClose(){
    modalizeRef.current?.close();
  }


  const [locaisConsulta, setLocaisConsulta] = useState([]);
  const [locaisVacinacao, setLocaisVacinacao] = useState([]);
  const [locaisExame, setLocaisExame] = useState([]);


  useEffect(() => {
    async function listagem(){
      const responseConsulta = await api.get('/locaisConsulta');
      setLocaisConsulta(responseConsulta.data);
      const responseVacinacao = await api.get('/locaisVacinacao');
      setLocaisVacinacao(responseVacinacao.data);
      const responseExame = await api.get('/locaisExame');
      setLocaisExame(responseExame.data);
    }
    listagem();
  }, [locaisConsulta]);

  async function excluir(id) {
    await api.delete(`/locais/${id}`);
    onClose();
  }

  function excluirLocais(id) {
    Alert.alert('Excluir Local', 'Deseja excluir o Local?', [
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
        <View style={{marginLeft:10, marginTop: 8}}>
          <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
        </View>
        <View style={{marginRight:10,  marginTop: 8}}>
          <Ionicons name="add-sharp" size={30} color="black" onPress={() => navigation.navigate('InserirLocais')}/>
        </View>
      </View> 
        <View style={{flex:1}}>
        <ScrollView>
          <View> 
            <View style={{alignItems:'center'}}>
              <Separator style={styles.itemDivisao}>
                <View style={styles.divisaoItem}>
                  <Text style={styles.divisao}>Hospitais</Text>
                </View>
              </Separator>
            </View>
            <FlatList 
              nEndReachedThreshold={0.1}
              data={locaisConsulta}
              keyExtractor={item => item.idlocais.toString()}
              renderItem={({ item }) => (          
                <View style={{padding:10}}>
                    <View style={{flex:1,flexDirection: 'row',backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:2 ,borderBottomWidth:2, }}>
                    <View style={{margin:10}}>
                      <Image style={{width:50,height:50, borderWidth:1, borderRadius:3}} source={{ uri: item.imagem }}/>
                    </View>
                      <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{color: '#424242', fontSize:18}}>
                          {item.nome}
                        </Text>      
                      </View>
                    <View style={{margin:20}}>
                      <TouchableOpacity  onPress={onOpen}>
                        <FontAwesome5 name="info" size={24} style={{color: 'red'}} />
                      </TouchableOpacity>
                    </View>   
                  </View>
                </View>
              )}
            /> 
          </View>  

            <View> 
              <View style={{alignItems:'center'}}>
                <Separator style={styles.itemDivisao}>
                  <View style={styles.divisaoItem}>
                    <Text style={styles.divisao}>Postos de vacinação</Text>
                  </View>
                </Separator>
              </View>
              <FlatList 
                nEndReachedThreshold={0.1}
                data={locaisVacinacao}
                keyExtractor={item => item.idlocais.toString()}
                renderItem={({ item }) => (          
                  <View style={{padding:10}}>
                      <View style={{flex:1,flexDirection: 'row',backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:2 ,borderBottomWidth:2, }}>
                      <View style={{margin:10}}>
                        <Image style={{width:50,height:50, borderWidth:1, borderRadius:3}} source={{ uri: item.imagem }}/>
                      </View>
                        <View style={{flex:1,justifyContent:'center'}}>
                          <Text style={{color: '#424242', fontSize:18}}>
                            {item.nome}
                          </Text>      
                        </View>
                      <View style={{margin:20}}>
                        <TouchableOpacity  onPress={onOpen}>
                          <FontAwesome5 name="info" size={24} style={{color: 'red'}} />
                        </TouchableOpacity>
                      </View>   
                    </View>
                  </View>
                )}
              /> 
            </View> 
            <View> 
              <View style={{alignItems:'center'}}>
                <Separator style={styles.itemDivisao}>
                  <View style={styles.divisaoItem}>
                    <Text style={styles.divisao}>Locais para exame</Text>
                  </View>
                </Separator>
              </View>
                <FlatList 
                  nEndReachedThreshold={0.1}
                  data={locaisExame}
                  keyExtractor={item => item.idlocais.toString()}
                  renderItem={({ item }) => (          
                    <View style={{padding:10}}>
                        <View style={{flex:1,flexDirection: 'row',backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:2 ,borderBottomWidth:2, }}>
                        <View style={{margin:10}}>
                          <Image style={{width:50,height:50, borderWidth:1, borderRadius:3}} source={{ uri: item.imagem }}/>
                        </View>
                          <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={{color: '#424242', fontSize:18}}>
                              {item.nome}
                            </Text>      
                          </View>
                        <View style={{margin:20}}>
                          <TouchableOpacity  onPress={onOpen}>
                            <FontAwesome5 name="info" size={24} style={{color: 'red'}} />
                          </TouchableOpacity>
                        </View>   
                      </View>
                    </View>
                  )}
                /> 
              </View> 
          </ScrollView>
        </View>
            <Modalize ref={modalizeRef} snapPoint={450} modalHeight={470}>
              <FlatList 
                    nEndReachedThreshold={0.1}
                    data={locaisConsulta}
                    keyExtractor={item => item.idlocais.toString()}
                    renderItem={({ item }) => (
                <View style={{backgroundColor:'#e0e0e0'}}>
                    <View style={{flex:1,justifyContent:'center', alignItems:'stretch', backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:2 ,borderBottomWidth:2,}}>
                          <Text style={{color: 'black', fontSize:18, margin:10}}>
                            Nome:  <Text style={{fontSize:15, color:'red'}}>{item.nome}</Text> 
                          </Text>
                          <Text style={{color: 'black', fontSize:18, margin:10}}>
                            CEP:  <Text style={{fontSize:15, color:'red'}}>{item.cep}</Text>
                          </Text>
                          <Text style={{color: 'black', fontSize:18, margin:10}}>
                           Endereço:  <Text style={{fontSize:15, color:'red'}}>{item.endereco}</Text>
                          </Text>
                          <Text style={{color: 'black', fontSize:18, margin:10}}>
                            Latitude:  <Text style={{fontSize:15, color:'red'}}>{item.latitude}</Text>
                          </Text>
                          <Text style={{color: 'black', fontSize:18, margin:10}}>
                            Longitude:  <Text style={{fontSize:15, color:'red'}}>{item.longitude}</Text>
                          </Text>
                          <Text style={{color: 'black', fontSize:18, margin:10}}>
                            Descrição:  <Text style={{fontSize:15, color:'red'}}>{item.descricao}</Text>
                          </Text>
                    </View>
                  
                  <View style={{flex:1, height:180, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                      <TouchableOpacity onPress={() => excluirLocais(item.idlocais)} style={[styles.botao]}>
                      <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.colorGrad}>
                        <Text style={[styles.textSign, {color:'#fff'}]}>Editar</Text>
                      </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => excluirLocais(item.idlocais)} style={[styles.botao]}>
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.colorGrad}>
                          <Text style={[styles.textSign, {color:'#fff'}]}>Excluir</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                  </View>
                </View>
                )}
              />
            </Modalize>
        <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
  );
}

export default ListLocaisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  divisao:{
    fontSize:17,
    fontWeight: 'bold',    
    paddingVertical: 5,
    color:'white'
  },
  divisaoItem:{
    width: 600,
    height:35,
    
  },
  itemDivisao:{
    padding: 2,
    borderBottomColor:'#616161',
    borderRightColor:'#616161',
    borderRightWidth:3,
    borderBottomWidth:3,
    marginBottom: 5,
    borderRadius: 5, 
    backgroundColor:'#616161',
    margin:5,
    width:'98%',
  },
  botao:{
    alignItems:'center',
    justifyContent:'center',
    padding:15,
  },
  colorGrad: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},  
});
