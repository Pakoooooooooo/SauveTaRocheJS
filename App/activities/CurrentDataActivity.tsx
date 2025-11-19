import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
/* Notification du lancement de la partie */

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
  GameContextL1Activity: undefined
};

type DataActivityNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Data50'>;

interface NavigationProps {
  navigation: DataActivityNavigationProp;
}

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
  const handlePress = () => {
    Alert.alert('Partie lancée !', 'Amuse-toi bien.');
  };

  return (
    <View style={styles.container}>
      <ButtonBack navigation={navigation} />
      <Text style={styles.title}>Current Data Activity</Text>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}
/* Design de la page */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFC900',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topLeftImage: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 999,
  },
  backIcon: {
    width: 60,
    height: 60,
  },
});
