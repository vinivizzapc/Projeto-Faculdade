import React, {useState, useEffect} from 'react';

import Stack from './components/StackScreen';
import Drawer from './components/DrawerContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './components/Context';
import { View } from 'react-native';

export default function Routes() {

    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const authContext = React.useMemo(() => ({
        signIn: () => {
            
            setUserToken('');
            setIsLoading(false);
        }, 
        signOut: () => {
            setUserToken(null);
            setIsLoading(false);
        },
        signUp: () => {
            setUserToken('');
            setIsLoading(false);
        }

    }))

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        },1000)
    },[])

    if (isLoading) {
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {
                    userToken != null ? (
                        <Drawer /> 
                    )
                    : 
                    <Stack />
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}