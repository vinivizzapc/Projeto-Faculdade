import React, {useEffect, useState} from 'react';
import { StyleSheet, View, StatusBar, Dimensions, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import css from '../style/css';
import api from '../services/api';

export default function DetalhesMapa({navigation}) {
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
      <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={() => navigation.openDrawer()}/>
        </View>
      </View> 
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
