import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, StatusBar, TouchableOpacity, Alert, Image } from 'react-native';
import { Icon, Picker } from 'native-base';
import { AntDesign } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

function InserirPrevencoes({ route, navigation }){

  const { prevencao } = route.params;

  const [image, setImage] = useState('https://media.istockphoto.com/vectors/stop-coronavirus-icon-sign-of-forbidden-virus-black-viral-microbe-in-vector-id1214370284');
  const [tipo, setTipo] = useState(prevencao.tipo);
  const [texto, setTexto] = useState(prevencao.texto);
  const [usuario, setUsuario] = useState({});

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
      setTipo(prevencao.tipo);
      setTexto(prevencao.texto);
      setUsuario({})
    }
    AtualizarDados();

    async function getUser(){
      const user = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(user);
      setUsuario(jsonValue);
    }
    getUser();
  }, [prevencao]);


  function cancelar(){
    setTipo('')
    setTexto('');
    setUsuario('');
    navigation.navigate('Prevencoes')
  }

  async function update() {
    if(tipo != '' && texto != ''){
      const prevencao = {
        tipo:tipo,
        texto:texto,
        idUsuario:usuario.idusuario
      }

      const response = await api.put(`/prevencoes/${prevencao.idPrevencao}`, prevencao)

      if(response.data != null){
        setTipo('Higiene');
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

  async function cadastro() {
    if(tipo != '' && texto != ''){
      const prevencao = {
        tipo:tipo,
        texto:texto,
        idUsuario:usuario.idusuario,
        imagem: image
      }

      const response = await api.post('/prevencoes', prevencao)

      if(response.data != null){
        setTipo('Higiene');
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
            <View style={{paddingTop:7, marginRight:20, }}>
              <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
            </View>
            <Text style={styles.text_header}>Cadastrar Prevenção</Text>
          </View>
          <View style={styles.footer}>
          <Text style={[styles.text_footer]}>Tipo de prevenção</Text>
          <View>
              <Picker
                selectedValue={tipo}
                style={{ height: 50, width: '100%', marginBottom: 5, color:'black'}}
                onValueChange={itemValue => setTipo(itemValue)}
              > 
                <Picker.Item label="Higiene" value="Higiene" />
                <Picker.Item label="Mental" value="Mental" />
                <Picker.Item label="Fisica" value="Fisica" />
                <Picker.Item label="Alimentação" value="Alimentação" />
              </Picker>
            </View>
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
              <Text style={styles.text_footer}>Texto descrição</Text>   
              <View style={{ flexDirection:'row', justifyContent:'flex-start', paddingVertical:5, paddingBottom:20, paddingTop:30  }}>
                <Image 
                  source={{ uri: image ? image : 'https://media.istockphoto.com/vectors/stop-coronavirus-icon-sign-of-forbidden-virus-black-viral-microbe-in-vector-id1214370284' }} 
                  style={styles.avatar} 
                />
                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.botaoImagem} >
                  <TouchableOpacity onPress={pickImage}>
                    <Text style={{fontSize:16,color:'white',fontWeight:'bold', textAlign:'center', }}>Escolher imagem</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View style={styles.button}>
                {
                  prevencao.edit == false ? (
                    <TouchableOpacity style={styles.signIn} onPress={() => cadastro()}>
                      <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.signIn}>
                        <Text style={[styles.textSign, {color:'#fff'}]}>Incluir</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )
                  :
                    <TouchableOpacity style={styles.signIn} onPress={() => update()}>
                      <LinearGradient colors={['#008B8B', '#008B8B']} style={styles.signIn}>
                        <Text style={[styles.textSign, {color:'#fff'}]}>Editar</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                }
                
                <TouchableOpacity onPress={() => cancelar()} style={[styles.signIn, { borderColor: '#008B8B', borderWidth: 1, marginTop: 15 }]} >
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingLeft:30,
    flexDirection:'row',
    alignItems:'flex-start',
    marginRight:70,
    
  },
  footer: {
      flex: 8,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30,
      
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18,
      marginTop: 15,
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
      marginLeft: 15,
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
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
