import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, StatusBar, TouchableOpacity, Alert, Image } from 'react-native';
import { Icon, Picker } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/api';
import * as ImagePicker from 'expo-image-picker';

function InserirLocais({ navigation }){
  
  const [image, setImage] = useState('https://portal.globehealer.com/assets/placeholder_hospital-fb4c56a14e7b2fbb1ce1eb713b15b9f38243c1fb93742710da14ac22719efab7.png');
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [tipo, setTipo] = useState('Hospital');
  const [descricao, setDescricao] = useState('');

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
        descricao:descricao,
        imagem: image
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
            <View style={{paddingTop:7, marginRight:35}}>
              <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={styles.text_header}>Cadastro de Local</Text>
            </View>
          </View>
          
          <View style={styles.footer}>
          
          <View style={{ flexDirection:'row', justifyContent:'flex-start', marginBottom:5, paddingBottom:15,  }}>
            <Image 
              source={{ uri: image ? image : 'https://portal.globehealer.com/assets/placeholder_hospital-fb4c56a14e7b2fbb1ce1eb713b15b9f38243c1fb93742710da14ac22719efab7.png' }} 
              style={styles.avatar} 
            />
            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.botaoImagem} >
              <TouchableOpacity onPress={pickImage}>
                <Text style={{fontSize:16,color:'white',fontWeight:'bold', textAlign:'center', }}>Escolher imagem</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

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
              <View>
                <Picker
                  selectedValue={tipo}
                  style={{ height: 50, width: '100%', marginBottom: 10, color:'black'}}
                  onValueChange={itemValue => setTipo(itemValue)}
                > 
                  <Picker.Item label="Hospital" value="Hospital" />
                  <Picker.Item label="Posto de vacinação" value="Posto de vacinação" />
                  <Picker.Item label="Local para exame" value="Local para exame" />
                </Picker>
              </View>

             
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

export default InserirLocais;

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
      marginRight:90
  },
  footer: {
      flex: 10,
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
      marginTop: 30,
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
