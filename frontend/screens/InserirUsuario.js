import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Icon, Footer } from 'native-base';
import css from '../style/css';

function InserirUsuario({ navigation }){

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
        <View style={{marginLeft:10}}>
          <Icon name="menu" onPress={() => navigation.openDrawer()}/>
        </View>
        </View> 
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text>InserirUsuario</Text>
      </View>
      <Footer style={css.containerFooter}/>
    </View>
  );
}

export default InserirUsuario;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
