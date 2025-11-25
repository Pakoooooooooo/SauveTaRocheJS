import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import * as G from '../model/GameUI';
import * as Q from '../model/GameQuestions';
import * as R from '../model/GameQuestionsRepository';
import { Audio } from 'expo-av';

// Liste des questions qui auront lieu pendant la partie (une question sur deux est en réalité un explication de la question précédente dont la réponse n'a donc pas d'impactsur le jeu)
const Qu = R.parseGameQuestions()

const periode = 5

// Création de la liste de questions alternée d'explications
const Questions = [... Qu.flatMap((question, index) => 
  index < Qu.length - 1 ? [question, Q.Explication] : [question]
), Q.Explication]

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
    ["","","","","","","","","","h","","r","",""],
    ["","","","","","","","","","h","c","r","",""],
    ["","","","","","","","","h","r","r","r","r","r"],
    ["","","","","","","r","r","r","r","","","",""],
    ["","","","","","r","r","","","","","","",""],
    ["","","","","h","","","","","","","","",""]
  ]);
  // autres constantes de départ (useState permet d'associer la variable à la dynamique d'affichage de GameUI) :
  const [budget, setBudget] = useState(600000);
  const [income, setIncome] = useState(10000); // la valeur des revenues est enlevée au budget quand la valeur apply revenus est appelée
  const [year, setYear] = useState(2026);
  const [happiness, setHappiness] = useState(70);
  const [currentCaracterIndex, setCurrentCaracterIndex] = useState(1);
  const [selectedRep, setSelectedRep] = useState<number | null>(null);
  const [currentQindex, setCurrentQindex] = useState(0);
  const [memQuestions, setMemQuestion] = useState<Q.GameQuestionData[]>([]);
  const [memResponses, setMemResponses] = useState<number[]>([]);

  // Définir les textes des réponses
  const [txt1, setText1] = useState(Questions[currentQindex].rep1.repText);
  const [txt2, setText2] = useState(Questions[currentQindex].rep2.repText);
  const [txt3, setText3] = useState(Questions[currentQindex].rep3.repText);
  const [txt4, setText4] = useState(Questions[currentQindex].rep4.repText);
  const [SpeechText, setSpeechText] = useState(Questions[currentQindex].questionText); // Définir quelle est la bonne réponse

  const soundRef = useRef<Audio.Sound | null>(null);
  useEffect(() => {
    const playMusic = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/musique_niveau1.mp3'), // ton fichier dans assets
        { shouldPlay: true, isLooping: true, volume: 1.2 }
      );
      soundRef.current = sound;
    }

    playMusic();

    return () => {
      // Stop le son quand le composant se démonte
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

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
    if (budget + incr>=0){
      setBudget(prevBudget => prevBudget + incr);
    } else {setBudget(0)}
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
  async function ChangeHappAnim(incr: number) {
    for (let i = 0; i < Math.abs(incr); i++) {
        ChangeHappiness(incr/Math.abs(incr))
        await G.delay(60);
      }
  }
  // Ajoute les revenus mensuelles/annuelles au budget
  const ApplyIncome = useCallback(() => {
    ChangeBudget(income);
  }, [income, ChangeBudget]);
  // Passe au personnage suivant
  const setCaracter = useCallback((id: number) => {
    setCurrentCaracterIndex((id) % G.caracters.length);
  }, []);
  // Passe au mois suivant
  const NextYear = useCallback(() => {
    setYear(y => y + 1);
    ApplyIncome();
  }, []);

  const isProcessingRef = useRef(false);
  // Fonction pour gérer la sélection d'une réponse
  const handleSelectRep = useCallback((index: number) => {
    if (isProcessingRef.current) return; // Utiliser une ref
    isProcessingRef.current = true;
    // Cas où la question n'est pas une explication
    if (currentQindex%2===0){
      setSelectedRep(index); // On enresgistre la réponse de l'utilisateur
      NextYear(); // On passe au mois suivant
      let rep = Questions[currentQindex].rep1 // On prend la réponse à la question selon l'indice enregistré
      if (index === 1) {
        rep = Questions[currentQindex].rep1
      } else if (index === 2) {
        rep = Questions[currentQindex].rep2
      } else if (index === 3) {
        rep = Questions[currentQindex].rep3
      } else {
        rep = Questions[currentQindex].rep4
      }
      // Change les cases du sol de la carte en fonction de ce qui est éxplicité dans la question
      rep.mapChanges.forEach(c => {
        ChangeMapTile(c.i, c.j, c.newType)
      }); 
      // Change les cases des batiments de la carte en fonction de ce qui est éxplicité dans la question
      rep.overlayChanges.forEach(c => {
        ChangeOverlayTile(c.i, c.j, c.newType)
      });
      // Change le budget en fonction de ce qui est éxplicité dans la question
      ChangeBudget(rep.price);
      // Change la satisfaction en fonction de ce qui est éxplicité dans la question
      ChangeHappAnim(rep.happiness);
      // On ajoute l'indice de la réponse à la liste des indices de réponses choisies
      let memRep = [...memResponses, index];
      setMemResponses(memRep);
      // On ajoute la question à la liste des questions répondues
      let memQuest = [...memQuestions, Questions[currentQindex]];
      setMemQuestion(memQuest);
      // On avance l'indice de la question jusqu'à la prochaine qui respecte les conditions pour être affichée
      let i = 1;
      while (currentQindex + i < Questions.length && 
            !G.respects(Questions[currentQindex + i], memQuestions, memResponses)) {
        i += 1;
      }
      
      let newI = currentQindex;
      if (currentQindex + i < Questions.length) {
        newI = currentQindex + i;
        setCurrentQindex(newI);
      }
      else {
        G.closeActivityWithResult(navigation, 'win', 'GameContextL1Activity')
      }
      // On affiche les informations de l'explication de la question
      setSpeechText(rep.explConseq);
      setText1("Suivant");
      setText2("");
      setText3("");
      setText4("");
      setCaracter(0);
      setSelectedRep(null);
    } else { // Dans le cas ou la question est une explication de question
      //  Aucune consequence n'est appliquée
      let i = 1;
      while (currentQindex + i < Questions.length && 
            !G.respects(Questions[currentQindex + i], memQuestions, memResponses)) {
        i += 2;
      }
      
      let newI = currentQindex;
      if (currentQindex + i < Questions.length) {
        newI = currentQindex + i;
        setCurrentQindex(newI);
      }
      else {
        G.closeActivityWithResult(navigation, 'win', 'GameContextL1Activity')
      }
      if ((year - 2026)%periode === 0 && happiness < 50) {
        G.closeActivityWithResult(navigation, 'loss', 'GameContextL1Activity')
      }
      // Affichage de la question suivante
      setSpeechText(Questions[newI].questionText);
      if (Questions[newI].caracter===0) {
        setText1("Suivant");
      }else{setText1(Questions[newI].rep1.repText);}
      setText2(Questions[newI].rep2.repText);
      setText3(Questions[newI].rep3.repText);
      setText4(Questions[newI].rep4.repText);
      setCaracter(Questions[newI].caracter);
      setSelectedRep(null);
    }
    
    // Réinitialiser le flag à la fin
    isProcessingRef.current = false;
  }, [selectedRep, currentQindex, setCaracter, NextYear, ApplyIncome, ChangeMapTile, ChangeOverlayTile, ChangeBudget, setCurrentQindex, setSpeechText, setText1, setText2, setText3, setText4]);

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
          <ButtonRep txt={txt1} style={G.styles.buttonRep} index={1} onSelect={onSelect} selectedRep={selectedRep}/>
          <ButtonRep txt={txt2} style={[G.styles.buttonRep, { display: (currentCaracterIndex!==0 && currentQindex%2===0) ? 'flex' : 'none' }]} index={2} onSelect={onSelect} selectedRep={selectedRep}/>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ButtonRep txt={txt3} style={[G.styles.buttonRep, { display: (currentCaracterIndex!==0 && currentQindex%2===0) ? 'flex' : 'none' }]} index={3} onSelect={onSelect} selectedRep={selectedRep}/>
          <ButtonRep txt={txt4} style={[G.styles.buttonRep, { display: (currentCaracterIndex!==0 && currentQindex%2===0) ? 'flex' : 'none' }]} index={4} onSelect={onSelect} selectedRep={selectedRep}/>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <G.OptionsImage />
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
        <G.DateDisplay year={year} />
      </View>
      <G.SeparationLine />
      <View style={styles.bottomScreen}>
        <G.CaracterName currentCaracterIndex={currentCaracterIndex} />
        <View style={styles.infoDisplay}>
          <G.CaracterImage currentCaracterIndex={currentCaracterIndex} />
          <View >
            <G.Speech txt={SpeechText}/>
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