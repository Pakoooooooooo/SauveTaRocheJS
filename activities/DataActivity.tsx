import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

type DataActivityNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Data'>;

interface NavigationProps {
  navigation: DataActivityNavigationProp;
}

const styles = StyleSheet.create({
  button: { margin: 15, padding: 10 },
  text: { fontSize: 50, color: '#FFC900', textAlign: 'center', fontFamily: 'Breamcatcher' },
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { alignItems: 'center', paddingTop: 100 },
  bg_main: { width: '100%', height: 900, position: 'absolute', top: -20 },
  topLeftImage: { position: 'absolute', top: 30, left: 20 },
});

/* Button Components */
function ButtonCurrent({ navigation }: NavigationProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DataCurrent')}>
      <Text style={styles.text}>Actuel</Text>
    </TouchableOpacity>
  );
}

function Button50({ navigation }: NavigationProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Data50')}>
      <Text style={styles.text}>50 ans</Text>
    </TouchableOpacity>
  );
}

function Button100({ navigation }: NavigationProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Data100')}>
      <Text style={styles.text}>100 ans</Text>
    </TouchableOpacity>
  );
}

function Button200({ navigation }: NavigationProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Data200')}>
      <Text style={styles.text}>200 ans</Text>
    </TouchableOpacity>
  );
}

/* Background Images */
const levelImages = {
  1: require('../assets/levels_main/lev8.png'),
} as const;

function ImageLevel({ level }: { level: keyof typeof levelImages }) {
  return <Image source={levelImages[level]} style={styles.bg_main} />;
}

/* Back Button */
function ButtonBack({ navigation }: NavigationProps) {
  return (
    <TouchableOpacity style={styles.topLeftImage} onPress={() => navigation.goBack()}>
      <Image source={require('../assets/fleche.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
    </TouchableOpacity>
  );
}

/* Main Data Activity Screen */
export default function DataActivity({ navigation }: NavigationProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        {Array.from({ length: 8 }, (_, i) => (
          <ImageLevel key={8 - i} level={(8 - i) as keyof typeof levelImages} />
        ))}
        <StatusBar style="auto" />
        <ButtonBack navigation={navigation} />
        <View style={{ position: 'absolute', top: 200 }}>
          <ButtonCurrent navigation={navigation} />
          <Button50 navigation={navigation} />
          <Button100 navigation={navigation} />
          <Button200 navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
}