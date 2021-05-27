import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaViewBase, FlatList, ScrollView, SafeAreaView, Image, Animated } from 'react-native';
import { Icon, Footer, Separator, Right } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
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
                    <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1, borderRadius:5, height:350}}>
                      
                      <View style={{alignItems:'center',margin:10}}>
                        <Image style={{width:360,height:150, borderWidth: 1.5, borderRadius: 10,  marginBottom:20}} source={require('../assets/icon.png')}/>
                      </View>
                        
                        <Text style={{color:'black', fontSize:15, textAlign:'justify', margin:10}}>
                          {item.texto}
                        </Text>
                        <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end', margin:12}}>
                          <Text style={{fontSize:13, color:'black', fontWeight:'bold' }}>
                            {item.nome}
                          </Text>
                        </View>
                      </LinearGradient>
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
    backgroundColor:'black'
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