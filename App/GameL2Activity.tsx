import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

/* Cette activité est vide pour l'instant*/

export default function GameActivity() {
  const [showLevels, setShowLevels] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Niveau 1
      </Text>

        <View style={styles.levelsContainer}>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: height * 0.25, // 25% de la hauteur
    left: 20,
    right: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  startButton: {
    position: 'absolute',
    top: height * 0.5 + 7, // juste sous le centre
    left: '50%',
    transform: [{ translateX: -110 }],
    backgroundColor: '#FFC900',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    minWidth: 220,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  levelsContainer: {
    position: 'absolute',
    top: height * 0.5 + 7,
    left: '50%',
    transform: [{ translateX: -110 }],
    alignItems: 'center',
  },
  levelButton: {
    backgroundColor: '#FFC900',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: 220,
    alignItems: 'center',
  },
  levelButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  button: { margin: 15, padding: 10 },
  text: {
    fontSize: 25,
    color: '#070A28',
    textAlign: 'center',
    fontFamily: 'Breamcatcher',
    margin: 20,
    marginTop: 200,
  },
  contentContainer: { alignItems: 'center', paddingTop: 100 },
  bg_main: { width: '100%', height: 900, position: 'absolute', top: -20 },
  topLeftImage: { position: 'absolute', top: 30, left: 20 },
});
