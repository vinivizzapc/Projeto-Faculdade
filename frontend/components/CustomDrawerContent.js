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

function DrawerContent(props) {
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
          <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
              <View style={styles.userInfoSection}>
                  <View style={{flexDirection:'row', marginTop: 15}}>
                      <Avatar.Image source={{uri:'https://scontent.fgru11-1.fna.fbcdn.net/v/t1.18169-9/11836710_850418251732564_7796996506950551796_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_eui2=AeEsBkz-SClh2Kjij7DVAZLAJXHUwEx1UvwlcdTATHVS_HYIuXcjm1dNLt3czmXoGq0I48f09zJPjJtDIZRtdjUk&_nc_ohc=msbZ8AdLzPgAX-Vw7qr&_nc_ht=scontent.fgru11-1.fna&oh=780c602955408093d5146d06061d1db6&oe=60AC17BD'}} size={50}/>
                  <View style={{marginLeft:15, flexDirection:'column'}}>
                      <Title style={styles.title}>{user.nome}</Title>
                      <Caption style={styles.caption}>{user.email}</Caption>
                  </View> 
              </View>   
          </View>
          <View style={styles.itemList}>
              <DrawerItemList {...props}/>
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

export default DrawerContent;

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