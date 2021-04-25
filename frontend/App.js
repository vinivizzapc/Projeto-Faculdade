import React from 'react';

import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import FavoritosScreen from './screens/FavoritosScreen';
import MapsScreen from './screens/MapsScreen';
import AgendaConsultaScreen from './screens/AgendaConsultaScreen';
import MinhasConsultaScreen from './screens/MinhasConsultaScreen';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';


const {width} = Dimensions.get('window');
export default class App extends React.Component{

  render() {
  return (
      <AppDrawerNavigator />
    );
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{height:150, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
      <Image source={require('./assets/ftperfil.png')} style={{height:80,width:80,borderRadius:60, }}/>
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Mapa: MapsScreen,
  'Agende sua consulta': AgendaConsultaScreen,
  'Minhas consultas': MinhasConsultaScreen,
  Favoritos: FavoritosScreen,
  Login: LoginScreen,
  Cadastro: CadastroScreen,
},{
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: 'orange'
    }
  })


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

console.disableYellowBox = true;