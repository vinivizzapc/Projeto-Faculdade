import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Icon, Footer } from 'native-base';
import css from '../style/css';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }){

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={()=>navigation.openDrawer()}/>
        </View>
        </View> 
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text>HomeScreens</Text>
      </View>
      <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
