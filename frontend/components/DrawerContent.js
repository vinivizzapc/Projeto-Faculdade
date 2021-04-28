import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { StyleSheet, View, YellowBox, SafeAreaView, Image, ScrollView} from 'react-native';
import { Container, Content, StatusBar, Footer, Button, Header } from 'native-base';
import React from 'react';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    useTheme,
    Avatar,
    Title,
    Drawer,
    Caption,
    Paragraph,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


function DrawerContent(props) {

  function signOut(){
    AsyncStorage.removeItem('usuario');
  }

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection:'row', marginTop: 15}}>
                        <Avatar.Image source={{uri:'https://scontent.fgru11-1.fna.fbcdn.net/v/t1.18169-9/11836710_850418251732564_7796996506950551796_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_eui2=AeEsBkz-SClh2Kjij7DVAZLAJXHUwEx1UvwlcdTATHVS_HYIuXcjm1dNLt3czmXoGq0I48f09zJPjJtDIZRtdjUk&_nc_ohc=msbZ8AdLzPgAX-Vw7qr&_nc_ht=scontent.fgru11-1.fna&oh=780c602955408093d5146d06061d1db6&oe=60AC17BD'}} size={50}/>
                    <View style={{marginLeft:15, flexDirection:'column'}}>
                        <Title style={styles.title}>Pradip Debnath</Title>
                        <Caption style={styles.caption}>@itzpradip</Caption>
                    </View> 
                </View>   
            </View>
            <View style={styles.itemList}>
            <Drawer.Section>
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
            </Drawer.Section>          
            </View>
            </View>            
              </DrawerContentScrollView>
              <Drawer.Section style={styles.bottomDrawerSection}>
                      <DrawerItem 
                          icon={({color, size}) => (
                              <Icon name="exit-to-app" color={color} size={size}/>)} label="Sign Out" onPress={signOut} />
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