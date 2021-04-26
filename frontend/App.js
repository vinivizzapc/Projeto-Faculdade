import * as React from 'react';
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
// import { PrevencoesScreen } from './screens/PrevencoesScreen';


  const Drawer = createDrawerNavigator();
  

export default function App() {
  return (
    <NavigationContainer>
     

      <Drawer.Navigator initialRouteName="Home">

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

        <Drawer.Screen name="Cadastrar-se" component={CadastroScreen} />

        <Drawer.Screen name="Login" component={LoginScreen} />
              
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

console.disableYellowBox = true;