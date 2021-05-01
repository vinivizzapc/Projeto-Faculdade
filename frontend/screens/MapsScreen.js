import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaViewBase, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Icon, Footer, Separator, Right } from 'native-base';
import {Avatar} from 'react-native-paper';
import css from '../style/css';
import api from '../services/api';

function MapsScreen({ navigation }){

  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    async function listagem(){
      const response = await api.get('/usuarios')
      setUsuarios(response.data)
    }
    listagem()
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
          <View style={css.IconPosicao}>
            <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
          </View>
        </View> 

      <View>
          <SafeAreaView>
            <ScrollView>

            <View>
              <FlatList 
                data={usuarios}
                keyExtractor={item => item.idusuario}
                renderItem={({ item }) => (
                  <View style={styles.item} >
                  
                  <View style={{ flex:1, flexDirection:'row', backgroundColor:'white', borderWidth: 0.2, borderColor: 'grey',  height:85, alignItems:'center'}}>
                    <View style={{justifyContent:'center', paddingLeft:15}}>
                      <Avatar.Image style={{}} source={{uri:'https://scontent.fgru11-1.fna.fbcdn.net/v/t1.18169-9/11836710_850418251732564_7796996506950551796_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_eui2=AeEsBkz-SClh2Kjij7DVAZLAJXHUwEx1UvwlcdTATHVS_HYIuXcjm1dNLt3czmXoGq0I48f09zJPjJtDIZRtdjUk&_nc_ohc=msbZ8AdLzPgAX-Vw7qr&_nc_ht=scontent.fgru11-1.fna&oh=780c602955408093d5146d06061d1db6&oe=60AC17BD'}} size={50}/>
                    </View>
                    <View style={{paddingLeft:20}}>
                      <Text style={{color: 'black', fontSize:18}}>
                        {item.nome}
                      </Text>
                      <Text style={{color: 'grey', fontSize:14}}>
                        {item.email}
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
        <Footer style={{backgroundColor:"#008B8B", justifyContent:'flex-end'}}/>
    </View>
  );
}


export default MapsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  
  });

