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
          <ScrollView>
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
                      <View style={{justifyContent:'center'}}>
                        <Image style={{height:85, width:85, borderWidth: 2, borderRadius: 15, borderColor:'#e53935'}} source={require('../assets/img/logo.png')}/>
                      </View>
                      <View style={{ backgroundColor:'#4fc3f7', marginLeft:10, height:100, width:280, borderRadius: 10, borderWidth: 1, borderColor:'#fff', alignItems:'center', paddingTop:35  }}>
                        <Text style={{color:'#004d40'}}>
                          {item.texto}
                        </Text>
                        <Text style={{fontSize:12, paddingLeft:220, paddingTop:20, color:'#004d40'}}>
                          Pedro
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              /> 
              </View>      
            </ScrollView>
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
    alignItems:'center', 
    justifyContent:'center'
  },
  prevencao:{
    flex:1, 
    flexDirection:'row', 
    backgroundColor:'#fff', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#fff',  
    height:100, 
    alignItems:'center'
  }  
});
