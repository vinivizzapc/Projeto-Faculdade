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
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState(0);

  async function cadastro() {
    if(nome != '' && email != '' && senha != ''){
      const usuario = {
        nome:nome,
        email:email,
        senha:senha,
        status:status
      }

      const response = await api.post('/usuarios', usuario)

      if(response.data != null){
        setNome('');
        setSenha('');
        setEmail('');
        setStatus(0);
        navigation.navigate('Usuarios');
      }else{
        Alert.alert('OOPS!', 'Erro ao Cadastrar o Usuário', [
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
          <Text style={[styles.text_footer,{marginTop:15}]}>Tipo de usuário</Text>
              <Picker
                selectedValue={status}
                style={{ height: 50, width: '100%', marginBottom: 10, color:'black'}}
                onValueChange={itemValue => setStatus(itemValue)}
              > 
                <Picker.Item label="Comum" value="0" />
                <Picker.Item label="Administrador" value="1" />
              </Picker>
            <Text style={styles.text_footer}>Nome</Text>
            <View style={styles.action}>
              <FontAwesome 
                name="user-o"
                color="#05375a"
                size={20}
                paddingLeft={15}
              />
              <TextInput placeholder="Seu Name" style={styles.TextInput} value={nome} onChangeText={setNome} autoCapitalize="none"/></View>
              <Text style={[styles.text_footer,{marginTop:15}]}>Email</Text>
              <View style={styles.action}>
                <Feather 
                  name="mail"
                  color="#05375a"
                  size={20}
                  paddingLeft={15}
                />
                <TextInput placeholder="Seu Email" style={styles.TextInput} value={email} onChangeText={setEmail} autoCapitalize="none"/>
              </View>
              <Text style={[styles.text_footer,{marginTop:15}]}>Senha</Text>
              <View style={styles.action}>  
                <FontAwesome 
                  name="lock"
                  color="#05375a"
                  size={20}
                  paddingLeft={30}
                  paddingTop={50}
                />
                <TextInput placeholder="Sua senha" style={styles.TextInput} value={senha} secureTextEntry={true} onChangeText={setSenha} autoCapitalize="none"/>
              </View>
             
              <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} onPress={() => cadastro()}>
                  <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.signIn}>
                    <Text style={[styles.textSign, {color:'#fff'}]}>Cadastrar</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Usuarios')} style={[styles.signIn, { borderColor: '#008B8B', borderWidth: 1, marginTop: 15 }]} >
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
