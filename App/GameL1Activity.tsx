import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const p = 0.2

// Par exemple : on base la taille sur la plus petite dimension
const tileSize = Math.floor((Math.min(width, height)**(p*4))/5);
const lineLength = Math.floor((Math.min(width, height)**(p*4))*3);
const textSize = Math.floor((Math.min(width, height)**p)*p*40);
const smallTextSize = Math.floor((Math.min(width, height)**(p*4))*p/1.5);
const speechWidth = Math.floor(Math.min(width, height) / 1.8);
const btnWidth = Math.floor(Math.min(width, height) / 3.6);
const caracterScale = (Math.min(width, height)**(p*2)*p/2.1);
const scaleHeight = (Math.min(width, height)**(p*3)*p*44);

function ToString(i: number): string{
  let rep = i.toString()
  while (rep.length < 2) {
    rep = "0"+rep
  }
  return rep
} 

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
  road0000: require('./assets/overlayTiles/road0000.png'),
  line0011: require('./assets/overlayTiles/line0011.png'),
  line0101: require('./assets/overlayTiles/line0101.png'),
  line0110: require('./assets/overlayTiles/line0110.png'),
  line1001: require('./assets/overlayTiles/line1001.png'),
  line1010: require('./assets/overlayTiles/line1010.png'),
  line1100: require('./assets/overlayTiles/line1100.png'),
  line1111: require('./assets/overlayTiles/line1111.png'),
  line1000: require('./assets/overlayTiles/line1000.png'),
  line0100: require('./assets/overlayTiles/line0100.png'),
  line0010: require('./assets/overlayTiles/line0010.png'),
  line0001: require('./assets/overlayTiles/line0001.png'),
  line0000: require('./assets/overlayTiles/line0000.png'),
  empty: require('./assets/overlayTiles/empty.png'),
  house: require('./assets/overlayTiles/house.png'),
  commerce: require('./assets/overlayTiles/commerce.png'),
  port: require('./assets/overlayTiles/port.png'),
};

type CharacterImages = {
  [key: string]: any;
};

const CARACTER_IMAGES: CharacterImages = {
  Secrétaire: require('./assets/Secrétaire.png'),
  Scientifique: require('./assets/Scientifique.png'),
  Habitant : require('./assets/Habitant.png'),
  Gardien_de_Port : require('./assets/Gardien_de_Port.png'),
  Commerçant : require('./assets/Commerçant.png')
};

type JaugeImages = {
  [key: string]: any;
};

const JAUGE_IAMGES: JaugeImages = {
    frame_00: require('./assets/jauge_frames/frame_00000.png'),
  frame_01: require('./assets/jauge_frames/frame_00001.png'),
  frame_02: require('./assets/jauge_frames/frame_00002.png'),
  frame_03: require('./assets/jauge_frames/frame_00003.png'),
  frame_04: require('./assets/jauge_frames/frame_00004.png'),
  frame_05: require('./assets/jauge_frames/frame_00005.png'),
  frame_06: require('./assets/jauge_frames/frame_00006.png'),
  frame_07: require('./assets/jauge_frames/frame_00007.png'),
  frame_08: require('./assets/jauge_frames/frame_00008.png'),
  frame_09: require('./assets/jauge_frames/frame_00009.png'),
  frame_10: require('./assets/jauge_frames/frame_00010.png'),
  frame_11: require('./assets/jauge_frames/frame_00011.png'),
  frame_12: require('./assets/jauge_frames/frame_00012.png'),
  frame_13: require('./assets/jauge_frames/frame_00013.png'),
  frame_14: require('./assets/jauge_frames/frame_00014.png'),
  frame_15: require('./assets/jauge_frames/frame_00015.png'),
  frame_16: require('./assets/jauge_frames/frame_00016.png'),
  frame_17: require('./assets/jauge_frames/frame_00017.png'),
  frame_18: require('./assets/jauge_frames/frame_00018.png'),
  frame_19: require('./assets/jauge_frames/frame_00019.png'),
  frame_20: require('./assets/jauge_frames/frame_00020.png'),
  frame_21: require('./assets/jauge_frames/frame_00021.png'),
  frame_22: require('./assets/jauge_frames/frame_00022.png'),
  frame_23: require('./assets/jauge_frames/frame_00023.png'),
  frame_24: require('./assets/jauge_frames/frame_00024.png'),
  frame_25: require('./assets/jauge_frames/frame_00025.png'),
  frame_26: require('./assets/jauge_frames/frame_00026.png'),
  frame_27: require('./assets/jauge_frames/frame_00027.png'),
  frame_28: require('./assets/jauge_frames/frame_00028.png'),
  frame_29: require('./assets/jauge_frames/frame_00029.png'),
  frame_30: require('./assets/jauge_frames/frame_00030.png'),
  frame_31: require('./assets/jauge_frames/frame_00031.png'),
  frame_32: require('./assets/jauge_frames/frame_00032.png'),
  frame_33: require('./assets/jauge_frames/frame_00033.png'),
  frame_34: require('./assets/jauge_frames/frame_00034.png'),
  frame_35: require('./assets/jauge_frames/frame_00035.png'),
  frame_36: require('./assets/jauge_frames/frame_00036.png'),
  frame_37: require('./assets/jauge_frames/frame_00037.png'),
  frame_38: require('./assets/jauge_frames/frame_00038.png'),
  frame_39: require('./assets/jauge_frames/frame_00039.png'),
  frame_40: require('./assets/jauge_frames/frame_00040.png'),
  frame_41: require('./assets/jauge_frames/frame_00041.png'),
  frame_42: require('./assets/jauge_frames/frame_00042.png'),
  frame_43: require('./assets/jauge_frames/frame_00043.png'),
  frame_44: require('./assets/jauge_frames/frame_00044.png'),
  frame_45: require('./assets/jauge_frames/frame_00045.png'),
  frame_46: require('./assets/jauge_frames/frame_00046.png'),
  frame_47: require('./assets/jauge_frames/frame_00047.png'),
  frame_48: require('./assets/jauge_frames/frame_00048.png'),
  frame_49: require('./assets/jauge_frames/frame_00049.png'),
  frame_50: require('./assets/jauge_frames/frame_00050.png'),
  frame_51: require('./assets/jauge_frames/frame_00051.png'),
  frame_52: require('./assets/jauge_frames/frame_00052.png'),
  frame_53: require('./assets/jauge_frames/frame_00053.png'),
  frame_54: require('./assets/jauge_frames/frame_00054.png'),
  frame_55: require('./assets/jauge_frames/frame_00055.png'),
  frame_56: require('./assets/jauge_frames/frame_00056.png'),
  frame_57: require('./assets/jauge_frames/frame_00057.png'),
  frame_58: require('./assets/jauge_frames/frame_00058.png'),
  frame_59: require('./assets/jauge_frames/frame_00059.png'),
  frame_60: require('./assets/jauge_frames/frame_00060.png'),
  frame_61: require('./assets/jauge_frames/frame_00061.png'),
  frame_62: require('./assets/jauge_frames/frame_00062.png'),
  frame_63: require('./assets/jauge_frames/frame_00063.png'),
  frame_64: require('./assets/jauge_frames/frame_00064.png'),
  frame_65: require('./assets/jauge_frames/frame_00065.png'),
  frame_66: require('./assets/jauge_frames/frame_00066.png'),
  frame_67: require('./assets/jauge_frames/frame_00067.png'),
  frame_68: require('./assets/jauge_frames/frame_00068.png'),
  frame_69: require('./assets/jauge_frames/frame_00069.png'),
  frame_70: require('./assets/jauge_frames/frame_00070.png'),
  frame_71: require('./assets/jauge_frames/frame_00071.png'),
  frame_72: require('./assets/jauge_frames/frame_00072.png'),
  frame_73: require('./assets/jauge_frames/frame_00073.png'),
  frame_74: require('./assets/jauge_frames/frame_00074.png'),
  frame_75: require('./assets/jauge_frames/frame_00075.png'),
  frame_76: require('./assets/jauge_frames/frame_00076.png'),
  frame_77: require('./assets/jauge_frames/frame_00077.png'),
  frame_78: require('./assets/jauge_frames/frame_00078.png'),
  frame_79: require('./assets/jauge_frames/frame_00079.png'),
  frame_80: require('./assets/jauge_frames/frame_00080.png'),
  frame_81: require('./assets/jauge_frames/frame_00081.png'),
  frame_82: require('./assets/jauge_frames/frame_00082.png'),
  frame_83: require('./assets/jauge_frames/frame_00083.png'),
  frame_84: require('./assets/jauge_frames/frame_00084.png'),
  frame_85: require('./assets/jauge_frames/frame_00085.png'),
  frame_86: require('./assets/jauge_frames/frame_00086.png'),
  frame_87: require('./assets/jauge_frames/frame_00087.png'),
  frame_88: require('./assets/jauge_frames/frame_00088.png'),
  frame_89: require('./assets/jauge_frames/frame_00089.png'),
  frame_90: require('./assets/jauge_frames/frame_00090.png'),
  frame_91: require('./assets/jauge_frames/frame_00091.png'),
  frame_92: require('./assets/jauge_frames/frame_00092.png'),
  frame_93: require('./assets/jauge_frames/frame_00093.png'),
  frame_94: require('./assets/jauge_frames/frame_00094.png'),
  frame_95: require('./assets/jauge_frames/frame_00095.png'),
  frame_96: require('./assets/jauge_frames/frame_00096.png'),
  frame_97: require('./assets/jauge_frames/frame_00097.png'),
  frame_98: require('./assets/jauge_frames/frame_00098.png'),
  frame_99: require('./assets/jauge_frames/frame_00099.png')
}

const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Spetembre", "Octobre", "Novembre", "Décembre"];

const caracters = ['Secrétaire', 'Scientifique', 'Habitant', 'Gardien_de_Port', 'Commerçant'];

type NavigationProps = {
  navigation: {
    goBack: () => void;
  };
};

// Composant Tiles mémorisé
const Tiles = React.memo(({ type }: { type: keyof typeof TILE_IMAGES }) => {
  return (
    <TouchableHighlight>
      <Image source={TILE_IMAGES[type]} style={{ width: tileSize, height: tileSize }} />
    </TouchableHighlight>
  );
});

// Fonction isServed extraite pour être utilisée dans useMemo
function isServed(
  overLayMap: string[][],
  i: number,
  j: number,
  visited: Set<string> = new Set<string>()
): boolean {
  const rows = overLayMap.length;
  if (rows === 0) return false;
  const cols = overLayMap[0].length;
  
  if (i < 0 || i >= rows || j < 0 || j >= cols) {
    return false;
  }
  const cellType = overLayMap[i][j];
  const key = `${i},${j}`;

  // Routes
  if (cellType === 'r') {
    if (visited.has(key)) return false;
    visited.add(key);
    
    if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
      return true;
    }
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    return directions.some(([di, dj]) => {
      const ni = i + di, nj = j + dj;
      return ni >= 0 && ni < rows && nj >= 0 && nj < cols &&
            overLayMap[ni][nj] === 'r' && 
            isServed(overLayMap, ni, nj, visited);
    });
  }
  
  // Batiments (maison, commerce, port)
  else if (cellType === 'h' || cellType === 'c' || cellType === 'p') {
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue;
        
        const ni = i + di, nj = j + dj;
        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols &&
            overLayMap[ni][nj] === 'r' && 
            isServed(overLayMap, ni, nj, new Set())) {
          return true;
        }
      }
    }
    const dist2 = [[-2, 0], [2, 0], [0, -2], [0, 2]];
    for (const [di, dj] of dist2) {
      const ni = i + di, nj = j + dj;
      if (ni >= 0 && ni < rows && nj >= 0 && nj < cols &&
          overLayMap[ni][nj] === 'r' && 
          isServed(overLayMap, ni, nj, new Set())) {
        return true;
      }
    }
    
    // Ports
    if (cellType === 'p') {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [di, dj] of directions) {
        const ni = i + di, nj = j + dj;
        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols &&
            overLayMap[ni][nj] === 'l' && 
            isServed(overLayMap, ni, nj, new Set())) {
          return true;
        }
      }
    } else {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      return directions.some(([di, dj]) => {
        const ni = i + di, nj = j + dj;
        return ni >= 0 && ni < rows && nj >= 0 && nj < cols &&
              overLayMap[ni][nj] === 'p' && 
              isServed(overLayMap, ni, nj, visited);
      });
    }
    
    return false;
  }
  
  // Lignes
  else if (cellType === 'l') {
    if (visited.has(key)) return false;
    visited.add(key);
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [di, dj] of directions) {
      const ni = i + di, nj = j + dj;
      if (ni >= 0 && ni < rows && nj >= 0 && nj < cols &&
          overLayMap[ni][nj] === 'p') {
        const portHasRoad = checkPortRoadAccess(overLayMap, ni, nj);
        if (portHasRoad) {
          return true;
        }
      }
    }
    
    return directions.some(([di, dj]) => {
      const ni = i + di, nj = j + dj;
      return ni >= 0 && ni < rows && nj >= 0 && nj < cols &&
            overLayMap[ni][nj] === 'l' && 
            isServed(overLayMap, ni, nj, visited);
    });
  }
  
  return false;
}

// Check si les ports ont un acces route sans check les lignes maritimes
function checkPortRoadAccess(overLayMap: string[][], i: number, j: number): boolean {
  const rows = overLayMap.length;
  const cols = overLayMap[0].length;
  
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      if (di === 0 && dj === 0) continue;
      
      const ni = i + di, nj = j + dj;
      if (ni >= 0 && ni < rows && nj >= 0 && nj < cols &&
          overLayMap[ni][nj] === 'r' && 
          isServed(overLayMap, ni, nj, new Set())) {
        return true;
      }
    }
  }
  
  const dist2 = [[-2, 0], [2, 0], [0, -2], [0, 2]];
  for (const [di, dj] of dist2) {
    const ni = i + di, nj = j + dj;
    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols &&
        overLayMap[ni][nj] === 'r' && 
        isServed(overLayMap, ni, nj, new Set())) {
      return true;
    }
  }
  
  return false;
}

// Composant ShowGrid mémorisé
const ShowGrid = React.memo(({showMap, overLayMap, servedCache}: {showMap: string[][], overLayMap: string[][], servedCache: {[key: string]: boolean}}) => {
  const rows = overLayMap.length;
  const cols = overLayMap[0].length;
  const grid = [];
  
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if (overLayMap[i][j] !== '' && !servedCache[`${i}-${j}`]){
        row.push(<Tiles key={`${i}-${j}`} type={`red` as keyof typeof TILE_IMAGES}/>)
      } else {
        row.push(<Tiles key={`${i}-${j}`} type={'empty' as keyof typeof TILE_IMAGES} />);
      }
    }
    grid.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return <View style={styles.showGrid}>{grid}</View>;
});

// Composant OverlayGrid mémorisé
const OverlayGrid = React.memo(({overLayMap}:{overLayMap : string[][]}) => {
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
});

// Composant Grid mémorisé
const Grid = React.memo(({ map }: { map: string[][] }) => {
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
});

const Budget = React.memo(({budget}: {budget: number}) => {
  return (
    <Text style={styles.budgetText}>{budget} €</Text>
  );
});

const DateDisplay = React.memo(({monthIndex, year}: {monthIndex: number, year: number}) => {
  return (
    <Text style={styles.budgetText}>{months[monthIndex]} {year}</Text>
  );
});

const SeparationLine = React.memo(() => {
  return (
    <Image style={styles.separationLine} source={require('./assets/separation_line.png')} />
  );
});

const CaracterName = React.memo(({currentCaracterIndex}: {currentCaracterIndex: number}) => {
  let name = ""
  for (let i = 0; i < caracters[currentCaracterIndex].length; i++){
    if (caracters[currentCaracterIndex][i] === "_"){
      name += " "
    } else {
      name += caracters[currentCaracterIndex][i]
    }
  }
  return (
    <Text style={styles.caracterName}>{name} :</Text>
  );
});

const JaugeImage = React.memo(({happiness}: {happiness: number}) => {
  return (
    <TouchableHighlight>
      <Image source={JAUGE_IAMGES["frame_"+ToString(happiness)]} style={styles.jaugeImage}/>
    </TouchableHighlight>
  );
});

const CaracterImage = React.memo(({currentCaracterIndex}: {currentCaracterIndex: number}) => {
  return (
    <TouchableHighlight>
      <Image source={CARACTER_IMAGES[caracters[currentCaracterIndex]]} style={styles.caracterImage}/>
    </TouchableHighlight>
  );
});

const ButtonBack = React.memo(({ navigation }: NavigationProps) => {
  return (
    <TouchableOpacity style={styles.topLeftImage} onPress={() => navigation.goBack()}>
      <Image source={require('./assets/fleche.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
    </TouchableOpacity>
  );
});

const Speech = React.memo(({txt}: {txt: string}) => {
  return (
    <Text style={styles.speech}>{txt}</Text>
  );
});

const txt1 = "Rep 1"
const txt2 = "Rep 2"
const txt3 = "Rep 3"
const txt4 = "Rep 4"
const correctRep = 3;

export default function GameL1Activity({ navigation }: NavigationProps) {

  const [map, setMap] = useState([
    ["sea","sea","sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass"],
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
    ["sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"]
  ]);

  const [showMap, setShowMap] = useState([
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
    ["","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","",""]
  ]);

  const [overLayMap, setOverLayMap] = useState([
    ["","","","","","","","","","","","","",""],
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
    ["","","","","h","","","","","","","","",""]
  ]);

  const [budget, setBudget] = useState(1000);
  const [charges, setCharges] = useState(1000);
  const [monthIndex, setMonthIndex] = useState(4);
  const [year, setYear] = useState(2026);
  const [happiness, setHappiness] = useState(50);
  const [currentCaracterIndex, setCurrentCaracterIndex] = useState(0);
  const [selectedRep, setSelectedRep] = useState<number | null>(null);

  // Définir les textes des réponses
  const [txt1] = useState("Option 1 - Coût: 200€");
  const [txt2] = useState("Option 2 - Rien faire");
  const [txt3] = useState("Option 3 - Coût: 500€");
  const [txt4] = useState("Option 4 - Coût: 300€");
  const [correctRep] = useState(1); // Définir quelle est la bonne réponse

  // Cache des calculs isServed - recalculé uniquement quand overLayMap change
  const servedCache = useMemo(() => {
    const cache: { [key: string]: boolean } = {};
    for (let i = 0; i < overLayMap.length; i++) {
      for (let j = 0; j < overLayMap[0].length; j++) {
        cache[`${i}-${j}`] = isServed(overLayMap, i, j);
      }
    }
    return cache;
  }, [overLayMap]);

  // Utilisation de useCallback pour mémoriser les fonctions
  const setMapTile = useCallback((i: number, j: number, type: string) => {
    setMap(prevMap => {
      const newMap = prevMap.map(row => [...row]);
      newMap[i][j] = type;
      return newMap;
    });
    
    setOverLayMap(prevOverLayMap => {
      const newOverLayMap = prevOverLayMap.map(row => [...row]);
      if (type === 'sea' && prevOverLayMap[i][j] !== 'l'){
        newOverLayMap[i][j] = '';
      }
      if (type !== 'sea' && prevOverLayMap[i][j] === 'l'){
        newOverLayMap[i][j] = '';
      }
      return newOverLayMap;
    });
  }, []);

  const setOverlayTile = useCallback((i: number, j: number, type: string) => {
    setOverLayMap(prevOverLayMap => {
      const newOverLayMap = prevOverLayMap.map(row => [...row]);
      newOverLayMap[i][j] = type;
      return newOverLayMap;
    });
  }, []);

  const ChangeMapTile = useCallback((i: number, j: number, type: string) => {
    setMapTile(i, j, type);
    if (type === "sea" && overLayMap[i][j] !== 'l'){
      setOverlayTile(i, j, '');
    }
    else if (type !== "sea" && overLayMap[i][j] === 'l'){
      setOverlayTile(i, j, '');
    }
  }, [setMapTile, overLayMap]);

  const ChangeOverlayTile = useCallback((i: number, j: number, type: string) => {
    if (map[i][j] === "sea" && type === 'l'){
      setOverlayTile(i, j, type);
    } else if (map[i][j] !== "sea" && type !== 'l'){
      setOverlayTile(i, j, type);
    }
  }, [map, setOverlayTile]);

  const ChangeBudget = useCallback((incr: number) => {
    setBudget(prevBudget => prevBudget + incr);
  }, []);

  const ChangeHappiness = useCallback((incr: number) => {
  setHappiness(prev => {
    const newValue = prev + incr;
    if (newValue >= 99) return 99;
    if (newValue < 0) return 0;
    return newValue;
  });
}, []);

  const ApplyCharges = useCallback(() => {
    ChangeBudget(charges);
  }, [charges, ChangeBudget]);

  const NextCaracter = useCallback(() => {
    setCurrentCaracterIndex(prev => (prev + 1) % caracters.length);
  }, []);

  const NextMonth = useCallback(() => {
    setMonthIndex(prev => {
      if (prev < months.length - 1) {
        return prev + 1;
      } else {
        setYear(y => y + 1);
        return 0;
      }
    });
  }, []);

  // Fonction pour gérer la sélection d'une réponse
  const handleSelectRep = useCallback((index: number) => {
    if (selectedRep !== null) return; // Empêcher les sélections multiples
    
    setSelectedRep(index);
    NextCaracter();
    NextMonth();
    
    if (index === 1) {
      ApplyCharges();
      ChangeMapTile(0, 0, 'sand');
      ChangeOverlayTile(0, 0, 'h');
      ChangeBudget(-200);
      ChangeHappiness(58);
    } else if (index === 2) {
      ApplyCharges();
      ChangeHappiness(-20);
    } else if (index === 3) {
      ApplyCharges();
      ChangeMapTile(0, 0, 'sand');
      ChangeMapTile(1, 0, 'sand');
      ChangeMapTile(1, 1, 'sand');
      ChangeOverlayTile(0, 0, 'h');
      ChangeBudget(-500);
      ChangeHappiness(10);
    } else {
      ApplyCharges();
      ChangeMapTile(0, 0, 'sand');
      ChangeMapTile(1, 0, 'sand');
      ChangeMapTile(1, 1, 'sand');
      ChangeBudget(-300);
      ChangeHappiness(30);
    }
    setSelectedRep(null)
  }, [selectedRep, NextCaracter, NextMonth, ApplyCharges, ChangeMapTile, ChangeOverlayTile, ChangeBudget]);

  const ButtonRep = useCallback(({txt, style, index, onSelect, selectedRep, correctRep}: 
    {txt?: string; style?: object; index: number; onSelect: (index: number) => void; selectedRep: number | null; correctRep: number;}) => {
    let bg = '#070A28'; // couleur neutre de base
    let txtcolor = '#FFFFFF';

    // Jugement des couleurs - appliqué à tous les boutons après sélection
    if (selectedRep !== null) {
      if (index === selectedRep) {
        bg = '#FFC900'; // réponse sélectionnée : blanc
        txtcolor = '#070A28';
      } else {
        bg = '#4a4a4a'; // autres réponses : gris foncé
        txtcolor = '#FFFFFF';
      }
    }

    return (
      <TouchableOpacity
        style={[style, { backgroundColor: bg }]}
        onPress={() => onSelect(index)}
        disabled={selectedRep !== null} // empêche de recliquer après réponse
      >
        <Text style={[styles.repText, { color: txtcolor }]}>{txt}</Text>
      </TouchableOpacity>
    );
  }, []);

  const Reps = React.memo(({txt1 = '', txt2 = '', txt3 = '', txt4 = '', onSelect, selectedRep, correctRep}:
    {txt1?: string; txt2?: string; txt3?: string; txt4?: string; onSelect: (index: number) => void; selectedRep: number | null; correctRep: number;}) => {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <ButtonRep txt={txt1} style={styles.buttonRep} index={1} onSelect={onSelect} selectedRep={selectedRep} correctRep={correctRep} />
          <ButtonRep txt={txt2} style={styles.buttonRep} index={2} onSelect={onSelect} selectedRep={selectedRep} correctRep={correctRep} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ButtonRep txt={txt3} style={styles.buttonRep} index={3} onSelect={onSelect} selectedRep={selectedRep} correctRep={correctRep} />
          <ButtonRep txt={txt4} style={styles.buttonRep} index={4} onSelect={onSelect} selectedRep={selectedRep} correctRep={correctRep} />
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <ButtonBack navigation={navigation} />
      <View style={styles.mapcontainer}>
        <Budget budget={budget}/>
        <View style={styles.fullmapcontainer}>
          <View style={styles.grid}>
            <Grid map={map} />
          </View>
          <View style={styles.showGrid}>
            <ShowGrid showMap={showMap} overLayMap={overLayMap} servedCache={servedCache}/>
          </View>
          <View style={styles.overlayGrid}>
            <OverlayGrid overLayMap={overLayMap}/>
          </View>
        </View>
        <DateDisplay monthIndex={monthIndex} year={year} />
      </View>
      <SeparationLine />
      <View style={styles.bottomScreen}>
        <CaracterName currentCaracterIndex={currentCaracterIndex} />
        <View style={styles.infoDisplay}>
          <CaracterImage currentCaracterIndex={currentCaracterIndex} />
          <View >
            <Speech txt="Question question question  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ?"/>
            <Reps
              txt1={txt1}
              txt2={txt2}
              txt3={txt3}
              txt4={txt4}
              onSelect={handleSelectRep}
              selectedRep={selectedRep}
              correctRep={correctRep}
            />
          </View>
          <JaugeImage happiness={happiness}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  mapcontainer: {
    width: 14*tileSize,
    marginTop: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  budgetText: {
    fontSize: textSize,
    margin: 10,
    fontFamily: 'Gloucester',
    color: '#070A28',
    textAlign: 'right',
    width: '100%',
  },
  fullmapcontainer: {
  },
  overlayGrid: {
    position: 'absolute',
    zIndex: 3,
  },
  showGrid: {
    position: 'absolute',
    zIndex: 2,
  },
  grid: {
    position: 'relative',
    zIndex: 0,
  },
  topLeftImage: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  separationLine: {
    width: lineLength,
    height: '0.3%',
    resizeMode: 'stretch',
  },
  caracterName: {
    fontSize: textSize*1.2,
    margin: 0,
    marginStart: 20,
    fontFamily: 'Gloucester',
    color: '#070A28',
    width: '100%',
    textDecorationLine: 'underline',
  },
  speech: {
    fontSize: smallTextSize*1.5,
    margin: 5,
    fontFamily: 'Gloucester',
    color: '#070A28',
    width: speechWidth,
  },
  caracterImage: {
    alignSelf: 'flex-end',
    margin: -20,
    marginEnd: -200,
    left: -110,
    top: -25,
    width: 100*3*caracterScale,
    height: 140*3*caracterScale,
    resizeMode: 'stretch',
  },
  bottomScreen: {
    marginVertical: 5,
    marginHorizontal: -10,
  },
  infoDisplay: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  repText: {
    fontSize: smallTextSize,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Gloucester',
  },
  buttonRep: {
    height: btnWidth/1.7,
    width: btnWidth,
    margin: btnWidth/30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  jaugeImage: {
    position: 'relative',
    marginEnd: -10,
    marginStart: 10,
    marginTop: -20,
    height: scaleHeight,
    width: scaleHeight/12
  }
});