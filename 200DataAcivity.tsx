import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform, Text, Alert } from 'react-native';
import MapView, { Polygon, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { floodZones } from './data/floodZones200';

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

type DataActivityNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Data200'>;

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

export default function Data200Activity({ navigation }: NavigationProps) {
  const [region, setRegion] = useState({
    latitude: 48.4084,
    longitude: -4.6147,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const [showInfo, setShowInfo] = useState(true);

  const handlePolygonPress = () => {
    Alert.alert(
      '🌊 Zone inondée',
      'Cette zone sera submergée par la montée des eaux dans 200 ans avec une élévation de +2.0m du niveau de la mer.',
      [{ text: 'Compris', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <ButtonBack navigation={navigation} />

      {/* Bannière d'information */}
      {showInfo && (
        <View style={styles.infoBanner}>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Projection +200 ans (2225)</Text>
            <Text style={styles.infoText}>Montée : +2.0m</Text>
            <Text style={styles.infoSubtext}>
              {floodZones.length} zones à risque
            </Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowInfo(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Légende */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 59, 48, 0.5)' }]} />
          <Text style={styles.legendText}>Zones inondées</Text>
        </View>
      </View>

      {/* Bouton info si masqué */}
      {!showInfo && (
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setShowInfo(true)}
        >
          <Text style={styles.infoButtonText}>ℹ️</Text>
        </TouchableOpacity>
      )}
      
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        mapType="standard"
        zoomEnabled={true}
        zoomControlEnabled={true}
      >
        {/* Afficher toutes les zones inondables */}
        {floodZones.map((zone) => (
          <Polygon
            key={zone.id}
            coordinates={zone.coordinates}
            fillColor="rgba(255, 59, 48, 0.5)"
            strokeColor="rgba(200, 0, 0, 0.9)"
            strokeWidth={2}
            tappable={true}
            onPress={handlePolygonPress}
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
  infoBanner: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 90,
    left: 20,
    right: 20,
    zIndex: 998,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9500',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  infoSubtext: {
    fontSize: 11,
    color: '#999',
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 998,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 18,
    height: 18,
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 100, 0, 0.9)',
  },
  legendText: {
    fontSize: 12,
    color: '#333',
  },
  infoButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 90,
    right: 20,
    zIndex: 998,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoButtonText: {
    fontSize: 18,
  },
});