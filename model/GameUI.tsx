import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  Modal } from 'react-native';
import * as Q from './GameQuestions';

/*GameUI répertorie les constantes communes à tous les niveaux et l'aspect du l'IHM du jeu*/

// Les dimentions des éléments visuels du jeu sont basées sur celles de l'écran
const { width, height } = Dimensions.get('window');
const p = 0.2
export const tileSize = Math.floor((Math.min(width, height)**(p*4))/5);
export const lineLength = Math.floor((Math.min(width, height)**(p*4))*3);
export const textSize = Math.floor((Math.min(width, height)**p)*p*40);
export const smallTextSize = Math.floor((Math.min(width, height)**(p*4))*p/1.5);
export const speechWidth = Math.floor(Math.min(width, height) / 1.6);
export const btnWidth = Math.floor(Math.min(width, height) / 3.3);
export const caracterScale = (Math.min(width, height)**(p*2)*p/2.1);
export const scaleHeight = (Math.min(width, height)**(p*3)*p*44);

export const periode = 5 // Nombre d'années entre deux éléctions

export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
// Transforme le number : 3 en string : "03"
export function ToString(i: number): string{
  let rep = i.toString()
  while (rep.length < 2) {
    rep = "0"+rep
  }
  return rep
}
// retourne si les questions nécessaires à l'apparition de Quest ont déjà été posées et si les reponses données sont les bonnes
export function respects(Quest: Q.GameQuestionData, ListQuest: Q.GameQuestionData[], ListRep: number[]): boolean{
  for (const q of Quest.prevQuestCondition) {
    const i = Quest.prevQuestCondition.indexOf(q);
    if (!ListQuest.includes(q)){
      return false
    } else if (ListRep[i] !== Quest.prevRepCondition[i]) {
      return false
    }
  }
  for (const q of Quest.prevQuestNotCondition) {
    const i = Quest.prevQuestNotCondition.indexOf(q);
    if (ListQuest.includes(q) && ListRep[i] === Quest.prevRepNotCondition[i]){
      return false
    }
  }
  return true
}
// Import all tile images with correct relative paths
export const TILE_IMAGES = {
  grass: require('../assets/tiles/grass.png'),
  sea: require('../assets/tiles/sea.png'),
  stone: require('../assets/tiles/stone.png'),
  sand: require('../assets/tiles/sand.png'),
  red: require('../assets/tiles/red.png'),
  road1111: require('../assets/overlayTiles/road1111.png'),
  road1110: require('../assets/overlayTiles/road1110.png'),
  road1101: require('../assets/overlayTiles/road1101.png'),
  road1100: require('../assets/overlayTiles/road1100.png'),
  road1011: require('../assets/overlayTiles/road1011.png'),
  road1010: require('../assets/overlayTiles/road1010.png'),
  road1001: require('../assets/overlayTiles/road1001.png'),
  road1000: require('../assets/overlayTiles/road1000.png'),
  road0111: require('../assets/overlayTiles/road0111.png'),
  road0110: require('../assets/overlayTiles/road0110.png'),
  road0101: require('../assets/overlayTiles/road0101.png'),
  road0100: require('../assets/overlayTiles/road0100.png'),
  road0011: require('../assets/overlayTiles/road0011.png'),
  road0010: require('../assets/overlayTiles/road0010.png'),
  road0001: require('../assets/overlayTiles/road0001.png'),
  road0000: require('../assets/overlayTiles/road0000.png'),
  line0011: require('../assets/overlayTiles/line0011.png'),
  line0101: require('../assets/overlayTiles/line0101.png'),
  line0110: require('../assets/overlayTiles/line0110.png'),
  line1001: require('../assets/overlayTiles/line1001.png'),
  line1010: require('../assets/overlayTiles/line1010.png'),
  line1100: require('../assets/overlayTiles/line1100.png'),
  line1111: require('../assets/overlayTiles/line1111.png'),
  line1000: require('../assets/overlayTiles/line1000.png'),
  line0100: require('../assets/overlayTiles/line0100.png'),
  line0010: require('../assets/overlayTiles/line0010.png'),
  line0001: require('../assets/overlayTiles/line0001.png'),
  line0000: require('../assets/overlayTiles/line0000.png'),
  empty: require('../assets/overlayTiles/empty.png'),
  house: require('../assets/overlayTiles/house.png'),
  commerce: require('../assets/overlayTiles/commerce.png'),
  port: require('../assets/overlayTiles/port.png'),
  sign: require('../assets/overlayTiles/sign.png'),
};
// On explicite le type de la banque d'image pour les personnages
export type CharacterImages = {
  [key: string]: any;
};
// Banque d'image pour les personnages
export const CARACTER_IMAGES: CharacterImages = {
  Présentatrice: require('../assets/Présentatrice.png'),
  Secrétaire: require('../assets/Secrétaire.png'),
  Scientifique: require('../assets/Scientifique.png'),
  Habitant : require('../assets/Habitant.png'),
  Gardien_de_Port : require('../assets/Gardien_de_Port.png'),
  Commerçant : require('../assets/Commerçant.png')
};
// On explicite le type de la banque d'image pour la jauge de satisfaction
export type JaugeImages = {
  [key: string]: any;
};
// Banque d'image pour la jauge de satisfaction
export const JAUGE_IAMGES: JaugeImages = {
    frame_00: require('../assets/jauge_frames/frame_00000.png'),
  frame_01: require('../assets/jauge_frames/frame_00001.png'),
  frame_02: require('../assets/jauge_frames/frame_00002.png'),
  frame_03: require('../assets/jauge_frames/frame_00003.png'),
  frame_04: require('../assets/jauge_frames/frame_00004.png'),
  frame_05: require('../assets/jauge_frames/frame_00005.png'),
  frame_06: require('../assets/jauge_frames/frame_00006.png'),
  frame_07: require('../assets/jauge_frames/frame_00007.png'),
  frame_08: require('../assets/jauge_frames/frame_00008.png'),
  frame_09: require('../assets/jauge_frames/frame_00009.png'),
  frame_10: require('../assets/jauge_frames/frame_00010.png'),
  frame_11: require('../assets/jauge_frames/frame_00011.png'),
  frame_12: require('../assets/jauge_frames/frame_00012.png'),
  frame_13: require('../assets/jauge_frames/frame_00013.png'),
  frame_14: require('../assets/jauge_frames/frame_00014.png'),
  frame_15: require('../assets/jauge_frames/frame_00015.png'),
  frame_16: require('../assets/jauge_frames/frame_00016.png'),
  frame_17: require('../assets/jauge_frames/frame_00017.png'),
  frame_18: require('../assets/jauge_frames/frame_00018.png'),
  frame_19: require('../assets/jauge_frames/frame_00019.png'),
  frame_20: require('../assets/jauge_frames/frame_00020.png'),
  frame_21: require('../assets/jauge_frames/frame_00021.png'),
  frame_22: require('../assets/jauge_frames/frame_00022.png'),
  frame_23: require('../assets/jauge_frames/frame_00023.png'),
  frame_24: require('../assets/jauge_frames/frame_00024.png'),
  frame_25: require('../assets/jauge_frames/frame_00025.png'),
  frame_26: require('../assets/jauge_frames/frame_00026.png'),
  frame_27: require('../assets/jauge_frames/frame_00027.png'),
  frame_28: require('../assets/jauge_frames/frame_00028.png'),
  frame_29: require('../assets/jauge_frames/frame_00029.png'),
  frame_30: require('../assets/jauge_frames/frame_00030.png'),
  frame_31: require('../assets/jauge_frames/frame_00031.png'),
  frame_32: require('../assets/jauge_frames/frame_00032.png'),
  frame_33: require('../assets/jauge_frames/frame_00033.png'),
  frame_34: require('../assets/jauge_frames/frame_00034.png'),
  frame_35: require('../assets/jauge_frames/frame_00035.png'),
  frame_36: require('../assets/jauge_frames/frame_00036.png'),
  frame_37: require('../assets/jauge_frames/frame_00037.png'),
  frame_38: require('../assets/jauge_frames/frame_00038.png'),
  frame_39: require('../assets/jauge_frames/frame_00039.png'),
  frame_40: require('../assets/jauge_frames/frame_00040.png'),
  frame_41: require('../assets/jauge_frames/frame_00041.png'),
  frame_42: require('../assets/jauge_frames/frame_00042.png'),
  frame_43: require('../assets/jauge_frames/frame_00043.png'),
  frame_44: require('../assets/jauge_frames/frame_00044.png'),
  frame_45: require('../assets/jauge_frames/frame_00045.png'),
  frame_46: require('../assets/jauge_frames/frame_00046.png'),
  frame_47: require('../assets/jauge_frames/frame_00047.png'),
  frame_48: require('../assets/jauge_frames/frame_00048.png'),
  frame_49: require('../assets/jauge_frames/frame_00049.png'),
  frame_50: require('../assets/jauge_frames/frame_00050.png'),
  frame_51: require('../assets/jauge_frames/frame_00051.png'),
  frame_52: require('../assets/jauge_frames/frame_00052.png'),
  frame_53: require('../assets/jauge_frames/frame_00053.png'),
  frame_54: require('../assets/jauge_frames/frame_00054.png'),
  frame_55: require('../assets/jauge_frames/frame_00055.png'),
  frame_56: require('../assets/jauge_frames/frame_00056.png'),
  frame_57: require('../assets/jauge_frames/frame_00057.png'),
  frame_58: require('../assets/jauge_frames/frame_00058.png'),
  frame_59: require('../assets/jauge_frames/frame_00059.png'),
  frame_60: require('../assets/jauge_frames/frame_00060.png'),
  frame_61: require('../assets/jauge_frames/frame_00061.png'),
  frame_62: require('../assets/jauge_frames/frame_00062.png'),
  frame_63: require('../assets/jauge_frames/frame_00063.png'),
  frame_64: require('../assets/jauge_frames/frame_00064.png'),
  frame_65: require('../assets/jauge_frames/frame_00065.png'),
  frame_66: require('../assets/jauge_frames/frame_00066.png'),
  frame_67: require('../assets/jauge_frames/frame_00067.png'),
  frame_68: require('../assets/jauge_frames/frame_00068.png'),
  frame_69: require('../assets/jauge_frames/frame_00069.png'),
  frame_70: require('../assets/jauge_frames/frame_00070.png'),
  frame_71: require('../assets/jauge_frames/frame_00071.png'),
  frame_72: require('../assets/jauge_frames/frame_00072.png'),
  frame_73: require('../assets/jauge_frames/frame_00073.png'),
  frame_74: require('../assets/jauge_frames/frame_00074.png'),
  frame_75: require('../assets/jauge_frames/frame_00075.png'),
  frame_76: require('../assets/jauge_frames/frame_00076.png'),
  frame_77: require('../assets/jauge_frames/frame_00077.png'),
  frame_78: require('../assets/jauge_frames/frame_00078.png'),
  frame_79: require('../assets/jauge_frames/frame_00079.png'),
  frame_80: require('../assets/jauge_frames/frame_00080.png'),
  frame_81: require('../assets/jauge_frames/frame_00081.png'),
  frame_82: require('../assets/jauge_frames/frame_00082.png'),
  frame_83: require('../assets/jauge_frames/frame_00083.png'),
  frame_84: require('../assets/jauge_frames/frame_00084.png'),
  frame_85: require('../assets/jauge_frames/frame_00085.png'),
  frame_86: require('../assets/jauge_frames/frame_00086.png'),
  frame_87: require('../assets/jauge_frames/frame_00087.png'),
  frame_88: require('../assets/jauge_frames/frame_00088.png'),
  frame_89: require('../assets/jauge_frames/frame_00089.png'),
  frame_90: require('../assets/jauge_frames/frame_00090.png'),
  frame_91: require('../assets/jauge_frames/frame_00091.png'),
  frame_92: require('../assets/jauge_frames/frame_00092.png'),
  frame_93: require('../assets/jauge_frames/frame_00093.png'),
  frame_94: require('../assets/jauge_frames/frame_00094.png'),
  frame_95: require('../assets/jauge_frames/frame_00095.png'),
  frame_96: require('../assets/jauge_frames/frame_00096.png'),
  frame_97: require('../assets/jauge_frames/frame_00097.png'),
  frame_98: require('../assets/jauge_frames/frame_00098.png'),
  frame_99: require('../assets/jauge_frames/frame_00099.png')
}
export type VoteImages = {
  [key: string]: any;
};
export const VOTE_IAMGES: JaugeImages = {
    vote : require('../assets/vote_logo.png'),
    big_vote : require('../assets/big_vote_logo.png'),
    point : require('../assets/point.png'),
    big_point : require('../assets/big_point.png')
}
// Banque de types de personnages
export const caracters = ['Présentatrice','Secrétaire', 'Scientifique', 'Habitant', 'Gardien_de_Port', 'Commerçant'];
// Méthode de navigation
export type NavigationProps = {
  navigation: {
    goBack: () => void;
  };
};
// Affichage d'une case de la case (memo permet de rendre dynamique la modification de l'affichage)
export const Tiles = React.memo(({ type }: { type: keyof typeof TILE_IMAGES }) => {
  return (
    <TouchableHighlight>
      <Image source={TILE_IMAGES[type]} style={{ width: tileSize, height: tileSize }} />
    </TouchableHighlight>
  );
});
// Calcul si un batiment (maison/route/port...) est déservi par une route ou une ligne maritime
export function isServed(
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
export function checkPortRoadAccess(overLayMap: string[][], i: number, j: number): boolean {
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
// Affichage du sol de la carte
export const ShowGrid = React.memo(({showMap, overLayMap, servedCache}: {showMap: string[][], overLayMap: string[][], servedCache: {[key: string]: boolean}}) => {
  const rows = overLayMap.length;
  const cols = overLayMap[0].length;
  const grid = [];
  
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if (overLayMap[i][j] !== '' && overLayMap[i][j] !== 's' && !servedCache[`${i}-${j}`]){
        row.push(<Tiles key={`${i}-${j}`} type={`red` as keyof typeof TILE_IMAGES}/>)
      } else {
        row.push(<Tiles key={`${i}-${j}`} type={'empty' as keyof typeof TILE_IMAGES} />);
      }
    }
    grid.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return <View style={styles.showGrid}>{grid}</View>;
});
// Affichage d'indices visuels sur la carte
export const OverlayGrid = React.memo(({overLayMap}:{overLayMap : string[][]}) => {
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
      } else if (overLayMap[i][j] === "s") {
        row.push(<Tiles key={`${i}-${j}`} type={'sign' as keyof typeof TILE_IMAGES} />);
      } else {
        row.push(<Tiles key={`${i}-${j}`} type={'empty' as keyof typeof TILE_IMAGES} />);
      }
    }
    grid.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return <View style={styles.grid}>{grid}</View>;
});
// Affichage des batiments de la carte
export const Grid = React.memo(({ map }: { map: string[][] }) => {
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
// Affichage du budget au dessus de la carte
export const Budget = React.memo(({budget, up, income}: {budget: number, up: boolean, income: number}) => {
  if (up){
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
        <Text style={[styles.budgetText, { fontSize: textSize / 1.5, marginBottom: 0, marginStart: 0 }]}>
          (Revenus annuels : {formatNumber(income)} C)
        </Text>
        <Text style={[styles.budgetText, { marginLeft: 10 }]}>
          ↗ {formatNumber(budget)} Crédits
        </Text>
      </View>
      );
  } else {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
        <Text style={[styles.budgetText, { fontSize: textSize / 1.5, marginBottom: 0, marginStart: 0 }]}>
          (Revenus annuels : {formatNumber(income)} C)
        </Text>
        <Text style={[styles.budgetText, { marginLeft: 10 }]}>
          ↘ {formatNumber(budget)} Crédits
        </Text>
      </View>
      );
  }
});
// Affichage de la date en dessous de la carte
export const DateDisplay = React.memo(({year}: {year: number}) => {
  let vote = ""
  let dot1 = ""
  let dot2 = ""
  let dot3 = ""
  let dot4 = ""
  if ((year-2026) % periode === 0){
    vote = "big_"
  } else if ((year-2026) % periode === 1){
    dot1 = "big_"
  } else if ((year-2026) % periode === 2){
    dot2 = "big_"
  } else if ((year-2026) % periode === 3){
    dot3 = "big_"
  } else if ((year-2026) % periode === 4){
    dot4 = "big_"
  }
  return (
    <View style={{flexDirection: 'row', 
                  alignItems: 'center',
                  alignSelf: 'flex-end',  // Colle la View à droite de son parent
                  gap: 8}}>
      <TouchableHighlight>
        <Image 
          source={VOTE_IAMGES[vote + "vote"]} 
          style={{width: 30, height: 30, resizeMode: "contain"}}
        />
      </TouchableHighlight>
      
      {[dot1, dot2, dot3, dot4].map((dot, index) => (
        <TouchableHighlight key={index}>
          <Image 
            source={VOTE_IAMGES[dot + "point"]} 
            style={{width: 15, height: 15, resizeMode: "contain"}}
          />
        </TouchableHighlight>
      ))}
      
      <Text style={styles.budgetText}>{year}</Text>
    </View>
    );
});
// Affichage du nom du type de personnage
export const CaracterName = React.memo(({currentCaracterIndex}: {currentCaracterIndex: number}) => {
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
// Affichage de la jeuge de satisfaction de la population
export const JaugeImage = React.memo(({happiness}: {happiness: number}) => {
  return (
    <TouchableHighlight>
      <Image source={JAUGE_IAMGES["frame_"+ToString(happiness)]} style={styles.jaugeImage}/>
    </TouchableHighlight>
  );
});
// Affichage de l'image associé au type de personnage
export const CaracterImage = React.memo(({currentCaracterIndex}: {currentCaracterIndex: number}) => {
  return (
    <TouchableHighlight>
      <Image source={CARACTER_IMAGES[caracters[currentCaracterIndex]]} style={styles.caracterImage}/>
    </TouchableHighlight>
  );
});
// Affichage de la question posée par le personnage
export const Speech = React.memo(({txt}: {txt: string}) => {
  return (
    <Text style={styles.speech}>{txt}</Text>
  );
});
export const closeActivityWithResult = (
  navigation: any,
  result: 'win' | 'loss' | 'draw' | 'bankruptcy',
  targetScreen: string  // OBLIGATOIRE: le nom exact de votre écran parent
) => {
  navigation.navigate(targetScreen, { gameResult: result });
};
export const closeActivityWithParams = (
  navigation: any,
  params: object,
  targetScreen?: string
) => {
  if (targetScreen) {
    navigation.navigate(targetScreen, params);
  } else {
    navigation.goBack();
  }
};
// Bouton de retour aux activités précédentes
export const ButtonBack = React.memo(({ navigation }: NavigationProps) => {
  return (
    <TouchableOpacity style={styles.topLeftImage} onPress={() => closeActivityWithParams(navigation, { gameResult: 'draw' }, 'GameContextL1Activity')}>
      <Image source={require('../assets/fleche.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
    </TouchableOpacity>
  );
});
// Affichage du bouton d'option
export const OptionsImage = React.memo(() => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableHighlight 
        onPress={() => setModalVisible(true)} 
        underlayColor="transparent" 
        style={styles.topRightImage}
      >
        <Image 
          source={require('../assets/options_logo.png')} 
          style={{ width: 50, height: 50 }} 
          resizeMode="contain" 
        />
      </TouchableHighlight>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Bouton de fermeture */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContent}>
              {/* Titre */}
              <Text style={styles.modalTitle}>Bâtiments</Text>

              {/* Images et texte */}
              <View style={styles.imageContainer}>
                <Image 
                  source={require('../assets/overlayTiles/house.png')} 
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.imageCaption}>Maison : 5 habitants vivent dans chaque maison et payent 100 crédits par an. Les habitants ne seront pas satisfaits si leur maison n'est pas désservi par une route.</Text>
              </View>

              <View style={styles.imageContainer}>
                <Image 
                  source={require('../assets/overlayTiles/commerce.png')} 
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.imageCaption}>Commerce : Les commerçants attirent du tourisme et participent aux revenus de la ville.</Text>
              </View>

              <View style={styles.imageContainer}>
                <Image 
                  source={require('../assets/overlayTiles/port.png')} 
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.imageCaption}>Port : Permet de desservir une ligne maritime. Il faut qu'un port soit présent aux deux extrémités de la ligne.</Text>
              </View>

              <View style={styles.imageContainer}>
                <Image 
                  source={require('../assets/overlayTiles/road1010.png')} 
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.imageCaption}>Route : Permet de relier les maisons, commerces et ports de la ville au reste du monde.</Text>
              </View>

              <View style={styles.imageContainer}>
                <Image 
                  source={require('../assets/overlayTiles/line1010.png')} 
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.imageCaption}>Ligne maritime : Permet de relier les habitants des îles au réseau routier continental.</Text>
              </View>

              {/* Texte supplémentaire */}
              <Text style={styles.descriptionText}>
                Modifiez la carte en répondant aux questions des personnages.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
});
//Image de fond
export const BackgroundImage = React.memo(() => {
  return (
    <Image source={require('../assets/fond_game.png')} style={{position: 'absolute', width: '100%', height: Math.max(width, height)*1.2, justifyContent: 'center', alignItems: 'center'}} />
  );
});
// Styles
export const styles = StyleSheet.create({
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
    color: '#ffffffff',
    textAlign: 'right',
    alignSelf: 'center',
    marginEnd: 0
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
    fontSize: smallTextSize,
    margin: 5,
    marginStart: 10,
    fontFamily: 'Gloucester',
    color: '#070A28',
    width: speechWidth,
    height: smallTextSize*7,
  },
  caracterImage: {
    alignSelf: 'flex-end',
    margin: -20,
    marginEnd: -210,
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
    fontSize: smallTextSize*0.8,
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
  },
  topRightImage: {
    position: 'absolute',
    resizeMode: 'contain',
    top: 30,
    right: 20 },
    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#61a7f2ff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#070A28',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingTop: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 10,
  },
  imageCaption: {
    fontSize: 14,
    color: '#070A28',
    textAlign: 'left',
    marginStart: 10,
    paddingEnd: 40,
  },
  descriptionText: {
    fontSize: 16,
    color: '#070A28',
    lineHeight: 24,
    textAlign: 'justify',
    padding: 5,
  },
});