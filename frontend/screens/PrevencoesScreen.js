import React, {useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Icon, Footer } from 'native-base';
import css from '../style/css';
import api from '../services/api';

function PrevencoesScreen({ navigation }){

  const [prevencoes, setPrevencoes] = useState([]);
  async function listagem(){
    const response = await api.get('/prevencoes')
    setPrevencoes(response.data)
    console.log(response.data);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
        </View>
        </View> 
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <TouchableOpacity style={styles.btnSubmit} title="Logar" onPress={listagem}>
        <Text style={styles.submitText}>Acessar</Text>
      </TouchableOpacity>
        {prevencoes.map(prevencao =>(
         <Text>
            {prevencao.texto}
          </Text>
        ))}
        </View>
        <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
    
  );
  
}


export default PrevencoesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

