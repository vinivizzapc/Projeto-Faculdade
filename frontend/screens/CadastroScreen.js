import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import api from '../services/api';
import {AuthContext} from '../components/Context';

export default function CadastroScreen ({navigation}){

  const {signUp} = React.useContext(AuthContext);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function cadastro() {
    if(nome != '' && email != '' && senha != ''){
      const usuario = {
        nome:nome,
        email:email,
        senha:senha,
        status:0
      }
      const response = await api.post('/usuarios', usuario)

      if(response.data != null){
        signUp()
      }else{
        alert('Erro ao cadastrar o usuário')
      //Fazer chamada no back-end para cadastro. 
      }

    }else{
      alert('Preencha todos os campos')
  }
}
   
  return(
    <View style={styles.container}>
     <StatusBar backgroundColor="#27282D"/>
    {<Image style={{marginBottom:60}} source={require('../assets/img/logo.png')} /> }

    <TextInput placeholder="Digite seu Nome" style={styles.textPut} value={nome} onChangeText={setNome} />
    <TextInput placeholder="Digite seu E-mail" style={styles.textPut} value={email} onChangeText={setEmail} />
    <TextInput secureTextEntry={true} placeholder="Digite sua Senha" style={styles.textPut} value={senha} onChangeText={setSenha} />

    <TouchableOpacity style={styles.btnCadastro} onPress={() => cadastro()}>
      <Text style={{color:'white', textAlign:'center'}}>CADASTRAR</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btnLogin}>
          <Text style={styles.LoginText}>Já tem um cadastro? <Text style={styles.btnRedirecionar}>Entrar</Text></Text>
    </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#27282D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
 },
 textPut: {
   width: '100%',
   height: 40,
   backgroundColor: 'white',
   borderRadius: 7,
   paddingLeft: 10,
   marginBottom: 10,
 },
  btnCadastro: {
  width: '100%',
  height: 40,
  backgroundColor: '#7b42f5',
  borderRadius: 20,
  justifyContent: 'center',
},
  btnLogin:{
    marginTop:10,
  },
  LoginText:{
    color: 'white',
  },
  btnRedirecionar:{
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});
