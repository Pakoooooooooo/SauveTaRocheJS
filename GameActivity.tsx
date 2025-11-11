import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

type DataActivityNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

interface NavigationProps {
  navigation: DataActivityNavigationProp;
}

const { height } = Dimensions.get('window');

function ButtonLevel1({ navigation }: NavigationProps) {
  return (
    <TouchableOpacity
      style={styles.levelButton}
      onPress={() => navigation.navigate('GameContextL1Activity')}>
      <Text style={styles.levelButtonText}>NIVEAU 1</Text>
    </TouchableOpacity>
  );
}

function ButtonLevel2({ navigation }: NavigationProps) {
  return (
    <TouchableOpacity
      style={styles.levelButton}
      onPress={() => navigation.navigate('GameL2Activity')}>
      <Text style={styles.levelButtonText}>NIVEAU 2</Text>
    </TouchableOpacity>
  );
}

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

export default function GameActivity({ navigation }: NavigationProps) {
  return (
    <View style={{ flex: 1 }}>
      {/* Bouton retour en premier, en dehors du conteneur principal */}
      <ButtonBack navigation={navigation} />
      
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            BIENVENUE DANS LE JEU, VEUILLEZ CHOISIR UN NIVEAU POUR DÉBUTER
          </Text>

          <View style={styles.levelsContainer}>
            <ButtonLevel1 navigation={navigation} />
            <ButtonLevel2 navigation={navigation} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 25,
    color: '#070A28',
    textAlign: 'center',
    fontFamily: 'Gloucester',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  levelsContainer: {
    alignItems: 'center',
    gap: 15,
  },
  levelButton: {
    backgroundColor: '#FFC900',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 10,
    minWidth: 220,
    alignItems: 'center',
    shadowColor: '#070A28',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelButtonText: {
    color: '#070A28',
    fontSize: 25,
    fontFamily: 'Breamcatcher',
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