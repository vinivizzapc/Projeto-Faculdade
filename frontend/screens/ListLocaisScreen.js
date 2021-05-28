import React, {useRef,useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image } from 'react-native';
import { Icon, Footer, Separator, Right, ListItem, Header } from 'native-base';
import { Modalize } from 'react-native-modalize';
import { LinearGradient } from 'expo-linear-gradient';
import css from '../style/css';
import api from '../services/api';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

function ListLocaisScreen({ navigation }){


  const modalizeRef = useRef(null);
  function onOpen(){
    modalizeRef.current?.open();
  }

  function onClose(){
    modalizeRef.current?.close();
  }


  const [locais, setLocais] = useState([]);

  useEffect(() => {
    async function listagem(){
      const response = await api.get('/locais');
      setLocais(response.data);
    }
    listagem();
  }, [locais]);

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
        <View style={{marginLeft:10}}>
          <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
        </View>
        <View style={{marginRight:10}}>
          <Ionicons name="add-sharp" size={30} color="black" onPress={() => navigation.navigate('InserirLocais')}/>
        </View>
      </View> 


        <View style={{flex:1}}>
        <SafeAreaView>
              <View>
                <FlatList 
                  nEndReachedThreshold={0.1}
                  data={locais}
                  keyExtractor={item => item.idlocais.toString()}
                  renderItem={({ item }) => (
                    
                    
                    <View style={{padding:10}}>

                        <Separator style={styles.itemDivisao}>
                          <View style={styles.divisaoItem}>
                                <Text style={styles.divisao}>{item.tipo}</Text>
                          </View>
                        </Separator>


                        <View style={{flex:1,flexDirection: 'row',backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:2 ,borderBottomWidth:2, }}>

                        <View style={{margin:10}}>
                          <Image style={{width:50,height:50, borderWidth:1, borderRadius:3}} source={require('../assets/img/logo.png')}/>
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
          </SafeAreaView>
        </View>
            <Modalize ref={modalizeRef} snapPoint={450} modalHeight={470}>
              <FlatList 
                    nEndReachedThreshold={0.1}
                    data={locais}
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
                      <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                        <Text style={[styles.textSign, {color:'#fff'}]}>Editar</Text>
                      </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => excluirLocais(item.idlocais)} style={[styles.botao]}>
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
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
    borderBottomColor:'#e0e0e0',
    borderRightColor:'#e0e0e0',
    borderRightWidth:2 ,
    borderBottomWidth:2 
  },
  botao:{
    alignItems:'center',
    justifyContent:'center',
    padding:15,
  },
  signIn: {
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
