import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, StatusBar, TouchableOpacity, Alert, Image } from 'react-native';
import { Icon, Picker } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/api';
import * as ImagePicker from 'expo-image-picker';

function InserirUsuario({ route, navigation }){
  
  const { user } = route.params;

  const [image, setImage] = useState('https://www.ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png');
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState(user.senha);
  const [status, setStatus] = useState(user.status);

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

  useEffect(() => {
    function AtualizarDados(){
      setStatus(user.status);
      setNome(user.nome);
      setSenha(user.senha);
      setEmail(user.email);
    }
  AtualizarDados();

  }, [user]);

  async function Update(){
    if(nome != '' && email != '' && senha != ''){
      const usuario = {
        nome:nome,
        email:email,
        senha:senha,
        status:status
      }

      const response = await api.put(`/usuarios/${user.idusuario}`, usuario)
      if(response.data.msg != null){
        Alert.alert('OOPS!', response.data.msg, [
          {text: 'Entendido'}
        ]);
        return;
      }
      if(response.data != null){
        setNome('');
        setSenha('');
        setEmail('');
        setStatus(0);
        navigation.navigate('Usuarios');
      }else{
        Alert.alert('OOPS!', 'Erro ao Editar o Usuário', [
          {text: 'Entendido'}
        ]);
      }
    }else{
      Alert.alert('OOPS!', 'Preencha todos os campos!', [
        {text: 'Entendido'}
      ]);
    }
  }

  function cancelar(){
    setStatus('');
    setNome('');
    setSenha('');
    setEmail('');
    navigation.navigate('Usuarios')
  }
  

  async function cadastro() {
    if(nome != '' && email != '' && senha != ''){
      const usuario = {
        nome:nome,
        email:email,
        senha:senha,
        status:status,
        imagem: image
      }

      const response = await api.post('/usuarios', usuario)
      if(response.data.msg != null){
        Alert.alert('OOPS!', response.data.msg, [
          {text: 'Entendido'}
        ]);
        return;
      }
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
            <View style={{paddingTop:7, marginRight:35}}>
              <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
            </View>
            <Text style={styles.text_header}>Cadastrar Usuario</Text>
          </View>
          
          <View style={styles.footer}>
          
          <View style={{ flexDirection:'row', justifyContent:'flex-start', paddingVertical:15, paddingBottom:11,  }}>
            <Image 
              source={{ uri: image ? image : 'https://www.ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png' }} 
              style={styles.avatar} 
            />
            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.botaoImagem} >
              <TouchableOpacity onPress={pickImage}>
                <Text style={{fontSize:16,color:'white',fontWeight:'bold', textAlign:'center', }}>Escolher imagem</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={{marginTop:20, marginBottom:5}}>
          <Text style={[styles.text_footer,{marginTop:15}]}>Tipo de usuário</Text> 
            <Picker
              selectedValue={status}
              style={{ height: 50, width: '100%', marginBottom: 10, color:'black'}}
              onValueChange={itemValue => setStatus(itemValue)}
            > 
              <Picker.Item label="Comum" value="0" />
              <Picker.Item label="Administrador" value="1" />
            </Picker>
          </View>
            <Text style={styles.text_footer}>Nome</Text>
            <View style={styles.action}>
              <FontAwesome 
                name="user-o"
                color="#05375a"
                size={20}
                paddingLeft={15}
              />
              <TextInput placeholder="Seu Name" style={styles.TextInput} value={nome} onChangeText={setNome} autoCapitalize="none"/></View>
              <Text style={[styles.text_footer,{marginTop:10}]}>Email</Text>
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
                {
                  user.edit == false ? (
                    <TouchableOpacity style={styles.signIn} onPress={() => cadastro()}>
                      <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.signIn}>
                        <Text style={[styles.textSign, {color:'#fff'}]}>Cadastrar</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )
                  :
                    <TouchableOpacity style={styles.signIn} onPress={() => Update()}>
                      <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.signIn}>
                        <Text style={[styles.textSign, {color:'#fff'}]}>Editar</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                }
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection:'row',
    alignItems:'flex-start',
    marginRight:70
  },
  footer: {
      flex: 11,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 20
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
      marginTop: 20,
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight:30,
    
  },
  botaoImagem: {
    width: 120,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    
  },
});
