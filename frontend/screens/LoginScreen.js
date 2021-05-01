import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { AuthContext } from '../components/Context';

export default function LoginScreen ({navigation}) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {signIn} = React.useContext(AuthContext);
  
  async function logar() {

    const credenciais = {
      email: email,
      senha: senha
    }

    const response = await api.post('/usuario', credenciais)

    if (response.data.length != 0) {  
      const usuario = response.data;
      await AsyncStorage.setItem('user', JSON.stringify(usuario));
      signIn()
    }else {
      Alert.alert('OOPS!', 'Usuário/Senha inválidos', [
        {text: 'Entendido'}
      ]);
    }

  }

  return (
    <KeyboardAvoidingView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Login Now!</Text>
      </View>
      <View style={styles.footer}>

        <Text style={[styles.text_footer,{marginTop:25}]}>Email</Text>
          <View style={styles.action}>
            <Feather 
              name="mail"
              color="#05375a"
              size={20}
              paddingLeft={15}
            />
              <TextInput placeholder="Your Email" style={styles.TextInput} value={email} onChangeText={setEmail} autoCapitalize="none"/>
          </View>


        <Text style={[styles.text_footer,{marginTop:25}]}>Password</Text>
          <View style={styles.action}>  
              <FontAwesome 
                name="lock"
                color="#05375a"
                size={20}
                paddingLeft={15}
              />
          <TextInput placeholder="Your Password" style={styles.TextInput} value={senha} onChangeText={setSenha} autoCapitalize="none" secureTextEntry={true}/>
          </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn} title="Logar" onPress={() => logar()}>
                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                  <Text style={[styles.textSign, {color:'#fff'}]}>Sign In</Text>
                  </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => navigation.navigate('Cadastro')} style={[styles.signIn, { borderColor: '#009387', borderWidth: 1, marginTop: 15 }]} >
                <Text style={[styles.textSign, { color: '#009387'}]}>Sign Up</Text>
              </TouchableOpacity>
          </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
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
      marginTop: 60,
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
