import React, {Component, useState, useEffect} from 'react';
import { View, 
  KeyboardAvoidingView, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Keyboard
} from 'react-native';
import {CadastroScreen} from './CadastroScreen';

import { Input, Text } from 'react-native-elements';

import css from '../style/css';

export default function LoginScreen () {

  
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const logar = () => {
    // console.log("logou")
    // console.log(email)
    // console.log(senha)
  }

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 130, y:155}));

  useEffect(() => {
    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4, 
        bounciness: 20
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      })
    ]).start(); 

  }, []);


  function keyboardDidShow(){

    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 90,
        duration: 1,
      }),
      Animated.timing(logo.y, {
        toValue: 105,
        duration: 1,
      }),
    ]).start();

}

  function keyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 1,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 1,
        
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image style={{
          width: logo.x,
          height: logo.y,
          }}
        source={require('../assets/img/logo.png')}
        />
      </View>

      <Animated.View 
      style={[
        styles.container,
        { 
          opacity: opacity,
          transform: [
            { translateY: offset.y }
          ]
        }
        ]}
      >

        <TextInput style={styles.input} placeholder="E-mail" 
        onChangeText={value => setEmail(value)}
        keyboardType="email-address"
        />

         <TextInput style={styles.input} placeholder="Senha"
        onChangeText={value => setSenha(value)}
        secureTextEntry={true}
        />
        <TouchableOpacity style={styles.btnSubmit} title="Logar" onPress={() => logar(alert('Logou-se'))}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Não tem cadastro? <Text style={styles.btnRedirecionar}>Cadastre-se</Text></Text>
        </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>

  );
}


const styles = StyleSheet.create({
  background:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27282D',
  },
  containerLogo:{
    flex: 1,
    justifyContent: 'center',
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%', 
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister:{
    marginTop:10,
  },
  registerText:{
    color: 'white',
  },
  btnRedirecionar:{
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'white'
  },
});

