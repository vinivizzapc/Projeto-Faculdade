import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from './Context';
import {
    Avatar,
    Title,
    Drawer,
    Caption
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DrawerAdm(filteredProps) {
  const {signOut} = React.useContext(AuthContext);

  async function deslogar() {
    await AsyncStorage.removeItem('user');
    signOut();
  }

  const [user , setUser] = useState({});

  useEffect(() => {
    async function CheckUser(){
      const usuario = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(usuario);
      setUser(jsonValue);
    }

    CheckUser();
  }, []);

  return (
      <View style={{flex:1}}>
        <DrawerContentScrollView {...filteredProps}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection:'row', marginTop: 15}}>
                  <Avatar.Image style={{backgroundColor: 'white'}} source={{uri: user.imagem}} size={50}/>
                  <View style={{marginLeft:15, flexDirection:'column'}}>
                      <Title style={styles.title}>{user.nome}</Title>
                      <Caption style={styles.caption}>{user.email}</Caption>
                  </View> 
              </View>   
            </View>
            <View style={styles.itemList}>
              <DrawerItemList {...filteredProps}/>
            </View>
        </View>            
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem 
                icon={({color, size}) => (
                    <Icon 
                    name="exit-to-app" 
                    color={color}
                    size={size}
                    />
                )}
                label="Sign Out"
                onPress={() => {deslogar()}}
            />
      </Drawer.Section>
    </View>
  );
}

export default DrawerAdm;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
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