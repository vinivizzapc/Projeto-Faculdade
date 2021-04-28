import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CadastroScreen from './CadastroScreen';
import LoginScreen from './LoginScreen';
import App from '../App';
import DrawerContent from '../components/DrawerContent';

const RootStack = createStackNavigator();

const StackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="Cadastro" component={CadastroScreen}/>
        <RootStack.Screen name="Login" component={LoginScreen}/>
        <RootStack.Screen name="DrawerContent" component={DrawerContent}/>
    </RootStack.Navigator>
);

export default StackScreen;