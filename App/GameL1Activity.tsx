import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, Image, View, Text, Button, TextInput } from 'react-native';

const tileSize = 24

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
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Spetembre", "Octobre", "Novembre", "Décembre"];
  return (
    <Text style={styles.budgetText}>{months[monthIndex]} {year}</Text>
  );
});

const SeparationLine = React.memo(() => {
  return (
    <Image style={styles.separationLine} source={require('./assets/separation_line.png')} />
  );
});

const caracters = ['Secrétaire', 'Scientifique', 'Habitant', 'Gardien_de_Port', 'Commerçant'];

const CaracterName = React.memo(({currentCaracterIndex}: {currentCaracterIndex: number}) => {
  return (
    <Text style={styles.caracterName}>{caracters[currentCaracterIndex]} :</Text>
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

export default function GameL1Activity({ navigation }: NavigationProps) {

  const [map, setMap] = useState([["sea","sea","sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass"],
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
              ["sea","sea","sea","sea","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"]]);

  const [showMap, setShowMap] = useState([["","","","","","","","","","","","","",""],
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
                      ["","","","","","","","","","","","","",""]]);

  const [overLayMap, setOverLayMap] = useState([["","","","","","","","","","","","","",""],
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
                      ["","l","","l","","r","r","","","","r","r","r",""],
                      ["","","","l","h","","","","","","","","","h"]]);

  const [budget, setBudget] = useState(1000);
  const [charges, setCharges] = useState(0);
  const [monthIndex] = useState(4);
  const [year] = useState(2026);
  const [currentCaracterIndex, setCurrentCaracterIndex] = useState(1);

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

  function ChangeMapTile (i: number, j: number, type: string){
    setMapTile(i, j, type)
    if (type === "sea" && overLayMap[i][j] !== 'l'){
      setOverlayTile(i,j,'')
    }
    else if (type !== "sea" && overLayMap[i][j] === 'l'){
      setOverlayTile(i,j,'')
    }
  }

  function ChangeOverlayTile (i: number, j: number, type: string){
    if (map[i][j] === "sea" && type === 'l'){
      setOverlayTile(i,j,type)
    } else if (map[i][j] !== "sea" && type !== 'l'){
      setOverlayTile(i,j,type)
    }
  }

  const ChangeBudget = useCallback((incr: number) => {
    setBudget(prevBudget => prevBudget + incr);
  }, []);

  const ApplyCharges = useCallback(() => {
    ChangeBudget(charges);
  }, [charges, ChangeBudget]);

  const NextCaracter = useCallback(() => {
    setCurrentCaracterIndex((currentCaracterIndex+1)%caracters.length)
  }, [])

  const TestMapBtn = useCallback(() => {
    return (
      <Button 
        title="Change Map"
        onPress={() => ChangeMapTile(0, 0, 'sand')}
      />
    );
  }, [ChangeMapTile]);

  const TestOverLayBtn = useCallback(() => {
    return (
      <Button 
        title="Change Overlay"
        onPress={() => ChangeOverlayTile(0, 0, 'h')}
      />
    );
  }, [ChangeOverlayTile]);

  const TestInputCharges = useCallback(() => {
    return (
      <TextInput
        keyboardType="numeric"
        value={charges.toString()}
        onChangeText={(text) => setCharges(Number(text))}
        placeholder="Entrez une charge numérique..."
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 8,
          margin: 10,
          borderRadius: 5,
        }}
      />
    );
  }, [charges]);

  const TestChargesBtn = useCallback(() => {
    return (
      <Button
        title="Apply Charges"
        onPress={() => ApplyCharges()}/>
    );
  }, [ApplyCharges]);

  const TestNextCaracterBtn = useCallback(() => {
    return (
      <Button
        title="Next Caracter"
        onPress={() => NextCaracter()}/>
    );
  }, [NextCaracter]);

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
      <CaracterName currentCaracterIndex={currentCaracterIndex} />
      <CaracterImage currentCaracterIndex={currentCaracterIndex} />
      <TestMapBtn />
      <TestOverLayBtn />
      <TestInputCharges />
      <TestChargesBtn />
      <TestNextCaracterBtn />
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
    fontSize: 24,
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
    width: 350,
    height: '0.3%',
    resizeMode: 'stretch',
  },
  caracterName: {
    fontSize: 30,
    margin: 10,
    marginStart: 100,
    fontFamily: 'Gloucester',
    color: '#070A28',
    textAlign: 'left',
    width: '100%',
    textDecorationLine: 'underline',
  },
  caracterImage: {
    position: 'absolute',
    alignSelf: 'flex-end',
    left: -330,
    top: -80,
    width: 100*4,
    height: 140*4,
    resizeMode: 'stretch',
  }
});