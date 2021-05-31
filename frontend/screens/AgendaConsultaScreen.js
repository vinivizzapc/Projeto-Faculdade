import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Icon, Footer } from 'native-base';
import css from '../style/css';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AgendaConsultaScreen ({ navigation }){

  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    async function getUser(){
      const user = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(user);
      setUsuario(jsonValue);
    }
    getUser();
  }, [usuario]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
          <View style={css.IconPosicao}>
            <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
          </View>
          <View style={{flex:1,alignItems:'center', justifyContent:'center', paddingRight:20}}>
            <Text style={{fontSize:24, color:'white'}}>AGENDAR</Text>
          </View>
        </View> 
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:17, color:'grey',fontWeight:'bold',}}>Selecione a especialidade do agendamento:</Text>
          <View style={styles.button}>
            <TouchableOpacity style={styles.btnTipo} onPress={()=>navigation.navigate('CadConsultaScreen', { screen: 'CadConsultaScreen', params: { user: usuario.idusuario } })}>
              <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.btnTipo}>
                <Text style={[styles.textSign, {color:'#fff'}]}>CONSULTA</Text>
              </LinearGradient>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.btnTipo} onPress={()=>navigation.navigate('CadExameScreen', { screen: 'CadExameScreen', params: { user: usuario.idusuario }})}>
              <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.btnTipo}>
                <Text style={[styles.textSign, {color:'#fff'}]}>EXAME</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnTipo} onPress={()=>navigation.navigate('CadVacinacaoScreen', { screen: 'CadVacinacaoScreen', params: { user: usuario.idusuario }})}>
              <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.btnTipo}>
                <Text style={[styles.textSign, {color:'#fff'}]}>VACINAÇÃO</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
  );
}

export default AgendaConsultaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnTipo: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    margin:22
},
textSign: {
  fontSize: 18,
  fontWeight: 'bold'
},
button: {
  alignItems: 'center',
  
},
});