import React, {useState, useEffect} from 'react';
import { Button, View, YellowBox, SafeAreaView, Image, ScrollView} from 'react-native';
import { createDrawerNavigator, DrawerItems } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PrevencoesScreen from './screens/PrevencoesScreen';
import MapsScreen from './screens/MapsScreen';
import MinhasConsultasScreen from './screens/MinhasConsultasScreen';
import AgendaConsultaScreen from './screens/AgendaConsultaScreen';
import CadastroScreen from './screens/CadastroScreen';
import FavoritosScreen from './screens/FavoritosScreen';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Icon } from 'native-base';
import DrawerContent from './components/DrawerContent';
import { createStackNavigator } from '@react-navigation/stack';
import StackScreen from './screens/StackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { PrevencoesScreen } from './screens/PrevencoesScreen';


  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  

function MyStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}


export default function App() {

  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    setTimeout(
      async function buscar(){
        const valor = await AsyncStorage.getItem('usuario');
        setUsuario(valor);
      }, 2000) 
  }, []);





  return (
    <NavigationContainer>

  
      {/* {
        usuario != null ? (
          <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>} initialRouteName="Home">

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
        )
        : 
        <StackScreen/>
      } */}

    </NavigationContainer>
  );
}

console.disableYellowBox = true;

// console.log = console.warn = console.error = () => {};

// // Look ma, no error!
// console.error('Something bad happened.');