import React, {useEffect, useState} from 'react';
import { StyleSheet, View, StatusBar, Dimensions, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import css from '../style/css';
import api from '../services/api';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export default function MapsScreen({ navigation }) {
  const [locais, setLocais] = useState([]);
  const [currentRegion, setCurrentRegion] = useState({});

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
            local.tipo === 'Hospital' ? (
              <Marker
                key={local.idlocais} 
                coordinate={{
                  latitude: local.latitude,
                  longitude: local.longitude,
                }}
                icon={{ 
                  uri: "https://img.icons8.com/plasticine/1x/hospital.png" 
                }}
              >
                <Callout onPress={() => {
                  navigation.navigate('DetalhesMapa');
                }}>
                  <View style={styles.callout}>
                    <Image style={styles.avatar} source={{ uri: local.imagem }} />
                    <Text style={styles.tipo}>{local.tipo}</Text>
                    <Text style={styles.nome}>{local.nome}</Text>
                  </View>
                </Callout>
              </Marker>
            )
            :local.tipo === 'Posto de vacinação' ? (
              <Marker
                key={local.idlocais} 
                coordinate={{
                  latitude: local.latitude,
                  longitude: local.longitude,
                }}
                icon={{ 
                  uri: "https://image.flaticon.com/icons/png/512/963/963471.png",
                  width: 25,
                  height: 25
                }}
              >
              <Callout onPress={() => {
                navigation.navigate('DetalhesMapa');
              }}>
                <View style={styles.callout}>
                  <Image style={styles.avatar} source={{ uri: local.imagem }} />
                  <Text style={styles.tipo}>{local.tipo}</Text>
                  <Text style={styles.nome}>{local.nome}</Text>
                </View>
              </Callout>
            </Marker>
            )
            :
            (
              <Marker
                key={local.idlocais} 
                coordinate={{
                  latitude: local.latitude,
                  longitude: local.longitude,
                }}
                icon={{ 
                  uri: "https://image.flaticon.com/icons/png/512/1754/1754622.png",
                  width: 25,
                  height: 25
                }}
              >
                <Callout onPress={() => {
                  navigation.navigate('DetalhesMapa');
                }}>
                <View style={styles.callout}>
                  <Image style={styles.avatar} source={{ uri: local.imagem }} />
                  <Text style={styles.tipo}>{local.tipo}</Text>
                  <Text style={styles.nome}>{local.nome}</Text>
                </View>
              </Callout>
            </Marker>
            )
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
    width: 65,
    height: 65,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },
  callout: {
    width: 260,
  },
  tipo: {
    fontWeight: 'bold',
    fontSize: 16
  },
  nome: {
    color: '#666',
    marginTop: 5
  },
});
