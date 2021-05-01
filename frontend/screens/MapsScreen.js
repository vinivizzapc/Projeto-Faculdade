import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions, SafeAreaViewBase, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Icon, Footer, Separator, Right, ListItem } from 'native-base';
import {Avatar} from 'react-native-paper';
import css from '../style/css';
import api from '../services/api';
import MapView, { Marker } from 'react-native-maps';

export default function MapsScreen() {
  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={customStyle}
        style={styles.mapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker 
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Local de Entrega"
          description="Ruas das Palmeiras, 25"
          icon={{ 
            uri: "https://img.icons8.com/plasticine/1x/truck.png" 
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%'
  }
});
