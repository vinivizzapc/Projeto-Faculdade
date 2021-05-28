import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions, SafeAreaViewBase, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Icon } from 'native-base';
import css from '../style/css';
import api from '../services/api';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export default function MapsScreen({navigation}) {
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
            <Marker
              key={local.idlocais} 
              coordinate={{
                latitude: local.latitude,
                longitude: local.longitude,
              }}
              title={local.tipo}
              description={local.nome}
              icon={{ 
                uri: "https://img.icons8.com/plasticine/1x/hospital.png" 
              }}
            />
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
  }
});
