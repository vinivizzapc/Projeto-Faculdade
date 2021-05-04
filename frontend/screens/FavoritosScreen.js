import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaViewBase, FlatList, ScrollView, SafeAreaView, Image, Animated } from 'react-native';
import { Icon, Footer, Separator, Right } from 'native-base';
import css from '../style/css';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FavoritosScreen ({ navigation }){

  const [favoritos, setFavoritos] = useState([]);
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    async function getUser(){
      const user = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(user);
      setUsuario(jsonValue);
    }
    getUser();
  }, [usuario]);

  useEffect(() => {
    async function listagem(){
      const response = await api.get(`/favoritos/${usuario.idusuario}`)
      setFavoritos(response.data)
    }
    listagem()
  }, [favoritos]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
        </View>
        </View> 
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <SafeAreaView>
          <ScrollView>
            <View>
              <FlatList 
                data={favoritos}
                keyExtractor={item => item.idfavoritos.toString()}
                renderItem={({ item }) => (
                  <View style={styles.item} >
                    <View style={styles.prevencao}>
                      <View style={{justifyContent:'center'}}>
                        <Image style={{height:85, width:85, borderWidth: 2, borderRadius: 15, borderColor:'#e53935'}} source={require('../assets/img/logo.png')}/>
                      </View>
                      <View style={{ backgroundColor:'#4fc3f7', marginLeft:10, height:100, width:280, borderRadius: 10, borderWidth: 1, borderColor:'#fff', alignItems:'center', paddingTop:35  }}>
                        <Text style={{color:'#004d40'}}>
                          {item.idlocal}
                        </Text>
                        <Text style={{fontSize:12, paddingLeft:220, paddingTop:20, color:'#004d40'}}>
                          {item.idusuario}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              /> 
            </View>      
          </ScrollView>
        </SafeAreaView>
      </View>
      <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
  );
}

export default FavoritosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
