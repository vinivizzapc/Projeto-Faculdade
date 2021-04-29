import React, {useState, useEffect} from 'react';

import Stack from './components/StackScreen';
import Drawer from './components/DrawerContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

export default function Routes() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        setTimeout(
        async function buscar(){
            const valor = await AsyncStorage.getItem('usuario');
            setUsuario(valor);
        }, 2000) 
    }, []);

    return (
        <NavigationContainer>
            {
                usuario != null ? (
                    <Drawer /> 
                )
                : 
                <Stack />
            }
        </NavigationContainer>
    );
}