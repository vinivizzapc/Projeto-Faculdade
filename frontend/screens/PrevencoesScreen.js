import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaViewBase, FlatList, ScrollView, SafeAreaView, Image, Animated } from 'react-native';
import { Icon, Footer, Separator, Right } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import css from '../style/css';
import api from '../services/api';

function PrevencoesScreen({ navigation }){
  const [prevencoesHigiene, setPrevencoesHigiene] = useState([]);
  const [prevencoesMental, setPrevencoesMental] = useState([]);
  const [prevencoesFisica, setPrevencoesFisica] = useState([]);
  const [prevencoesAlimentacao, setPrevencoesAlimentacao] = useState([]);

  useEffect(() => {
    async function listagem(){
      const responseHigiene = await api.get('/prevencoesHigiene')
      setPrevencoesHigiene(responseHigiene.data)
      const responseMental= await api.get('/prevencoesMental')
      setPrevencoesMental(responseMental.data)
      const responseFisica = await api.get('/prevencoesFisica')
      setPrevencoesFisica(responseFisica.data)
      const responseAlimentacao = await api.get('/prevencoesAlimentacao')
      setPrevencoesAlimentacao(responseAlimentacao.data)
    }
    listagem()
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
      <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
        </View>
        
      </View> 


      <View style={styles.header}>
        
        <ScrollView>

            <View style={{marginTop:10}}>
              <Separator style={styles.itemDivisao}>
                  <Text style={styles.divisao}>Higiene</Text>
              </Separator>
              <FlatList 
                data={prevencoesHigiene}
                keyExtractor={item => item.idPrevencao.toString()}
                renderItem={({ item }) => (
                  <View style={styles.item} >
                    <View style={styles.prevencao}>
                    <View style={{flex:1, borderRadius:5, height:350, borderBottomWidth:2, borderLeftWidth:2, borderRightWidth:2, borderTopWidth:2, borderColor:'#008B8B'}}>
                      <View style={{alignItems:'center',margin:10}}>
                        <Image style={{width:360,height:150, borderWidth: 1.5, borderRadius: 10,  marginBottom:20}} source={{ uri: item.imagem }}/>
                      </View>
                        <Text style={{color:'black', fontSize:15, textAlign:'justify', margin:10}}>
                          {item.texto}
                        </Text>
                        <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end', margin:12}}>
                          <Text style={{fontSize:13, color:'black', fontWeight:'bold' }}>
                            {item.nome}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              /> 
              </View> 

             
              <View>
                <Separator style={styles.itemDivisao}>
                  <View style={styles.divisaoItem}>
                    <Text style={styles.divisao}>Mental</Text>
                  </View>
                </Separator>
              <FlatList 
                data={prevencoesMental}
                keyExtractor={item => item.idPrevencao.toString()}
                renderItem={({ item }) => (
                  <View style={styles.item} >
                    <View style={styles.prevencao}>
                    <View style={{flex:1, borderRadius:5, height:350, borderBottomWidth:2, borderLeftWidth:2, borderRightWidth:2, borderTopWidth:2, borderColor:'#008B8B'}}>       
                      <View style={{alignItems:'center',margin:10}}>
                        <Image style={{width:360,height:150, borderWidth: 1.5, borderRadius: 10,  marginBottom:20}} source={{ uri: item.imagem }}/>
                      </View>
                        <Text style={{color:'black', fontSize:15, textAlign:'justify', margin:10}}>
                          {item.texto}
                        </Text>
                        <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end', margin:12}}>
                          <Text style={{fontSize:13, color:'black', fontWeight:'bold' }}>
                            {item.nome}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              /> 
              </View>  

              <View>
                <Separator style={styles.itemDivisao}>
                  <View style={styles.divisaoItem}>
                    <Text style={styles.divisao}>Fisica</Text>
                  </View>
                </Separator>
                <FlatList 
                data={prevencoesFisica}
                keyExtractor={item => item.idPrevencao.toString()}
                renderItem={({ item }) => (  
                  <View style={styles.item} >
                    <View style={styles.prevencao}>
                    <View style={{flex:1, borderRadius:5, height:350, borderBottomWidth:2, borderLeftWidth:2, borderRightWidth:2, borderTopWidth:2, borderColor:'#008B8B'}}>
                      <View style={{alignItems:'center',margin:10}}>
                        <Image style={{width:360,height:150, borderWidth: 1.5, borderRadius: 10,  marginBottom:20}} source={{ uri: item.imagem }} />
                      </View>
                        <Text style={{color:'black', fontSize:15, textAlign:'justify', margin:10}}>
                          {item.texto}
                        </Text>
                        <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end', margin:12}}>
                          <Text style={{fontSize:13, color:'black', fontWeight:'bold' }}>
                            {item.nome}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              /> 
              </View> 


              <View>
                <Separator style={styles.itemDivisao}>
                  <View style={styles.divisaoItem}>
                    <Text style={styles.divisao}>Alimentação</Text>
                  </View>
                </Separator>
              <FlatList 
                data={prevencoesAlimentacao}
                keyExtractor={item => item.idPrevencao.toString()}
                renderItem={({ item }) => (
                  <View style={styles.item} >
                    <View style={styles.prevencao}>
                    <View style={{flex:1, borderRadius:5, height:350, borderBottomWidth:2, borderLeftWidth:2, borderRightWidth:2, borderTopWidth:2, borderColor:'#008B8B'}}>
                      <View style={{alignItems:'center',margin:10}}>
                        <Image style={{width:360,height:150, borderWidth: 1.5, borderRadius: 10,  marginBottom:20}} source={{ uri: item.imagem }}/>
                      </View>
                        <Text style={{color:'black', fontSize:15, textAlign:'justify', margin:10}}>
                          {item.texto}
                        </Text>
                        <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end', margin:12}}>
                          <Text style={{fontSize:13, color:'black', fontWeight:'bold' }}>
                            {item.nome}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              /> 
              </View>       
          </ScrollView>
        </View>
        <Footer style={{backgroundColor:"#0097a7"}}/>
    </View>
  );
}

export default PrevencoesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  item: {
    
    padding: 10,

  },
  divisao:{
    fontSize:17,
    fontWeight: 'bold',    
    paddingVertical:6.5,
    color:'white'
  },
  divisaoItem:{
    width: 500,
    height:35,
    
  },
  itemDivisao:{
    padding: 4,
    borderBottomColor:'#616161',
    borderRightColor:'#616161',
    borderRightWidth:3,
    borderBottomWidth:3,
    marginBottom:7,
    borderRadius: 5, 
    backgroundColor:'#616161',
    marginLeft:10,
    marginRight:10,
    width: 390
  },
  header:{
    flex:1, 

  },
  prevencao:{
    flex: 1,
    height:'100%',
    margin:7
 
  }  
});