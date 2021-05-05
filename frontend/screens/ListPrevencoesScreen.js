import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Icon, Footer, Separator, Right, ListItem } from 'native-base';
import {Avatar} from 'react-native-paper';
import css from '../style/css';
import api from '../services/api';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';

function ListPrevencoesScreen({ navigation }){

  const [prevencoes, setPrevencoes] = useState([]);

  useEffect(() => {
    async function listagem(){
      const response = await api.get('/prevencoes');
      setPrevencoes(response.data)
    }
    listagem();
  }, [prevencoes]);

  async function excluir(id) {
    await api.delete(`/prevencoes/${id}`);
  }

  function excluirPrevencao(idPrevencao) {
    Alert.alert('Excluir Prevenção', 'Deseja excluir a prevenção?', [
      {
        text: 'Sim',
        onPress() {
          excluir(idPrevencao)
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
          <Ionicons name="add-sharp" size={30} color="black" onPress={() => navigation.navigate('InserirPrevencoes')}/>
        </View>
      </View> 
      <View>
          <SafeAreaView>
            <ScrollView>
              <View style={{flex: 1}}>
                <FlatList 
                  nEndReachedThreshold={0.1}
                  data={prevencoes}
                  keyExtractor={item => item.idPrevencao.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.item} >
                      <View style={{ flex:1, justifyContent:'space-between', flexDirection:'row', backgroundColor:'white', borderWidth: 0.2, borderColor: 'grey',  height:85, alignItems:'center'}}>
                        <View style={{paddingLeft:15}}>
                          <Avatar.Image style={{}} source={{uri:'https://scontent.fgru11-1.fna.fbcdn.net/v/t1.18169-9/11836710_850418251732564_7796996506950551796_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_eui2=AeEsBkz-SClh2Kjij7DVAZLAJXHUwEx1UvwlcdTATHVS_HYIuXcjm1dNLt3czmXoGq0I48f09zJPjJtDIZRtdjUk&_nc_ohc=msbZ8AdLzPgAX-Vw7qr&_nc_ht=scontent.fgru11-1.fna&oh=780c602955408093d5146d06061d1db6&oe=60AC17BD'}} size={50}/>
                        </View>
                        <View style={{paddingLeft:20}}>
                          <Text style={{color: 'black', fontSize:18}}>
                            {item.nome}
                          </Text>
                          <Text style={{color: 'grey', fontSize:14}}>
                            {item.texto}
                          </Text>
                        </View>
                        <View style={{paddingLeft:20, marginLeft:90}}>
                          <TouchableOpacity  onPress={() => excluirPrevencao(item.idPrevencao)}>
                            <FontAwesome5 name="edit" size={24} style={{color: 'orange'}} />
                          </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft:20}}>
                          <TouchableOpacity  onPress={() => excluirPrevencao(item.idPrevencao)}>
                            <FontAwesome5 name="trash" size={24} style={{color: 'red'}} />
                          </TouchableOpacity>
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

export default ListPrevencoesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});