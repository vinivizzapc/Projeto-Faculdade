import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';


export default function CadastroScreen ({navigation}){

  const [usuario, setUsuario] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastro = () => {
    console.log("Cadastrou")    
   
    //Fazer chamada no back-end para cadastro. 
  }

  
  return(
    <View style={styles.container}>
     <StatusBar backgroundColor="#27282D"/>
    {<Image style={{marginBottom:60}} source={require('../assets/img/logo.png')} /> }

    <TextInput placeholder="Digite seu Nome" style={styles.textPut} onChangeText={value=>setNome(value)} />
    <TextInput placeholder="Digite seu E-mail" style={styles.textPut} onChangeText={value=>setEmail(value)} />
    <TextInput secureTextEntry={true} placeholder="Digite sua Senha" style={styles.textPut} onChangeText={value=>setSenha(value)} />

    <TouchableOpacity style={styles.btnCadastro} onPress={()=>cadastro()}>
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
