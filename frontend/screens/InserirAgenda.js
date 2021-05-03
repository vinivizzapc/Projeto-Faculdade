import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Icon, Picker } from 'native-base';
import { AntDesign } from '@expo/vector-icons'; 
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function InserirAgendas({ navigation }){
  
  const [tipo, setTipo] = useState('higiene');
  const [texto, setTexto] = useState('');
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    async function getUser(){
      const user = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(user);
      setUsuario(jsonValue);
    }
    getUser();
  }, [usuario]);

  async function cadastro() {
    
    if(tipo != '' && texto != ''){
      const prevencao = {
        tipo:tipo,
        texto:texto,
        idUsuario:usuario.idusuario
      }

      const response = await api.post('/prevencoes', prevencao)

      if(response.data != null){
        setTipo('higiene');
        setTexto('');
        setUsuario({});
        navigation.navigate('Prevencoes');
      }else{
        Alert.alert('OOPS!', 'Erro ao Cadastrar a Prevenção', [
          {text: 'Entendido'}
        ]);
      }
    }else{
      Alert.alert('OOPS!', 'Preencha todos os campos!', [
        {text: 'Entendido'}
      ]);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style={{borderRadius:7}} backgroundColor="#008B8B"/>
        <View style={styles.header}>
            <View style={{paddingBottom: 20}}>
                <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
            </View>
            <Text style={styles.text_header}>Cadastrar Horario</Text>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default InserirAgendas;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#008B8B'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 10,
  },
  footer: {
      flex: 5,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18,
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  TextInput: {
      flex: 1,
      marginLeft: 10,
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 40,
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
});
