import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Icon, Footer, Picker } from 'native-base';
import css from '../style/css';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather, AntDesign } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function InserirPrevencoes({ navigation }){
  
  const [tipo, setTipo] = useState('higiene');
  const [texto, setTexto] = useState('');
  const [idUsuario, setIdUsuario] = useState(0);


  async function cadastro() {
    const usuario = await AsyncStorage.getItem('user')
      const jsonValue = JSON.parse(usuario);
      setIdUsuario(jsonValue.idusuario);

    if(tipo != '' && texto != ''){
      const prevencao = {
        tipo:tipo,
        texto:texto,
        idUsuario:idUsuario
      }


      const response = await api.post('/prevencoes', prevencao)



      if(response.data != null){
        setTipo('higiene');
        setTexto('');
        setIdUsuario(0);
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
            <Text style={styles.text_header}>Cadastrar Usuario</Text>
          </View>
          <View style={styles.footer}>
          <Text style={[styles.text_footer,{marginTop:1}]}>Tipo de prevenção</Text>
              <Picker
                selectedValue={tipo}
                style={{ height: 50, width: '100%', marginBottom: 5, color:'black'}}
                onValueChange={itemValue => setTipo(itemValue)}
              > 
                <Picker.Item label="Higiene" value="higiene" />
                <Picker.Item label="Mental" value="mental" />
                <Picker.Item label="Fisica" value="fisica" />
                <Picker.Item label="Alimentação" value="alimentação" />
              </Picker>
            <Text style={styles.text_footer}>Texto descrição</Text>
            <View style={styles.action}>
              <AntDesign 
                name="book"
                color="#05375a"
                size={24}
                paddingLeft={15}
              />
                <TextInput placeholder="Inclua um texto" style={styles.TextInput} value={texto} onChangeText={setTexto} autoCapitalize="none"/>
              </View>             
              <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} onPress={() => cadastro()}>
                  <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.signIn}>
                    <Text style={[styles.textSign, {color:'#fff'}]}>Incluir</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Prevencoes')} style={[styles.signIn, { borderColor: '#008B8B', borderWidth: 1, marginTop: 15 }]} >
                  <Text style={[styles.textSign, { color: '#008B8B'}]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default InserirPrevencoes;

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
