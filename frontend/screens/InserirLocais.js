import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Icon, Footer, Picker } from 'native-base';
import css from '../style/css';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/api';

function InserirUsuario({ navigation }){
  
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [tipo, setTipo] = useState('Hospital');
  const [descricao, setDescricao] = useState('');

  function cancelar(){
    setNome('');
    setCep('');
    setTipo('Hospital');
    setDescricao('');
    navigation.navigate('Locais')
  }

  async function cadastro() {
    if(nome != '' && cep != '' && tipo != ''  && descricao != '' ){
      const locais = {
        nome:nome,
        cep:cep,
        tipo:tipo,
        descricao:descricao
  }

      const response = await api.post('/locais', locais)
      
      if(response.data != null){
        if(response.data.msg != null){
          Alert.alert('OOPS!', 'CEP inválido!', [
            {text: 'Entendido'}
          ]);
            setCep('');
            setTipo('Hospital');;
        }else{
          setNome('');
          setCep('');
          setTipo('Hospital');
          setDescricao('');
          navigation.navigate('Locais');
          }   
      }else{
        Alert.alert('OOPS!', 'Erro ao Cadastrar o Local', [
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
            <Text style={styles.text_header}>Cadastro de Local</Text>
          </View>
          <View style={styles.footer}>
         
            <Text style={styles.text_footer}>Nome do local</Text>
            <View style={styles.action}>
              <FontAwesome 
                name="user-o"
                color="#05375a"
                size={20}
                paddingLeft={15}
              />
              <TextInput placeholder="Nome do local" style={styles.TextInput} value={nome} onChangeText={setNome} autoCapitalize="none"/></View>
              
              <Text style={[styles.text_footer,{marginTop:15}]}>CEP</Text>
              <View style={styles.action}>
                <Feather 
                  name="mail"
                  color="#05375a"
                  size={20}
                  paddingLeft={15}
                />
                <TextInput placeholder="CEP do local" style={styles.TextInput} keyboardType='numeric' maxLength={9} value={cep} onChangeText={setCep} autoCapitalize="none"/>
              </View>

              <Text style={[styles.text_footer,{marginTop:15}]}>Descrição</Text>
              <View style={styles.action}>  
                <FontAwesome 
                  name="lock"
                  color="#05375a"
                  size={20}
                  paddingLeft={30}
                  paddingTop={50}
                />
                <TextInput placeholder="Descrição do local" style={styles.TextInput} value={descricao} onChangeText={setDescricao} autoCapitalize="none"/>
              </View>


              <Text style={[styles.text_footer,{marginTop:15}]}>Tipo de local</Text>
              <Picker
                selectedValue={tipo}
                style={{ height: 50, width: '100%', marginBottom: 10, color:'black'}}
                onValueChange={itemValue => setTipo(itemValue)}
              > 
                <Picker.Item label="Hospital" value="Hospital" />
                <Picker.Item label="Posto de vacinação" value="Posto de vacinação" />
                <Picker.Item label="Local para exame" value="Local para exame" />
              </Picker>


             
              <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} onPress={() => cadastro()}>
                  <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.signIn}>
                    <Text style={[styles.textSign, {color:'#fff'}]}>Cadastrar</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => cancelar()} style={[styles.signIn, { borderColor: '#008B8B', borderWidth: 1, marginTop: 15 }]} >
                  <Text style={[styles.textSign, { color: '#008B8B'}]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default InserirUsuario;

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
      paddingVertical: 30
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
