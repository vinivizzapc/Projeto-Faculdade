import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, FlatList, SafeAreaView, Image, ScrollView } from 'react-native';
import { Icon, Footer, Separator} from 'native-base';
import css from '../style/css';
import api from '../services/api';
import { Ionicons, FontAwesome5} from '@expo/vector-icons';

function ListUsuarioScreen({ navigation }){
  
  const [usuarios, setUsuarios] = useState([]);
  const [Administradores, setAdministradores] = useState([])

  useEffect(() => {
    async function listagem(){
      const responseUsu = await api.get('/usuariosUsu');
      setUsuarios(responseUsu.data);
      const responseAdm = await api.get('/usuariosAdm');
      setAdministradores(responseAdm.data);
    }
    listagem();
  }, [usuarios]);

  function editarUsuario(usuario) {
    usuario.edit = true;
    navigation.navigate('InserirUsuario', {
      screen: 'InserirUsuario',
      params: { user: usuario }
    });
  }

  function criarUsuario(){
    var usuario = new Object();
    usuario.edit = false;
    navigation.navigate('InserirUsuario', {
      screen: 'InserirUsuario',
      params: { user: usuario }
    });
  }

  async function excluir(id) {
    await api.delete(`/usuarios/${id}`);
  }

  function excluirUsuario(idusuario) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          excluir(idusuario)
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
          <View style={{marginLeft:10}}>
            <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
          </View>
          <View style={{marginRight:10}}>
            <Ionicons name="add-sharp" size={30} color="black" onPress={() => criarUsuario()}/>
          </View>
        </View> 

      <View style={{flex:1}} >
          <ScrollView>
              <View>  
                <Separator style={styles.itemDivisao}>
                  <View style={styles.divisaoItem}>
                    <Text style={styles.divisao}>Administradores</Text>
                  </View>
                </Separator>
                  <FlatList 
                    nEndReachedThreshold={0.1}
                    data={Administradores}
                    keyExtractor={item => item.idusuario.toString()}
                    renderItem={({ item }) => (

                      <View style={{ flex: 1,flexDirection: 'row',backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:3,borderBottomWidth:3,}}>           
                          <View style={{margin:11}}>
                            <Image style={{width:50,height:50}} source={{ uri: item.imagem }}/>
                          </View>
                            <View style={{flex:1,justifyContent:'center'}}>
                              <Text style={{color: 'black', fontSize:16,}}>
                                {item.nome}
                              </Text>

                              <Text style={{color: 'red', fontSize:12,}}>
                                {item.email}
                              </Text>
                            </View>
                          <View style={{paddingLeft:10, justifyContent:'center', alignItems:'center' }}>
                            <TouchableOpacity  onPress={() => editarUsuario(item)}>
                              <FontAwesome5 name="edit" size={24} style={{color: 'orange'}} />
                            </TouchableOpacity>
                          </View>
                          <View style={{paddingLeft:15, justifyContent:'center', alignItems:'center', marginRight:13}}>
                            <TouchableOpacity  onPress={() => excluirUsuario(item.idusuario)}>
                              <FontAwesome5 name="trash" size={24} style={{color: 'red'}} />
                            </TouchableOpacity>
                          </View>
                      </View>
                    )}/>
              </View>   
              <View>  
                <Separator style={styles.itemDivisao}>
                  <View style={styles.divisaoItem}>
                    <Text style={styles.divisao}>Usuários</Text>
                  </View>
                </Separator>
                  <FlatList 
                    nEndReachedThreshold={0.1}
                    data={usuarios}
                    keyExtractor={item => item.idusuario.toString()}
                    renderItem={({ item }) => (

                      <View style={{ flex: 1,flexDirection: 'row',backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:3,borderBottomWidth:3,}}>           
                          <View style={{margin:11}}>
                            <Image style={{width:50,height:50}} source={{ uri: item.imagem }}/>
                          </View>
                            <View style={{flex:1,justifyContent:'center'}}>
                              <Text style={{color: 'black', fontSize:16,}}>
                                {item.nome}
                              </Text>

                              <Text style={{color: 'red', fontSize:12,}}>
                                {item.email}
                              </Text>
                            </View>
                          <View style={{paddingLeft:10, justifyContent:'center', alignItems:'center' }}>
                            <TouchableOpacity  onPress={() => editarUsuario(item)}>
                              <FontAwesome5 name="edit" size={24} style={{color: 'orange'}} />
                            </TouchableOpacity>
                          </View>
                          <View style={{paddingLeft:15, justifyContent:'center', alignItems:'center',marginRight:13}}>
                            <TouchableOpacity  onPress={() => excluirUsuario(item.idusuario)}>
                              <FontAwesome5 name="trash" size={24} style={{color: 'red'}} />
                            </TouchableOpacity>
                          </View>
                      </View>
                    )}/>
              </View>   
          </ScrollView>
        </View>
        <Footer style={{backgroundColor:'#008B8B'}}/>
    </View>
  );
}

export default ListUsuarioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  divisao:{
    fontSize:17,
    fontWeight: 'bold',    
    paddingVertical:6.5,
    color:'white'
  },
  divisaoItem:{
    width: 500,
    height:35,
    
  },
  itemDivisao:{
    padding: 4,
    borderBottomColor:'#616161',
    borderRightColor:'#616161',
    borderRightWidth:3,
    borderBottomWidth:3,
    marginBottom: 7,
    borderRadius: 5, 
    backgroundColor:'#616161',
    margin:10,
    width:390,
  },
  
});