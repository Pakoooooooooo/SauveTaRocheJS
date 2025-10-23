import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  Alert,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
enableScreens();
import GameActivity from './GameActivity';
import DataActivity from './DataActivity';
import ChallengeActivity from './ChallengeActivity';
// Import Data sub-screens
import DataCurrent from './CurrentDataActivity';
import Data50 from './50DataActivity';
import Data100 from './100DataActivity';
import Data200 from './200DataAcivity';

const Stack = createNativeStackNavigator();

function AppLoading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FFC900" />
    </View>
  );
}

const styles = StyleSheet.create({
  button: { margin: 15, padding: 10 },
  text: { fontSize: 50, color: '#FFC900', textAlign: 'center', fontFamily: 'Breamcatcher' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { alignItems: 'center', paddingTop: 100 },
  bg_main: { width: '100%', height: 900, position: 'absolute', top: -20 },
  topLeftImage: { position: 'absolute', top: 30, left: 20 },
  topRightImage: { position: 'absolute', top: 30, right: 20 },
});

function ButtonGame({ navigation }: { navigation: any }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
      <Text style={styles.text}>Jeu</Text>
    </TouchableOpacity>
  );
}

function ButtonChallenge({ navigation }: { navigation: any }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Challenge')}>
      <Text style={styles.text}>Défi</Text>
    </TouchableOpacity>
  );
}

function ButtonData({ navigation }: { navigation: any }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Data')}>
      <Text style={styles.text}>Données</Text>
    </TouchableOpacity>
  );
}

function OptionsImage() {
  return (
    <TouchableHighlight onPress={() => Alert.alert('Image pressée !')} underlayColor="transparent" style={styles.topRightImage}>
      <Image source={require('./assets/options_logo.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
    </TouchableHighlight>
  );
}

function Image1() {
  return <Image source={require('./assets/logo_cailloux.png')} style={{ width: 240, height: 240 }} />;
}

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

function ImageLevel({ level }: { level: keyof typeof levelImages }) {
  return <Image source={levelImages[level]} style={styles.bg_main} />;
}

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

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import GameL1Activity from './GameL1Activity';
import GameL2Activity from './GameL2Activity';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        {Array.from({ length: 8 }, (_, i) => (
          <ImageLevel key={8 - i} level={(8 - i) as keyof typeof levelImages} />
        ))}
        <StatusBar style="auto" />
        <Image1 />
        <ButtonGame navigation={navigation} />
        <ButtonChallenge navigation={navigation} />
        <ButtonData navigation={navigation} />
        <OptionsImage />
      </View>
    </ScrollView>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}