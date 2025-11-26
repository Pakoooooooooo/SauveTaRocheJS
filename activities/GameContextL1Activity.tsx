import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

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
};

type DataActivityNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

interface NavigationProps {
  navigation: DataActivityNavigationProp;
}

let wins = 0;

function backgroundColor(){
  if (wins === 0) {
    return '#ffff'; // Jaune clair pour en cours
  } else if (wins === 1) {
    return '#28a745'; // Vert pour victoire
  } else if (wins < 0) {
    return '#dc3545'; // Rouge pour défaite
}}

const { height } = Dimensions.get('window');
function TextLevel(){
  return(
    <View >
      {wins === 0 && (
      <Text style={styles.text}>
            Dans ce niveau vous incarnerez le maire de Graniland (ville cotière) et vous devrez répondre aux questions des différents habitants pour les satisfaire.
            Attention à ne pas les décevoir au moment des élections ! Elles ont lieu tous les 5 ans.
          </Text>)}
      {wins === 1 && (
      <Text style={styles.textWin}>
            Félicitations ! Vous avez réussi le niveau 1 en satisfaisant les habitants de Granilande.
            Préparez-vous pour le niveau 2 où vous devrez gérer une ville en pleine expansion avec de nouveaux défis à relever.
          </Text>)}
      {wins === -1 && (
      <Text style={styles.textLose}>
            Malheureusement, vous n'avez pas réussi à satisfaire les habitants de Graniland avant les élections...
            Les aléas climatiques et les choix difficiles ont eu raison de votre mandat.
          </Text>)}
      {wins === -2 && (
      <Text style={styles.textLose}>
            Malheureusement, votre budget est tombé dans le négatif... L'Etat a donc pris la decision de vous révoquer avant la fin de votre mandat...
          </Text>)}
    </View>
  )
}
// Bouton suivant
function ButtonNext({ navigation }: NavigationProps) {
  return (
     <View >
            {wins === 0 && (
                <TouchableOpacity
                    style={styles.levelButton}
                    onPress={() => navigation.navigate('GameL1Activity')}
                >
                    <Text style={styles.levelButtonText}>Suivant</Text>
                </TouchableOpacity>
            )}
        </View>
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
        source={require('../assets/fleche.png')} 
        style={styles.backIcon} 
        resizeMode="contain" 
      />
    </TouchableOpacity>
  );
}

export default function GameContextL1Activity({ navigation }: NavigationProps) {
  const route = useRoute();
  
  // Récupérer le résultat du jeu (avec assertion de type)
  const gameResult = (route.params as any)?.gameResult;
  if (gameResult==='win') {
    wins += 1;
  } else if (gameResult==='loss') {
    wins = -1;
  } else if (gameResult==='bankruptcy') {
    wins = -2;
  } else {
    wins = 0;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Bouton retour en premier, en dehors du conteneur principal */}
      <ButtonBack navigation={navigation} />
      
      <View style={[styles.container, { backgroundColor: backgroundColor() }]}>
        <View style={styles.content}>
          <TextLevel />

          <View style={styles.levelsContainer}>
            <ButtonNext navigation={navigation} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor(),
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
  textWin: {
    fontSize: 25,
    color: '#FFC900',
    textAlign: 'center',
    fontFamily: 'Gloucester',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  textLose: {
    fontSize: 25,
    color: '#4a4a4a',
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
    shadowColor: '#000',
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