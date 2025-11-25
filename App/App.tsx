import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
  Animated,
  Dimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
enableScreens();
import GameActivity from './activities/GameActivity';
import DataActivity from './activities/DataActivity';
import ChallengeActivity from './activities/ChallengeActivity';
// Import Data sub-screens
import DataCurrent from './activities/CurrentDataActivity';
import Data50 from './activities/50DataActivity';
import Data100 from './activities/100DataActivity';
import Data200 from './activities/200DataAcivity';

// Navigateur
const Stack = createNativeStackNavigator();
// Chargement de l'appli
function AppLoading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FFC900" />
    </View>
  );
}
// Bouton pour lancer la partie jeu
function ButtonGame({ navigation }: { navigation: any }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
      <Text style={styles.text}>Jeu</Text>
    </TouchableOpacity>
  );
}
// Lancer la partie challenge
function ButtonChallenge({ navigation }: { navigation: any }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Challenge')}>
      <Text style={styles.text}>Défi</Text>
    </TouchableOpacity>
  );
}
// Lancer la partie données
function ButtonData({ navigation }: { navigation: any }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Data')}>
      <Text style={styles.text}>Données</Text>
    </TouchableOpacity>
  );
}
// Affichage du logo de l'appli
function Image1() {
  return <Image source={require('./assets/logo_cailloux.png')} style={{ width: 240, height: 240 }} />;
}
// Différents plans de l'image de fond
const levelImages = {
  1: require('./assets/levels_main/lev1.png'),
  2: require('./assets/levels_main/lev2.png'),
  3: require('./assets/levels_main/lev3.png'),
  4: require('./assets/levels_main/lev4.png'),
  5: require('./assets/levels_main/lev5.png'),
  6: require('./assets/levels_main/lev6.png'),
  7: require('./assets/levels_main/lev7.png'),
  8: require('./assets/levels_main/lev8.png'),
};
// Liste des activités utilisées par l'appli
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

import GameL1Activity from './activities/GameL1Activity';
import GameL2Activity from './activities/GameL2Activity';
import GameContextL1Activity from './activities/GameContextL1Activity'

// Affichage de la page d'accueil

// Modifiez le style bg_main pour retirer la position absolute :
const styles = StyleSheet.create({
  button: { margin: 15, padding: 10 },
  text: { fontSize: 50, color: '#FFC900', textAlign: 'center', fontFamily: 'Breamcatcher' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { alignItems: 'center', paddingTop: 100 },
  topLeftImage: { position: 'absolute', top: 30, left: 20 },
});

const SCREEN_WIDTH = Dimensions.get('window').width;
const a = 0.1;

// Composant ImageLevel (inchangé)
function ImageLevel({ level, animatedStyle }: { level: keyof typeof levelImages; animatedStyle?: any }) {
  return (
    <Animated.Image
      source={levelImages[level]}
      style={[
        {
          width: SCREEN_WIDTH * (1 + a),
          height: '100%',
          position: 'absolute',
          left: -SCREEN_WIDTH * a / 2, // Position de base
        },
        animatedStyle,
      ]}
      resizeMode="cover"
    />
  );
}

// Écran principal
function HomeScreen({ navigation }: { navigation: any }) {
  // Initialiser chaque Animated.Value à la position de départ
  const scrollValues = useRef(
    Array.from({ length: 8 }, () => new Animated.Value(-SCREEN_WIDTH * a / 2))
  ).current;

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);

      scrollValues.forEach((scrollX, index) => {
        const animation = Animated.sequence([
          // Délai initial unique pour chaque image
          Animated.delay(index * 600),
          // Boucle infinie entre gauche et droite, en partant de la position initiale
          Animated.loop(
            Animated.sequence([
              Animated.timing(scrollX, {
                toValue: SCREEN_WIDTH * a / 2, // Vers la droite
                duration: 5000,
                useNativeDriver: true,
              }),
              Animated.timing(scrollX, {
                toValue: -SCREEN_WIDTH * a / 2, // Vers la gauche
                duration: 5000,
                useNativeDriver: true,
              }),
            ])
          ),
        ]);
        animation.start();
      });
    }, 50);

    // Nettoyage des animations
    return () => scrollValues.forEach((val) => val.stopAnimation());
  }, [scrollValues]);

  return (
    <View style={{ flex: 1 }}>
      {/* Container pour les images animées */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        {Array.from({ length: 8 }, (_, i) => {
          const animatedStyle = {
              transform: [{ translateX: scrollValues[i] }], // ✅ Utilisez scrollValues[i]
            };
            return (
              <ImageLevel
                key={8 - i}
                level={(8 - i) as keyof typeof levelImages}
                animatedStyle={animatedStyle}
              />
            );
          })}
      </View>

      {/* Contenu au-dessus du fond animé */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <StatusBar style="auto" />
        <Image1 />
        <ButtonGame navigation={navigation} />
        <ButtonChallenge navigation={navigation} />
        <ButtonData navigation={navigation} />
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync({ 
          Breamcatcher: require('./assets/fonts/breamcatcher.otf'), 
          Gloucester: require('./assets/fonts/gloucester.ttf') 
        });
        
        // Configurer la barre de navigation Android en semi-transparent
        if (Platform.OS === 'android') {
          await NavigationBar.setPositionAsync('absolute');
          await NavigationBar.setBackgroundColorAsync('#00000000');
        }
        
        setFontsLoaded(true);
      } catch (e) {
        console.warn('Erreur lors du chargement : ', e);
      }
    })();
  }, []);

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameActivity} />
        <Stack.Screen name="Data" component={DataActivity} />
        <Stack.Screen name="Challenge" component={ChallengeActivity} />
        <Stack.Screen name="DataCurrent" component={DataCurrent} />
        <Stack.Screen name="Data50" component={Data50} />
        <Stack.Screen name="Data100" component={Data100} />
        <Stack.Screen name="Data200" component={Data200} />
        <Stack.Screen name="GameL1Activity" component={GameL1Activity} />
        <Stack.Screen name="GameL2Activity" component={GameL2Activity} />
        <Stack.Screen name="GameContextL1Activity" component={GameContextL1Activity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}