import React from 'react';
import { StyleSheet, TouchableHighlight, Image, View } from 'react-native';

const map = [["sea","sea","sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass"],
             ["sea","sea","sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass"],
             ["sea","sea","sea","sea","sea","sea","stone","grass","grass","grass","grass","grass","grass","grass"],
             ["sea","sea","sea","sea","sea","stone","stone","grass","grass","grass","grass","grass","grass","grass"],
             ["sea","sea","sea","sea","sea","stone","stone","grass","grass","grass","grass","grass","grass","grass"],
             ["sea","sea","sea","sea","sea","sea","stone","sand","grass","grass","grass","grass","grass","grass"],
             ["sea","sea","sea","stone","sea","sea","sea","sand","sand","grass","grass","grass","grass","grass"],
             ["sea","sea","sea","stone","sea","sea","sea","sand","sand","grass","grass","grass","grass","grass"],
              ["sea","sea","sea","sea","sea","sea","sea","sand","sand","grass","grass","grass","grass","grass"],
              ["sea","sea","sea","sea","sea","sea","sea","sand","sand","grass","grass","grass","grass","grass"],
              ["sea","sea","sea","sea","sea","sea","sand","sand","grass","grass","grass","grass","grass","grass"],
              ["sea","sea","sea","sea","sea","sea","sand","grass","grass","grass","grass","grass","grass","grass"],
              ["sea","sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass","grass"],
              ["sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"]];

// Import all tile images with correct relative paths
const TILE_IMAGES = {
  grass: require('./assets/tiles/grass.png'),
  sea: require('./assets/tiles/sea.png'),
  stone: require('./assets/tiles/stone.png'),
  sand: require('./assets/tiles/sand.png'),
};

function Tiles({ type }: { type: keyof typeof TILE_IMAGES }) {
  return (
    <TouchableHighlight>
      <Image source={TILE_IMAGES[type]} style={{ width: 20, height: 20 }} />
    </TouchableHighlight>
  );
}

function Grid(): JSX.Element {
  const rows = map.length;
  const cols = map[0].length;
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(<Tiles key={`${i}-${j}`} type={map[i][j] as keyof typeof TILE_IMAGES} />);
    }
    grid.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return <View style={styles.grid}>{grid}</View>;
}

export default function GameL1Activity() {
  return (
    <Grid />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});