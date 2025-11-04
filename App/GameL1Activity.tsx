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

const showMap = [["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","","","","",""]];

const overLayMap = [["","","","","","","","","","","","","",""],
                    ["","","","","","","","","","c","h","","",""],
                    ["","","","","","","","","","r","h","h","",""],
                    ["","","","","","","","","","r","","","",""],
                    ["","","","","","","h","r","r","r","","","",""],
                    ["","","","","","l","p","","","r","","","",""],
                    ["","","","p","l","l","","","h","r","r","r","",""],
                    ["","","","h","","","","","","c","","r","",""],
                    ["","","","","","","","","","h","","r","",""],
                    ["","","","","","","","","","h","c","r","",""],
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
  red: require('./assets/tiles/red.png'),
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
  line0011: require('./assets/overlayTiles/line0011.png'),
  line0101: require('./assets/overlayTiles/line0101.png'),
  line0110: require('./assets/overlayTiles/line0110.png'),
  line1001: require('./assets/overlayTiles/line1001.png'),
  line1010: require('./assets/overlayTiles/line1010.png'),
  line1100: require('./assets/overlayTiles/line1100.png'),
  line1111: require('./assets/overlayTiles/line1111.png'),
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

function isServedR(
  overLayMap: string[][],
  i: number,
  j: number,
  visited: Set<string> = new Set<string>()
): boolean {
  const rows = overLayMap.length;
  if (rows === 0) return false;
  const cols = overLayMap[0].length;

  if (i < 0 || i >= rows || j < 0 || j >= cols || overLayMap[i][j] !== 'r') {
    return false;
  }

  const key = `${i},${j}`;
  if (visited.has(key)) {
    return false;
  }
  visited.add(key);

  if (i === 0 || j === 0 || j === cols - 1 || i === rows - 1) {
    return true;
  }

  return (
    isServedR(overLayMap, i - 1, j, visited) ||
    isServedR(overLayMap, i + 1, j, visited) ||
    isServedR(overLayMap, i, j - 1, visited) ||
    isServedR(overLayMap, i, j + 1, visited)
  );
}

function isServedL(
  overLayMap: string[][],
  i: number,
  j: number,
  visited: Set<string> = new Set<string>()
): boolean {
  const rows = overLayMap.length;
  if (rows === 0) return false;
  const cols = overLayMap[0].length;

  if (i < 0 || i >= rows || j < 0 || j >= cols || overLayMap[i][j] !== 'l') {
    return false;
  }

  const key = `${i},${j}`;
  if (visited.has(key)) {
    return false;
  }
  visited.add(key);

  if (overLayMap[i+1][j] === 'p' || overLayMap[i-1][j] === 'p' || overLayMap[i][j+1] === 'p' || overLayMap[i][j-1] === 'p') {
    return true;
  }

  return (
    isServedL(overLayMap, i - 1, j, visited) ||
    isServedL(overLayMap, i + 1, j, visited) ||
    isServedL(overLayMap, i, j - 1, visited) ||
    isServedL(overLayMap, i, j + 1, visited)
  );
}


function ShowGrid(): JSX.Element {
  const rows = overLayMap.length;
  const cols = overLayMap[0].length;
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if ((overLayMap[i][j] === 'r' && !isServedR(overLayMap,i,j))||(overLayMap[i][j] === 'l' && !isServedL(overLayMap,i,j))){
          row.push(<Tiles key={`${i}-${j}`} type={`red` as keyof typeof TILE_IMAGES}/>)
      } else {
        row.push(<Tiles key={`${i}-${j}`} type={'empty' as keyof typeof TILE_IMAGES} />);
      }
    }
    grid.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return <View style={styles.showGrid}>{grid}</View>;
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
      } else if (overLayMap[i][j] === "l"){
        let code = ''
        if ((i > 0 && (overLayMap[i-1][j] === "l"||overLayMap[i-1][j] === "p"))||(i<=0)){code += '1'}
        else {code += '0'};
        if ((j < cols - 1 && (overLayMap[i][j+1] === "l"||overLayMap[i][j+1] === "p"))||(j>=cols - 1)){code += '1'}
        else {code += '0'};
        if ((i < rows - 1 && (overLayMap[i+1][j] === "l"||overLayMap[i+1][j] === "p"))||(i>=rows - 1)){code += '1'}
        else {code += '0'};
        if ((j > 0 && (overLayMap[i][j-1] === "l"||overLayMap[i][j-1] === "p"))||(j<=0)){code += '1'}
        else {code += '0'};
        row.push(<Tiles key={`${i}-${j}`} type={`line${code}` as keyof typeof TILE_IMAGES} />);
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
            <View style={styles.showGrid}>
              <ShowGrid />
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
    justifyContent: 'flex-start',
    alignItems: 'center', // Centré pour éviter que Budget ne soit trop à droite
    padding: 10,
  },
  budgetText: {
    fontSize: 24,
    margin: 10,
    fontFamily: 'Gloucester',
    color: '#070A28',
    textAlign: 'right',
    width: '100%',
  },
  fullmapcontainer: {
    flex: 1,
    position: 'relative',
  },
  overlayGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  showGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  grid: {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  topLeftImage: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
});