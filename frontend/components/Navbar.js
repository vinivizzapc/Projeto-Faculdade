import React, {Component} from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';


function Navbar(){

    return(
        <View>
            <Header>
                <Feather name="menu" onPress={()=>this.props.navigation.openDrawer()}/>
            </Header>
        </View> 
    )
}

export default Navbar;