import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Icon, Footer, Separator, Right, ListItem } from 'native-base';
import {Avatar} from 'react-native-paper';
import css from '../style/css';
import api from '../services/api';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

function ListAgendasScreen({ navigation }){

  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    async function listagem(){
      const response = await api.get('/loc/agendas');
      setAgendas(response.data)
    }
    listagem();
  }, [agendas]);

  async function excluir(id) {
    await api.delete(`/loc/agenda/${id}`);
  }

  function excluirAgenda(id) {
    Alert.alert('Excluir Horario', 'Deseja excluir o Horario?', [
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
          <Ionicons name="add-sharp" size={30} color="black" onPress={() => navigation.navigate('InserirAgendas')}/>
        </View>
      </View> 
        <View>
          {
            agendas.status == 1 ? (
              <Text>
                Em aberto
              </Text>
            ) 
            :
            <Text>
              Encerrado
            </Text>
          }
          
        </View>
        <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
  );
}

export default ListAgendasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});