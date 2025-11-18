import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import * as G from './GameUI';

const txt1 = "Rep 1"
const txt2 = "Rep 2"
const txt3 = "Rep 3"
const txt4 = "Rep 4"
const correctRep = 3;

export default function GameL1Activity({ navigation }: G.NavigationProps) {

  // Conditions initiales du jeu lu par les fonctions d'affichage de GameUI :
  // Sol de la carte initiale
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
  // Idices de la carte initiale
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
  // Batiments de la carte initiale
  const [overLayMap, setOverLayMap] = useState([
    ["","","","","","","","","","","","","",""],
    ["","","","","","","","","","c","h","","",""],
    ["","","","","","","","","","r","h","h","",""],
    ["","","","","","","","","","r","","","",""],
    ["","","","","","","h","r","r","r","","","",""],
    ["","","","","","l","p","","","r","","","",""],
    ["","","","p","l","l","","","h","r","r","r","",""],
    ["","","","h","","","","","","c","","r","",""],
    ["","","","","","","","s","","h","","r","",""],
    ["","","","","","","","","","h","c","r","",""],
    ["","","","","","","","","h","r","r","r","r","r"],
    ["","","","","","","r","r","r","r","","","",""],
    ["","","","","","r","r","","","","","","",""],
    ["","","","","h","","","","","","","","",""]
  ]);
  // autres constantes de départ (useState permet d'associer la variable à la dynamique d'affichage de GameUI) :
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
        cache[`${i}-${j}`] = G.isServed(overLayMap, i, j);
      }
    }
    return cache;
  }, [overLayMap]);

  // Utilisation de useCallback pour mémoriser les fonctions
  // Change le type de la case sol (i,j) en 'type'
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
  // Change le type de la case batiment (i,j) en 'type'
  const setOverlayTile = useCallback((i: number, j: number, type: string) => {
    setOverLayMap(prevOverLayMap => {
      const newOverLayMap = prevOverLayMap.map(row => [...row]);
      newOverLayMap[i][j] = type;
      return newOverLayMap;
    });
  }, []);
  // Change le type de la case sol (i,j) en 'type' et adapte les batiments en fonction
  const ChangeMapTile = useCallback((i: number, j: number, type: string) => {
    setMapTile(i, j, type);
    if (type === "sea" && overLayMap[i][j] !== 'l'){
      setOverlayTile(i, j, '');
    }
    else if (type !== "sea" && overLayMap[i][j] === 'l'){
      setOverlayTile(i, j, '');
    }
  }, [setMapTile, overLayMap]);
  // Change le type de la case batiment (i,j) en 'type' si possible en fonction de la carte sol
  const ChangeOverlayTile = useCallback((i: number, j: number, type: string) => {
    if (map[i][j] === "sea" && type === 'l'){
      setOverlayTile(i, j, type);
    } else if (map[i][j] !== "sea" && type !== 'l'){
      setOverlayTile(i, j, type);
    }
  }, [map, setOverlayTile]);
  // Ajoute incr au budget
  const ChangeBudget = useCallback((incr: number) => {
    setBudget(prevBudget => prevBudget + incr);
  }, []);
  // Ajoute incr à la jauge de satisfaction
  const ChangeHappiness = useCallback((incr: number) => {
  setHappiness(prev => {
    const newValue = prev + incr;
    if (newValue >= 99) return 99;
    if (newValue < 0) return 0;
    return newValue;
  });
}, []);
  // Ajoute les charges mensuelles/annuelles au budget
  const ApplyCharges = useCallback(() => {
    ChangeBudget(charges);
  }, [charges, ChangeBudget]);
  // Passe au personnage suivant
  const NextCaracter = useCallback(() => {
    setCurrentCaracterIndex(prev => (prev + 1) % G.caracters.length);
  }, []);
  // Passe au mois suivant
  const NextMonth = useCallback(() => {
    setMonthIndex(prev => {
      if (prev < G.months.length - 1) {
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
  // Affichage d'un bouton de réponse aux questions
  const ButtonRep = useCallback(({txt, style, index, onSelect, selectedRep}: 
    {txt?: string; style?: object; index: number; onSelect: (index: number) => void; selectedRep: number | null;}) => {
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
        <Text style={[G.styles.repText, { color: txtcolor }]}>{txt}</Text>
      </TouchableOpacity>
    );
  }, []);
  // Affichage des boutons de réponse aux questions
  const Reps = React.memo(({txt1 = '', txt2 = '', txt3 = '', txt4 = '', onSelect, selectedRep}:
    {txt1?: string; txt2?: string; txt3?: string; txt4?: string; onSelect: (index: number) => void; selectedRep: number | null;}) => {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <ButtonRep txt={txt1} style={G.styles.buttonRep} index={1} onSelect={onSelect} selectedRep={selectedRep} />
          <ButtonRep txt={txt2} style={G.styles.buttonRep} index={2} onSelect={onSelect} selectedRep={selectedRep}/>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ButtonRep txt={txt3} style={G.styles.buttonRep} index={3} onSelect={onSelect} selectedRep={selectedRep}/>
          <ButtonRep txt={txt4} style={G.styles.buttonRep} index={4} onSelect={onSelect} selectedRep={selectedRep}/>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <G.ButtonBack navigation={navigation} />
      <View style={G.styles.mapcontainer}>
        <G.Budget budget={budget}/>
        <View style={styles.fullmapcontainer}>
          <View style={styles.grid}>
            <G.Grid map={map} />
          </View>
          <View style={styles.showGrid}>
            <G.ShowGrid showMap={showMap} overLayMap={overLayMap} servedCache={servedCache}/>
          </View>
          <View style={styles.overlayGrid}>
            <G.OverlayGrid overLayMap={overLayMap}/>
          </View>
        </View>
        <G.DateDisplay monthIndex={monthIndex} year={year} />
      </View>
      <G.SeparationLine />
      <View style={styles.bottomScreen}>
        <G.CaracterName currentCaracterIndex={currentCaracterIndex} />
        <View style={styles.infoDisplay}>
          <G.CaracterImage currentCaracterIndex={currentCaracterIndex} />
          <View >
            <G.Speech txt="Question question question  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ?"/>
            <Reps
              txt1={txt1}
              txt2={txt2}
              txt3={txt3}
              txt4={txt4}
              onSelect={handleSelectRep}
              selectedRep={selectedRep}
            />
          </View>
          <G.JaugeImage happiness={happiness}/>
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
  bottomScreen: {
    marginVertical: 5,
    marginHorizontal: -10,
  },
  infoDisplay: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
});