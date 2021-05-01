import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaViewBase, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Icon, Footer, Separator, Right } from 'native-base';
import {Avatar} from 'react-native-paper';
import css from '../style/css';
import api from '../services/api';

function PrevencoesScreen({ navigation }){

  const [prevencoes, setPrevencoes] = useState([]);
  useEffect(() => {
    async function listagem(){
      const response = await api.get('/prevencoes')
      setPrevencoes(response.data)
      console.log(prevencoes);
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

      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <SafeAreaView>
            <ScrollView>

            <View>
              <FlatList 
                data={prevencoes}
                keyExtractor={item => item.idPrevencao}
                renderItem={({ item }) => (
                  <View style={styles.item} >
              
              <Separator style={styles.itemDivisao}>
                <View style={styles.divisaoItem}>
                      <Text style={styles.divisao}>{item.tipo}</Text>
                </View>
              </Separator>

                  <View style={{ flex:1, flexDirection:'row', backgroundColor:'#90caf9', borderRadius: 10, borderWidth: 1, borderColor: '#fff',  height:100, alignItems:'center'}}>
                    <View style={{justifyContent:'center', paddingLeft:5}}>
                      <Avatar.Image style={{}} source={{uri:'https://scontent.fgru11-1.fna.fbcdn.net/v/t1.18169-9/11836710_850418251732564_7796996506950551796_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_eui2=AeEsBkz-SClh2Kjij7DVAZLAJXHUwEx1UvwlcdTATHVS_HYIuXcjm1dNLt3czmXoGq0I48f09zJPjJtDIZRtdjUk&_nc_ohc=msbZ8AdLzPgAX-Vw7qr&_nc_ht=scontent.fgru11-1.fna&oh=780c602955408093d5146d06061d1db6&oe=60AC17BD'}} size={70}/>
                    </View>
                    <View style={{paddingLeft:80}}>
                      <Text style={{color:'#26a69a'}}>
                        {item.texto}
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
        <Footer style={{backgroundColor:"#008B8B"}}/>
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
    borderBottomColor: "black",
    borderWidth: 1.5,
    marginBottom:7,
    borderRadius: 3, 
     
    
  }
  
  });

