import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, Image, View, Text } from 'react-native';

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
              ["sea","sea","sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass"],
              ["sea","sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass","grass"],
              ["sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"]];

const overLayMap = [["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","c","h","","",""],
                    ["","","","","","","","","","r","h","h","",""],
                    ["","","","","","","","","","r","","","",""],
                    ["","","","","","","h","r","r","r","","","",""],
                    ["","","","","","","p","","","r","","","",""],
                    ["","","","h","","","","","h","r","","","",""],
                    ["","","","","","","","","","c","","","",""],
                    ["","","","","","","","","","h","","","",""],
                    ["","","","","","","","","","h","c","","",""],
                    ["","","","","","","","","h","r","r","r","r","r"],
                    ["","","","","","","r","r","r","r","","","",""],
                    ["","","","","","r","r","","","","","","",""],
                    ["","","","","h","","","","","","","","",""]];

// Import all tile images with correct relative paths
const TILE_IMAGES = {
  grass: require('./assets/tiles/grass.png'),
  sea: require('./assets/tiles/sea.png'),
  stone: require('./assets/tiles/stone.png'),
  sand: require('./assets/tiles/sand.png'),
  road1111: require('./assets/overlayTiles/road1111.png'),
  road1110: require('./assets/overlayTiles/road1110.png'),
  road1101: require('./assets/overlayTiles/road1101.png'),
  road1100: require('./assets/overlayTiles/road1100.png'),
  road1011: require('./assets/overlayTiles/road1011.png'),
  road1010: require('./assets/overlayTiles/road1010.png'),
  road1001: require('./assets/overlayTiles/road1001.png'),
  road1000: require('./assets/overlayTiles/road1000.png'),
  road0111: require('./assets/overlayTiles/road0111.png'),
  road0110: require('./assets/overlayTiles/road0110.png'),
  road0101: require('./assets/overlayTiles/road0101.png'),
  road0100: require('./assets/overlayTiles/road0100.png'),
  road0011: require('./assets/overlayTiles/road0011.png'),
  road0010: require('./assets/overlayTiles/road0010.png'),
  road0001: require('./assets/overlayTiles/road0001.png'),
  empty: require('./assets/overlayTiles/empty.png'),
  house: require('./assets/overlayTiles/house.png'),
  commerce: require('./assets/overlayTiles/commerce.png'),
  port: require('./assets/overlayTiles/port.png'),
};

function Tiles({ type }: { type: keyof typeof TILE_IMAGES }) {
  return (
    <TouchableHighlight>
      <Image source={TILE_IMAGES[type]} style={{ width: 23, height: 23 }} />
    </TouchableHighlight>
  );
}

function OverlayGrid(): JSX.Element {
  const rows = overLayMap.length;
  const cols = overLayMap[0].length;
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if (overLayMap[i][j] === "r") {
        let code = ''
        if ((i > 0 && overLayMap[i-1][j] === "r")||(i<=0)){code += '1'}
        else {code += '0'};
        if ((j < cols - 1 && overLayMap[i][j+1] === "r")||(j>=cols - 1)){code += '1'}
        else {code += '0'};
        if ((i < rows - 1 && overLayMap[i+1][j] === "r")||(i>=rows - 1)){code += '1'}
        else {code += '0'};
        if ((j > 0 && overLayMap[i][j-1] === "r")||(j<=0)){code += '1'}
        else {code += '0'};
        row.push(<Tiles key={`${i}-${j}`} type={`road${code}` as keyof typeof TILE_IMAGES} />);
      } else if (overLayMap[i][j] === "h") {
        row.push(<Tiles key={`${i}-${j}`} type={'house' as keyof typeof TILE_IMAGES} />);
      } else if (overLayMap[i][j] === "c") {
        row.push(<Tiles key={`${i}-${j}`} type={'commerce' as keyof typeof TILE_IMAGES} />);
      } else if (overLayMap[i][j] === "p") {
        row.push(<Tiles key={`${i}-${j}`} type={'port' as keyof typeof TILE_IMAGES} />);
      } else {
        row.push(<Tiles key={`${i}-${j}`} type={'empty' as keyof typeof TILE_IMAGES} />);
      }
    }
    grid.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return <View style={styles.grid}>{grid}</View>;
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
  return <View>{grid}</View>;
}

let budget = 1000;

function Budget(){
  return (
    <Text style={styles.budgetText}>{budget} €</Text>
  );
}

type NavigationProps = {
  navigation: {
    goBack: () => void;
  };
};

function ButtonBack({ navigation }: NavigationProps) {
  return (
    <TouchableOpacity style={styles.topLeftImage} onPress={() => navigation.goBack()}>
      <Image source={require('./assets/fleche.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
    </TouchableOpacity>
  );
}

export default function GameL1Activity({ navigation }: NavigationProps) {
  return (
    <View style={styles.container}>
      <ButtonBack navigation={navigation} />
        <View style={styles.mapovercontainer}>
          <View style={styles.mapcontainer}>
            <Budget />
            <View style={styles.fullmapcontainer}>
              <View style={styles.grid}>
                <Grid />
              </View>
              <View style={styles.overlayGrid}>
                <OverlayGrid />
              </View>
            </View>
          </View>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mapovercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  mapcontainer: {
  flex: 1,
  justifyContent: 'flex-start',  // pousse les enfants vers le haut
  alignItems: 'flex-end',         // pousse les enfants vers la droite
  padding: 10,                    // optionnel, pour un peu d’espace
  },
  budgetText: {
  fontSize: 24,
  margin: 10,
  fontFamily: 'Gloucester',
  color: '#070A28',
  textAlign: 'right',   // aligne le texte à droite dans son champ
  width: '100%',         // s’assure que le champ occupe toute la largeur disponible
  },
  fullmapcontainer: {
  flex: 1,
  // important : rendre le conteneur positionné
  position: 'relative',
  }, 
  overlayGrid: {
  // pour que l’OverlayGrid soit superposée
  position: 'absolute',
  width: '100%',
  height: '100%',
  // optionnel : mettre un zIndex plus grand pour être au-dessus
  zIndex: 1,
  },
  grid: {
  // pour la grille de fond
  width: '100%',
  height: '100%',
  // zIndex par défaut
  zIndex: 0,
  },
  topLeftImage: { position: 'absolute', top: 30, left: 20 },
});