import React, {useEffect, useState} from 'react';
import { StyleSheet, View, StatusBar, Dimensions, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import css from '../style/css';
import api from '../services/api';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapsScreen({ navigation }) {
  const [locais, setLocais] = useState([]);
  const [currentRegion, setCurrentRegion] = useState({});
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    async function loadInitalPosition() {
        const { granted } = await requestForegroundPermissionsAsync();

        if(granted) {
            const { coords } = await getCurrentPositionAsync({
              enableHighAccuracy: true
            });

            const { latitude, longitude } = coords;

            setCurrentRegion({
                latitude, 
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04
            });
        }
    }

    loadInitalPosition();
  }, []);

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
      return null;
  }

  useEffect(() => {
    async function listagem(){
      const response = await api.get('/locais');
      setLocais(response.data);
    }

    async function getUser(){
      const user = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(user);
      setUsuario(jsonValue);
    }

    getUser();
    listagem();
  }, [locais]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
      <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={() => navigation.openDrawer()}/>
        </View>
      </View> 
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <MapView
          onRegionChangeComplete={handleRegionChanged}
          style={styles.mapStyle}
          initialRegion={currentRegion}
        >
          {locais.map(local => (
            <Marker
              key={local.idlocais} 
              coordinate={{
                latitude: local.latitude,
                longitude: local.longitude,
              }}
            >
              <Image style={styles.avatar} source={{ uri: local.imagem }} />
              <Callout onPress={() => { navigation.navigate('DetalhesMapa', { screen: 'DetalhesMapa', params: { localSelecionado: local, user: usuario.idusuario } }) }}>
                <View style={styles.callout}>
                  <Text style={styles.tipo}>{local.tipo}</Text>
                  <Text style={styles.nome}>{local.nome}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%'
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 160
  },

  tipo: {
    fontWeight: 'bold',
    fontSize: 16
  },

  nome: {
    color: '#666',
    marginTop: 5
  }
});
