import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaViewBase, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Icon, Footer } from 'native-base';
import css from '../style/css';
import api from '../services/api';

function PrevencoesScreen({ navigation }){

  const [prevencoes, setPrevencoes] = useState([]);
  useEffect(() => {
    async function listagem(){
      const response = await api.get('/prevencoes')
      setPrevencoes(response.data)
      console.log(response.data);
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
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <SafeAreaView>
            <ScrollView>
              <FlatList 
                data={prevencoes}
                renderItem={({prevencao}) => (
                  <View style={styles.item}>
                    <Text>
                      {prevencao.tipo}
                    </Text>
                    <Text>
                      {prevencao.texto}
                    </Text>
                  </View>
                )}
              />         
            </ScrollView>
          </SafeAreaView>
        </View>
        <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
  );
}


export default PrevencoesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20
  },

  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
  }
  });

