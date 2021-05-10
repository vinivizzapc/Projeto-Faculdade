import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaViewBase, FlatList, ScrollView, SafeAreaView, Image, Animated } from 'react-native';
import { Icon, Footer, Separator, Right } from 'native-base';
import css from '../style/css';
import api from '../services/api';

function PrevencoesScreen({ navigation }){
  const [prevencoes, setPrevencoes] = useState([]);

  useEffect(() => {
    async function listagem(){
      const response = await api.get('/prevencoes')
      setPrevencoes(response.data)
    }
    listagem()
  }, [prevencoes]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
      <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
        </View>
      </View> 


      <View style={styles.header}>
        
        <SafeAreaView>
            <View>
              <FlatList 
                data={prevencoes}
                keyExtractor={item => item.idPrevencao.toString()}
                renderItem={({ item }) => (

                  
                  <View style={styles.item} >
                    <Separator style={styles.itemDivisao}>
                      <View style={styles.divisaoItem}>
                            <Text style={styles.divisao}>{item.tipo}</Text>
                      </View>
                    </Separator>

                    <View style={styles.prevencao}>
                      
                      <View style={{margin:11}}>
                        <Image style={{width:80,height:80, borderWidth: 2, borderRadius: 15, borderColor:'#e53935'}} source={require('../assets/img/logo.png')}/>
                      </View>

                      <View style={{  flex:1,justifyContent:'center',  backgroundColor:'#80cbc4', borderRadius: 10, borderBottomColor:'#e0e0e0', borderRightColor:'#e0e0e0', borderRightWidth:3, borderBottomWidth:3, }}>
                        <Text style={{color:'#004d40', margin:20, fontSize:15}}>
                          {item.texto}
                        </Text>
                        <Text style={{fontSize:13, paddingLeft:220, margin:10, color:'#004d40'}}>
                          {item.nome}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              /> 
              </View>      
          </SafeAreaView>
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
    paddingVertical:6.5
  },
  divisaoItem:{
    width: 500,
    height:35,
    
  },
  itemDivisao:{
    padding: 4,
    borderBottomColor:'#e0e0e0',
    borderRightColor:'#e0e0e0',
    borderRightWidth:3,
    borderBottomWidth:3,
    marginBottom:7,
    borderRadius: 5, 
  },
  header:{
    flex:1, 

  },
  prevencao:{
    flex: 1,
    flexDirection: 'row',
     
 
  }  
});
