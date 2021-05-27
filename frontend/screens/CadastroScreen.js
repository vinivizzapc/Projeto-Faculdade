import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/api';
import {AuthContext} from '../components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function CadastroScreen ({navigation}){
  const [image, setImage] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {signUp} = React.useContext(AuthContext); 

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function cadastro() {
    if(nome != '' && email != '' && senha != ''){
      const usuario = {
        nome:nome,
        email:email,
        senha:senha,
        status:0,
        imagem: image
      }
      const response = await api.post('/usuarios', usuario)

      if(response.data != null){
        const jsonValue = JSON.stringify(response.data)
        await AsyncStorage.setItem('user', jsonValue)
        signUp()
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
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <View style={styles.imagem}>
        <Image 
          source={{ uri: image ? image : 'https://www.ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png' }} 
          style={styles.avatar} 
        />
        <TouchableOpacity style={styles.botaoImagem} onPress={pickImage}>
          <Text>Escolher imagem</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>

      <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
          <FontAwesome 
            name="user-o"
            color="#05375a"
            size={20}
            paddingLeft={15}
          />
          
        <TextInput placeholder="Your Name" style={styles.TextInput} value={nome} onChangeText={setNome} autoCapitalize="none"/></View>

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
          <TextInput placeholder="Your Password" style={styles.TextInput} value={senha} secureTextEntry={true} onChangeText={setSenha} autoCapitalize="none"/>
          </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn} onPress={() => cadastro()}>
                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                  <Text style={[styles.textSign, {color:'#fff'}]}>Sign Up</Text>
                  </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => navigation.navigate('Login')} style={[styles.signIn, { borderColor: '#009387', borderWidth: 1, marginTop: 15 }]} >
                <Text style={[styles.textSign, { color: '#009387'}]}>Sign In</Text>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  botaoImagem: {
    width: 150,
    height: 50,
    borderRadius: 3,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center'
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
      marginTop: 35,
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
