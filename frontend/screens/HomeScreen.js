import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';
import css from '../style/css';
class HomeScreen extends Component {

    static navigationOptions = {
        drawerIcon : ({tintColor}) => (
            <Icon name="home" style={{fontSize:24, color:tintColor}} />
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
            <Text>HomeScreens</Text>
        </View>
    </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
