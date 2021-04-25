import React, {Component} from 'react';
import {  StyleSheet, Text, View, StatusBar } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import { MaterialCommunityIcons   } from '@expo/vector-icons';
import css from '../style/css';

class MinhasConsultaScreen extends Component {

  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
        <MaterialCommunityIcons name="clipboard-pulse-outline" style={{fontSize:24, color:tintColor}} />
    )
}

render() {
return (
  <View style={styles.container}>
     <StatusBar backgroundColor="#303f9f"/>
      <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()}/>
        </View>
      </View> 
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Text>MinhasConsultaScreen</Text>
      </View>
  </View>
  );
}
}

export default MinhasConsultaScreen;

const styles = StyleSheet.create({
container: {
  flex: 1
},
});
