import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/* Types de navigation */
type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Data: undefined;
  Challenge: undefined;
  DataCurrent: undefined;
  Data50: undefined;
  Data100: undefined;
  Data200: undefined;
  GameL1Activity: undefined;
  GameL2Activity: undefined;
  GameContextL1Activity: undefined;
};

type DataActivityNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DataCurrent'>;

interface NavigationProps {
  navigation: DataActivityNavigationProp;
}

/* Bouton retour */
function ButtonBack({ navigation }: NavigationProps) {
  return (
    <TouchableOpacity 
      style={styles.topLeftImage} 
      onPress={() => navigation.goBack()}
      activeOpacity={0.7}
    >
      <Image 
        source={require('../assets/fleche.png')} 
        style={styles.backIcon} 
        resizeMode="contain" 
      />
    </TouchableOpacity>
  );
}

export default function CurrentDataActivity({ navigation }: NavigationProps) {
  const [region, setRegion] = useState({
    latitude: 48.4084,  // Plouzané, Bretagne
    longitude: -4.6147,
    latitudeDelta: 0.03,   // ✅ réduit pour zoom initial
    longitudeDelta: 0.03,
  });

  const [markers, setMarkers] = useState([
    {
      id: 1,
      coordinate: { latitude: 48.4084, longitude: -4.6147 },
      title: 'Plouzané',
      description: 'Ma position actuelle'
    },
  ]);

  // Fonction pour ajouter un marqueur au clic sur la carte
  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    const newMarker = {
      id: markers.length + 1,
      coordinate,
      title: `Point ${markers.length + 1}`,
      description: 'Nouveau point d\'intérêt'
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <View style={styles.container}>
      <ButtonBack navigation={navigation} />
      
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        onPress={handleMapPress}
        mapType="standard"
        zoomEnabled={true}          // ✅ pinch-to-zoom activé
        zoomControlEnabled={true}   // ✅ boutons de zoom (Android uniquement)
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor="#FFC900"
          />
        ))}
      </MapView>
    </View>
  );
}

/* Design de la page */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  topLeftImage: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    zIndex: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
});
