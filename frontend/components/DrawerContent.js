import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, View, TouchableOpacity, Image, StatusBar, Icon } from 'react-native';
import React, { useState, useEffect } from 'react';
import HomeScreen from '../screens/HomeScreen';
import PrevencoesScreen from '../screens/PrevencoesScreen';
import MapsScreen from '../screens/MapsScreen';
import MinhasConsultasScreen from '../screens/MinhasConsultasScreen';
import AgendaConsultaScreen from '../screens/AgendaConsultaScreen';
import FavoritosScreen from '../screens/FavoritosScreen';
import ListUsuarioScreen from '../screens/ListUsuarioScreen';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import CustomDrawerContent from './CustomDrawerContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InserirUsuario from '../screens/InserirUsuario';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerAdm from '../components/DrawerAdm';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Usuarios = ({navigation}) => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="Usuarios"
        component={ListUsuarioScreen}
      />
    </Stack.Navigator>
  );
};

const inserirUsu = ({navigation}) => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name="InserirUsuario"
        component={InserirUsuario}
      />
    </Stack.Navigator>
  );
};

function DrawerContent() {
  const [status , setStatus] = useState(0);

  useEffect(() => {
    async function CheckUser(){
      const usuario = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(usuario);
      setStatus(jsonValue.status);
    }

    CheckUser();
  }, []);

  return (
    status == 0 ? (
      <Drawer.Navigator drawerContent={props=><CustomDrawerContent {...props}/>} initialRouteName="Home">
        <Drawer.Screen options={{ title: 'Home',  drawerIcon: ({focused, size}) => (<Ionicons name="home" size={24} color="black" />),}} name="Home" component={HomeScreen} />
        <Drawer.Screen options={{ title: 'Prevenções',  drawerIcon: ({focused, size}) => (<FontAwesome5 name="shield-virus" size={24} color="black" />),}} name="Prevenções" component={PrevencoesScreen} />
        <Drawer.Screen options={{ title: 'Localizar',  drawerIcon: ({focused, size}) => (<Feather name="map-pin" size={24} color="black" />),}} name="Localizar" component={MapsScreen} />
        <Drawer.Screen options={{ title: 'Minhas Consultas',  drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name="clipboard-pulse-outline" size={24} color="black" />),}} name="Minhas Consultas" component={MinhasConsultasScreen} />
        <Drawer.Screen options={{ title: 'Agendar Consultas',  drawerIcon: ({focused, size}) => (<FontAwesome5 name="calendar-alt" size={24} color="black" />),}} name="Agendar Consultas" component={AgendaConsultaScreen} />
        <Drawer.Screen options={{ title: 'Favoritos',  drawerIcon: ({focused, size}) => (<Ionicons name="star" size={24} color="black" />),}} name="Favoritos" component={FavoritosScreen} />
      </Drawer.Navigator>
    )
    :
    <Drawer.Navigator
    drawerContent={(props) => {
      const filteredProps = {
        ...props,
        state: {
          ...props.state,
          routeNames: props.state.routeNames.filter(
            (routeName) => {
              routeName !== 'InserirUsuario'
              && routeName !== 'HiddenPage2';
            },
          ),
          routes: props.state.routes.filter(
            (route) =>
              route.name !== 'InserirUsuario'
              && route.name !== 'HiddenPage2',
          ),
        },
      };
      return (
        <DrawerAdm {...filteredProps}/>
        // <DrawerContentScrollView {...filteredProps}>
        //   <DrawerItemList {...filteredProps} />
        // </DrawerContentScrollView>
      );
    }}>
    <Drawer.Screen
      name="Usuarios"
      options={{drawerLabel: 'Usuarios'}}
      component={Usuarios}
    />
    <Drawer.Screen
      name="InserirUsuario"
      options={{drawerLabel: 'Inserir Usuario'}}
      component={inserirUsu}
    />
  </Drawer.Navigator>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 15 ,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemList: {
      marginTop:10,
  }
});