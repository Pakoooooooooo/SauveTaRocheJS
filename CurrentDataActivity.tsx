import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
        source={require('./assets/fleche.png')} 
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
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [markers, setMarkers] = useState([
    {
      id: 1,
      coordinate: { latitude: 48.4084, longitude: -4.6147 },
      title: 'Plouzané',
      description: 'Ma position actuelle'
    },
    // Tu peux ajouter d'autres marqueurs ici
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
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        onPress={handleMapPress}
        mapType="standard" // Options: 'standard', 'satellite', 'hybrid', 'terrain'
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor="#FFC900" // Couleur jaune de ton thème
          />
        ))}
      </MapView>

      {/* Boutons de contrôle optionnels (tu peux les retirer si tu veux) */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => setRegion({
            latitude: 48.4084,
            longitude: -4.6147,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          })}
        >
          <Image 
            source={require('./assets/fleche.png')} // Utilise une icône de localisation si tu en as
            style={styles.controlIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
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
  controlsContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 998,
  },
  controlButton: {
    backgroundColor: '#FFC900',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  controlIcon: {
    width: 25,
    height: 25,
    tintColor: '#000',
  },
});