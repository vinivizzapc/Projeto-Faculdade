import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import PrevencoesScreen from '../screens/PrevencoesScreen';
import MapsScreen from '../screens/MapsScreen';
import MinhasConsultasScreen from '../screens/MinhasConsultasScreen';
import AgendaConsultaScreen from '../screens/AgendaConsultaScreen';
import FavoritosScreen from '../screens/FavoritosScreen';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

function DrawerContent() {
  return (
    <Drawer.Navigator drawerContent={props=><CustomDrawerContent {...props}/>} initialRouteName="Home">
        <Drawer.Screen options={{ title: 'Home',  drawerIcon: ({focused, size}) => (<Ionicons name="home" size={24} color="black" />
          ),}} name="Home" component={HomeScreen} />

        <Drawer.Screen options={{ title: 'Prevenções',  drawerIcon: ({focused, size}) => (<FontAwesome5 name="shield-virus" size={24} color="black" />
          ),}} name="Prevenções" component={PrevencoesScreen} />

        <Drawer.Screen options={{ title: 'Localizar',  drawerIcon: ({focused, size}) => (<Feather name="map-pin" size={24} color="black" />
          ),}} name="Localizar" component={MapsScreen} />

        <Drawer.Screen options={{ title: 'Minhas Consultas',  drawerIcon: ({focused, size}) => (<MaterialCommunityIcons name="clipboard-pulse-outline" size={24} color="black" />
          ),}} name="Minhas Consultas" component={MinhasConsultasScreen} />

        <Drawer.Screen options={{ title: 'Agendar Consultas',  drawerIcon: ({focused, size}) => (<FontAwesome5 name="calendar-alt" size={24} color="black" />
          ),}} name="Agendar Consultas" component={AgendaConsultaScreen} />

        <Drawer.Screen options={{ title: 'Favoritos',  drawerIcon: ({focused, size}) => (<Ionicons name="star" size={24} color="black" />
          ),}} name="Favoritos" component={FavoritosScreen} />
      </Drawer.Navigator>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
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