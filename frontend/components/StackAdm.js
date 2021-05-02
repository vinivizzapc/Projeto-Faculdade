import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CadastroScreen from '../screens/CadastroScreen';
import LoginScreen from '../screens/LoginScreen';
import DrawerContent from './DrawerContent';
import InserirUsuario from '../screens/InserirUsuario';
import ListUsuarioScreen from '../screens/ListUsuarioScreen';

const RootStack = createStackNavigator();

const StackAdm = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="InserirUsuario" component={InserirUsuario}/>
        <RootStack.Screen name="ListUsuarioScreen" component={ListUsuarioScreen}/>
    </RootStack.Navigator>

);

export default StackAdm;