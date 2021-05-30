import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Icon, Footer } from 'native-base';
import css from '../style/css';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';


function AgendaConsultaScreen ({ navigation }){

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
          <View style={css.IconPosicao}>
            <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
          </View>
          <View style={{flex:1,alignItems:'center', justifyContent:'center', paddingRight:20}}>
            <Text style={{fontSize:24, color:'white'}}>AGENDAR CONSULTAS</Text>
          </View>
        </View> 
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:17, color:'grey',fontWeight:'bold',}}>Selecione a especialidade do agendamento:</Text>
          <View style={styles.button}>
            <TouchableOpacity style={styles.btnTipo} onPress={()=>navigation.navigate('CadConsultaScreen')}>
              <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.btnTipo}>
                <Text style={[styles.textSign, {color:'#fff'}]}>CONSULTAS</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnTipo} >
              <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.btnTipo}>
                <Text style={[styles.textSign, {color:'#fff'}]}>EXAMES</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnTipo} >
              <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.btnTipo}>
                <Text style={[styles.textSign, {color:'#fff'}]}>TESTES</Text>
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